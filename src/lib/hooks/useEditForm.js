import { useEffect, useReducer } from "react";
import { validateName, validateUsername } from "../users/userValidation";
import { findUserByUsername } from "../api/usersApi";
import { EDIT_FORM_ACTIONS } from "../../constants/editFormActions";

const getInitialState = (user) => {
    return ({
        name: {
            value: user.name,
            error: undefined
        },
        username: {
            value: user.username,
            loading: false,
            error: undefined
        },
        role: user.role,
        active: user.active
    })}

const formValuesReducer = (state, action) => {
    switch (action.type) {
        case EDIT_FORM_ACTIONS.NAME: {
            const error = validateName(action.value)
            return {...state, name: {value: action.value, error}};
        }

        case EDIT_FORM_ACTIONS.USERNAME: {
            console.log(action.currentUsername)
            const error = validateUsername(action.value)
            const isInitialUsername = action.value === action.currentUsername
            return {...state, username: {value: action.value, loading: !error && !isInitialUsername, error}};
        }

        case EDIT_FORM_ACTIONS.ROLE:
            return {...state, role: action.value };

        case EDIT_FORM_ACTIONS.ACTIVE:
            return {...state, active: action.value };

        case EDIT_FORM_ACTIONS.USERNAME_ERROR:
            return (
                {
                    ...state,
                    username: {
                        value: state.username.value,
                        error: action.value,
                        loading: false
                    }
                }
            )

        case EDIT_FORM_ACTIONS.REPLACE:
            return action.value;

            default:
                throw new Error('Invalid action type');
    }
}

const useEditForm = (user) => {
    const [formValues, dispatchFormValues] = useReducer(formValuesReducer, user, getInitialState)

    useEffect(
        () => {
            dispatchFormValues({ type: EDIT_FORM_ACTIONS.REPLACE, value: getInitialState(user)})
        }, [user]
    )
    
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
    if (error) dispatchFormValues({ type: 'username_error_changed', value: 'Error al validar'});
    dispatchFormValues({ type: 'username_error_changed', value: user ? 'Ya está en uso': undefined});
}

export default useEditForm;