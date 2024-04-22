import { useContext, useState } from "react";
import { deleteUser } from "../../lib/api/usersApi";
import { UserFormContext } from "../../lib/contexts/UsersContext";
import Button from "../buttons/Button";
import style from './UserDeleteForm.module.css';

const UserDeleteForm = () => {
    const { currentUser, onSuccess, setFiltersForm } = useContext(UserFormContext)

    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
            <form onSubmit={(ev) => handleSubmit(ev, {id: currentUser.id}, setIsSubmitting, onSuccess)}
            >
                <p className={style.text}>¿Eliminar usuario <b>{currentUser.name}</b> permanentemente? Este movimiento no se puede revertir</p>
                <div className={style.row}>
                    <Button type='submit' disabled={isSubmitting} kind="secondary">
                        {isSubmitting ? 'Eliminando...' : 'Eliminar usuario'}
                    </Button>
                    <Button type='button' disabled={isSubmitting} onClick={setFiltersForm}>Cancelar</Button>
                </div>
            </form>
    )
}

const handleSubmit = async (ev, {id}, setIsSubmitting, onSuccess) => {
    ev.preventDefault();

    setIsSubmitting(true);

    const success = await deleteUser(id);

    if (success) {
        onSuccess();
    } else {
        setIsSubmitting(false);
    }
}



export default UserDeleteForm;