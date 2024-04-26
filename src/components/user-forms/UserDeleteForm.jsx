import { useContext, useState } from "react";
import { deleteUser } from "../../lib/api/usersApi";
import { UserFormContext } from "../../lib/contexts/UsersContext";
import Button from "../buttons/Button";
import style from './UserDeleteForm.module.css';

const UserDeleteForm = ({currentUser, closeModal}) => {
    const { onSuccess } = useContext(UserFormContext);

    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
            <form className={style.form} onSubmit={(ev) => handleSubmit(ev, {id: currentUser.id}, setIsSubmitting, onSuccess, closeModal)}
            >
                <p>¿Eliminar usuario <b>{currentUser.name}</b> permanentemente? Este movimiento no se puede revertir</p>
                    <Button type='submit' disabled={isSubmitting} kind="secondary">
                        {isSubmitting ? 'Eliminando...' : 'Eliminar usuario'}
                    </Button>
                    <Button type='button' disabled={isSubmitting} onClick={closeModal}>Cancelar</Button>
            </form>
    )
}

const handleSubmit = async (ev, {id}, setIsSubmitting, onSuccess, closeModal) => {
    ev.preventDefault();

    setIsSubmitting(true);

    const success = await deleteUser(id);

    if (success) {
        onSuccess();
        closeModal();
    } else {
        setIsSubmitting(false);
    }
}



export default UserDeleteForm;