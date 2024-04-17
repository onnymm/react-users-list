import { useState } from "react";
import { USER_ROLES } from "../../constants/userRoles";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import InputCheckbox from "../forms/InputCheckbox";
import InputText from "../forms/InputText";
import InputTextAsync from "../forms/InputTextAsync";
import Select from "../forms/Select";
import CrossIcon from "../icons/CrossIcon";
import style from './UserCreateForm.module.css';

const UserCreateForm = ({onClose}) => {

    const {name, username, setName, setUsername} = useFormValues();

    return (
        <form className={style.form}>
            <IconButton className={style.close} icon={CrossIcon} filled onClick={onClose}/>
            <div className={style.row}>
                <InputText className={style.input} label='nombre' placeholder='John Doe' value={name.value} onChange={(e) => setName(e.target.value)}/>
                <InputTextAsync className={style.input} label='Username' placeholder='johndoe31' value={username.value} onChange={(e) => setUsername(e.target.value)}/>
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
                <Button type='submit'>Crear usuario</Button>
            </div>
        </form>
    )
}

const useFormValues = () => {
    const [formValues, setFormValues] = useState({
        name: {
            value: '',
            error: undefined
        },
        username: {
            value: '',
            error: undefined
        }
    });

    const setName = (newName) => setFormValues({...formValues, name: {value: newName, error: undefined}})
    const setUsername = (newUsername) => setFormValues({...formValues, username: {value: newUsername, error: undefined}})

    return {...formValues, setName, setUsername}
}

export default UserCreateForm;