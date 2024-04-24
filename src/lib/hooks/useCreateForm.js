import { useEffect, useReducer, useState } from "react";
import { validateName, validateUsername } from "../users/userValidation";
import { findUserByUsername } from "../api/usersApi";
import { CREATE_FORM_ACTIONS } from "../../constants/createFormActions";

const INITIAL_STATE = {
    name: {
        value: '',
        error: undefined
    },
    username: {
        value: '',
        loading: false,
        error: undefined
    }
}

const formValuesReducer = (state, action) => {
    switch (action.type) {
        case CREATE_FORM_ACTIONS.NAME: {
            const error = validateName(action.value)
            return {...state, name: {value: action.value, error}}
        }

        case CREATE_FORM_ACTIONS.USERNAME: {
            const error = validateUsername(action.value)
            return {...state, username: {value: action.value, loading: !error, error}}
        }

        case CREATE_FORM_ACTIONS.USERNAME_ERROR: 
            return {
                ...state,
                username: {
                    value: state.username.value,
                    error: action.value,
                    loading: false
                }
            }

        default:
            throw new Error("Invalid action type")
    }
}

const useCreateForm = () => {
    const [formValues, dispatchFormValues] = useReducer(formValuesReducer, INITIAL_STATE)
    
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