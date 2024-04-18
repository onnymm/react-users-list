import { useEffect, useState } from "react";
import { validateName, validateUsername } from "../users/userValidation";

const validateUsernameIsAvailable = async (username, setUsernameError, signal) =>  {
    try {
        const response = await fetch(`http://localhost:5180/users?username=${username}`, { signal })
        console.log(response.ok)
        if (response.ok) {
            const data = await response.json();
            if (data.length){
                setUsernameError("Ya está en uso");
            }
            else {
                setUsernameError(undefined);
            }
        }
        
        else {
            setUsernameError("Error al realizar la validación")
        }
    } catch (e) {
        if (e.name !== "AbortError") {
            setUsernameError("Hubo un error")
        }
    }
}

const useCreateForms = () => {
    const [formValues, setFormValues] = useState({
        name: {
            value: '',
            error: undefined
        },
        username: {
            value: '',
            loading: false,
            error: undefined
        }
    });

    
    const setName = (newName) => {
        const error = validateName(newName)
        setFormValues({...formValues, name: {value: newName, error}})
    }   
    
    const setUsername = (newUsername) => {
        const error = validateUsername(newUsername)
        setFormValues({...formValues, username: {value: newUsername, loading: !error, error}})
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
            if (formValues.username.loading) {
                const controller = new AbortController();
                const timeoutId = setTimeout(
                    () => {
                        validateUsernameIsAvailable(formValues.username.value, setUsernameError, controller.signal);
                    }, 500)
                return (() => {
                    controller.abort();
                    clearTimeout(timeoutId);
                });
            }
        }, [formValues.username.loading, formValues.username.value]
    )

    return {...formValues, setName, setUsername}
}

export default useCreateForms;