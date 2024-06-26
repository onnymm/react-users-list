import { useEffect, useReducer } from "react";
import { findUserByUsername } from "../api/usersApi";
import { editFormReducer, getEditFormInitialState } from "../reducers/editFormReducer";
import { usernameErrorChanged } from "../actions/editFormActions";

const useEditForm = (user) => {
    const [formValues, dispatchFormValues] = useReducer(editFormReducer, user, getEditFormInitialState)
    
    useEffect(
        () => {
            if (!formValues.username.loading) return;
            
            const controller = new AbortController();
            const timeoutId = setTimeout(
                () => {
                    validateUsernameIsAvailable(formValues.username.value, dispatchFormValues, controller.signal);
                }, 500)
            return (() => {
                controller.abort();
                clearTimeout(timeoutId);
            });
        }, [formValues.username.loading, formValues.username.value]
    )

    const isFormInvalid = 
        areInitialValues(formValues, user) ||
        formValues.name.error ||
        formValues.username.error ||
        formValues.username.loading

    return {...formValues, dispatchFormValues, isFormInvalid}
}

const areInitialValues = (formValues, user) => (
    formValues.name.value === user.name &&
    formValues.username.value === user.username &&
    formValues.role === user.role &&
    formValues.active === user.active
);

const validateUsernameIsAvailable = async (username, dispatchFormValues, signal) =>  {
    const { user, error, abort } = await findUserByUsername(username, signal);

    if (abort) return;

    let errorMessage;

    if (error) {errorMessage = 'Error al validar'}
    else if (user) errorMessage = 'Ya está en uso'
    
    dispatchFormValues(usernameErrorChanged(errorMessage));
}

export default useEditForm;