import { useEffect, useReducer } from "react";
import { findUserByUsername } from "../api/usersApi";
import { CREATE_FORM_ACTIONS } from "../../constants/createFormActions";
import { CREATE_FORM_INITIAL_VALUE, formValuesReducer } from "../reducers/createFormReducer";

const useCreateForm = () => {
    const [formValues, dispatchFormValues] = useReducer(formValuesReducer, CREATE_FORM_INITIAL_VALUE)
    
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
        !formValues.name.value ||
        formValues.name.error ||
        !formValues.username.value ||
        formValues.username.error ||
        formValues.username.loading

    return {...formValues, dispatchFormValues, isFormInvalid}
}

const validateUsernameIsAvailable = async (username, dispatchFormValues, signal) =>  {
    const { user, error, abort } = await findUserByUsername(username, signal);

    if (abort) return;
    if (error) dispatchFormValues({ type: CREATE_FORM_ACTIONS.USERNAME_ERROR, value: 'Error al validar' });
    dispatchFormValues({ type: CREATE_FORM_ACTIONS.USERNAME_ERROR, value: user ? 'Ya está en uso': undefined });
}

export default useCreateForm;