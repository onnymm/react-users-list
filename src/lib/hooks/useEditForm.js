import { useEffect, useState } from "react";
import { validateName, validateUsername } from "../users/userValidation";
import { findUserByUsername } from "../api/usersApi";

const useEditForm = (user) => {
    const [formValues, setFormValues] = useState(
        () => getInitialState(user)
    );

    
    const setName = (newName) => {
        const error = validateName(newName)
        setFormValues({...formValues, name: {value: newName, error}})
    }   
    
    const setUsername = (newUsername) => {
        const error = validateUsername(newUsername)
        const isInitialUsername = newUsername === user.username
        setFormValues({...formValues, username: {value: newUsername, loading: !error && !isInitialUsername, error}})
    }

    const setRole = (newRole) => {
        setFormValues({...formValues, role: newRole })
    }

    const setActive = (newActive) => {
        setFormValues({...formValues, active: newActive })
    }
    
    const setUsernameError = responseError => {
        setFormValues(
            prevFormValues => ({
                ...prevFormValues,
                username: {
                    value: prevFormValues.username.value,
                    error: responseError,
                    loading: false
                }
            })
        )
    }

    useEffect(
        () => {
            setFormValues(getInitialState(user));
        }, [user]
    )
    
    useEffect(
        () => {
            if (!formValues.username.loading) return;
            
            const controller = new AbortController();
            const timeoutId = setTimeout(
                () => {
                    validateUsernameIsAvailable(formValues.username.value, setUsernameError, controller.signal);
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

    return {...formValues, setName, setUsername, setRole, setActive, isFormValid: isFormInvalid}
}

const getInitialState = (user) => {
    console.log("getInitialState")
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

const areInitialValues = (formValues, user) => (
    formValues.name.value === user.name ||
    formValues.username.value === user.username ||
    formValues.role === user.role ||
    formValues.active === user.active
);

const validateUsernameIsAvailable = async (username, setUsernameError, signal) =>  {
    const { user, error, abort } = await findUserByUsername(username, signal);

    if (abort) return;
    if (error) setUsernameError('Error al validar');
    setUsernameError(user ? 'Ya está en uso': undefined);
}

export default useEditForm;