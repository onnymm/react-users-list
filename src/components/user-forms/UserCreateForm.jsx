import { useContext, useState } from "react";
import { CREATE_FORM_ACTIONS } from "../../constants/createFormActions";
import { USER_ROLES } from "../../constants/userRoles";
import { createUser } from "../../lib/api/usersApi";
import { UserFormContext } from "../../lib/contexts/UsersContext";
import useCreateForms from "../../lib/hooks/useCreateForm";
import Button from "../buttons/Button";
import InputCheckbox from "../forms/InputCheckbox";
import InputText from "../forms/InputText";
import InputTextAsync from "../forms/InputTextAsync";
import Select from "../forms/Select";
import style from './UserCreateForm.module.css';

const UserCreateForm = () => {
    const { onSuccess } = useContext(UserFormContext)

    const [isSubmitting, setIsSubmitting] = useState(false);

    const {name, username, dispatchFormValues, isFormInvalid} = useCreateForms();
    console.log(username.value)

    return (
            <form onSubmit={(ev) => handleSubmit(ev, name, username, setIsSubmitting, onSuccess)}
            >
                <div className={style.row}>
                    <InputText className={style.input} label='Nombre' placeholder='John Doe' value={name.value} onChange={(e) => dispatchFormValues({type: CREATE_FORM_ACTIONS.NAME, value: e.target.value})} error={name.error} spellCheck="false"/>
                    <InputTextAsync className={style.input} label='Username' placeholder='johndoe31' value={username.value} onChange={(e) => dispatchFormValues({type: CREATE_FORM_ACTIONS.USERNAME, value: e.target.value})} success={username.value && !username.loading && !username.error} loading={username.loading} error={username.error} spellCheck="false"/>
                </div>
                <div className={style.row}>
                    <Select name='role'>
                        <option value={USER_ROLES.TEACHER}>Profesor</option>
                        <option value={USER_ROLES.STUDENT}>Alumno</option>
                        <option value={USER_ROLES.OTHER}>Otros</option>
                    </Select>
                    <div className={style.active}>
                        <InputCheckbox name='active'/>
                        <span>¿Activo?</span>
                    </div>
                    <Button type='submit' disabled={isFormInvalid || isSubmitting}>
                        {isSubmitting ? 'Creando...' : 'Crear usuario'}
                    </Button>
                </div>
            </form>
    )
}

const handleSubmit = async (ev, name, username, setIsSubmitting, onSuccess) => {
    ev.preventDefault();

    setIsSubmitting(true);

    const user = {
        id: crypto.randomUUID(),
        name: name.value,
        username: username.value,
        role: ev.target.role.value,
        active: ev.target.active.checked
    };

    const success = await createUser(user);

    if (success) {
        onSuccess();
    } else {
        setIsSubmitting(false);
    }
}



export default UserCreateForm;