import { useState } from "react";
import { USER_ROLES } from "../../constants/userRoles";
import { createUser } from "../../lib/api/usersApi";
import useCreateForms from "../../lib/hooks/useCreateForms";
import Button from "../buttons/Button";
import InputCheckbox from "../forms/InputCheckbox";
import InputText from "../forms/InputText";
import InputTextAsync from "../forms/InputTextAsync";
import Select from "../forms/Select";
import style from './UserCreateForm.module.css';

const UserCreateForm = ({onSuccess}) => {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const {name, username, setName, setUsername, isFormValid} = useCreateForms();

    return (
            <form onSubmit={(ev) => handleSubmit(ev, name, username, setIsSubmitting, onSuccess)}
            >
                <div className={style.row}>
                    <InputText className={style.input} label='Nombre' placeholder='John Doe' value={name.value} onChange={(e) => setName(e.target.value)} error={name.error} spellCheck="false"/>
                    <InputTextAsync className={style.input} label='Username' placeholder='johndoe31' value={username.value} onChange={(e) => setUsername(e.target.value)} success={username.value && !username.loading && !username.error} loading={username.loading} error={username.error} spellCheck="false"/>
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
                    <Button type='submit' disabled={isFormValid || isSubmitting}>
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