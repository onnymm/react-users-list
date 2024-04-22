import { useEffect, useState } from "react";
import { deleteUser } from "../../lib/api/usersApi";
import Button from "../buttons/Button";
import style from './UserDeleteForm.module.css';

const UserDeleteForm = ({onSuccess,onCancel, user }) => {
    const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true)

    useEffect(
        () => {
            setDeleteButtonDisabled(true);
            setTimeout(
                () => {
                    setDeleteButtonDisabled(false);
                }, 1500
            )
        }, [user]
    )

    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
            <form onSubmit={(ev) => handleSubmit(ev, {id: user.id}, setIsSubmitting, onSuccess)}
            >
                <p className={style.text}>¿Eliminar usuario <b>{user.name}</b> permanentemente? Este movimiento no se puede revertir</p>
                <div className={style.row}>
                    <Button type='submit' disabled={deleteButtonDisabled || isSubmitting} kind="secondary">
                        {isSubmitting ? 'Eliminando...' : 'Eliminar usuario'}
                    </Button>
                    <Button type='button' disabled={isSubmitting} onClick={onCancel}>Cancelar</Button>
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