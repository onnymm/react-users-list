import { useState } from "react";
import { USER_ROLES } from "../../constants/userRoles";
import { updateUser } from "../../lib/api/usersApi";
import useEditForm from "../../lib/hooks/useEditForm";
import Button from "../buttons/Button";
import InputCheckbox from "../forms/InputCheckbox";
import InputText from "../forms/InputText";
import InputTextAsync from "../forms/InputTextAsync";
import Select from "../forms/Select";
import style from './UserEditForm.module.css';

const UserEditForm = ({onSuccess, user}) => {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const {name, username, role, active, setName, setUsername, setRole, setActive, isFormInvalid} = useEditForm(user);


    return (
            <form onSubmit={(ev) => handleSubmit(ev, {id: user.id, name: name.value, username: username.value, role, active}, setIsSubmitting, onSuccess)}
            >
                <div className={style.row}>
                    <InputText className={style.input} label='Nombre' placeholder='John Doe' value={name.value} onChange={(e) => setName(e.target.value)} error={name.error} spellCheck="false"/>
                    <InputTextAsync className={style.input} label='Username' placeholder='johndoe31' value={username.value} onChange={(e) => setUsername(e.target.value)} success={ username.value !== user.username  && !username.loading && !username.error} loading={username.loading} error={username.error} spellCheck="false"/>
                </div>
                <div className={style.row}>
                    <Select value={role} onChange={(e) => {setRole(e.target.value)}}>
                        <option value={USER_ROLES.TEACHER}>Profesor</option>
                        <option value={USER_ROLES.STUDENT}>Alumno</option>
                        <option value={USER_ROLES.OTHER}>Otros</option>
                    </Select>
                    <div className={style.active}>
                        <InputCheckbox name='active' checked={active} onChange={(e) => setActive(e.target.checked)}/>
                        <span>¿Activo?</span>
                    </div>
                    <Button type='submit' disabled={isFormInvalid || isSubmitting}>
                        {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
                    </Button>
                </div>
            </form>
    )
}

const handleSubmit = async (ev, {id, name, username, role, active}, setIsSubmitting, onSuccess) => {
    ev.preventDefault();

    setIsSubmitting(true);

    const user = {
        id,
        name,
        username,
        role,
        active
    };

    // const success = true;
    console.log("Usuario modificado", user)
    const success = await updateUser(user);

    if (success) {
        onSuccess();
    } else {
        setIsSubmitting(false);
    }
}



export default UserEditForm;