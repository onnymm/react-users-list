import { useContext, useRef, useState } from "react";
import { updateUserPic } from "../../lib/api/usersApi";
import { UserFormContext } from "../../lib/contexts/UsersContext";
import { alertBox } from "../../lib/events/alertEvents";
import { fileToDataURL } from "../../lib/utils/file-utils";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import PencilIcon from "../icons/PencilIcon";
import PictureIcon from "../icons/PictureIcon";
import style from './UserPicForm.module.css';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png']
const MAX_SIZE = 102400

const UserPicForm = ({closeModal, currentUser}) => {
    const { onSuccess } = useContext(UserFormContext)
    const [preview, setPreview] = useState();
    const message = getMessage(preview)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const inputRef = useRef(null);

    return (
        <>
            <div className={style.wrapper}>
                <div className={style.preview}>
                    {
                        preview && preview.src ?
                            <img src={preview.src} alt="Preview" />
                            :
                            <PictureIcon className={style.icon}/>
                        }
                        <IconButton className={style.iconButton} icon={PencilIcon} filled onClick={() => inputRef.current.click()} />
                </div>
                {message}
                <input ref={inputRef} className={style.input} type="file" accept={ALLOWED_MIME_TYPES.join(',')} onChange={(ev) => handleChange(ev, setPreview)} />
                <Button className={style.button} disabled={isSubmitting || !preview || !preview.src} onClick={() => handleClick(currentUser.id, closeModal, onSuccess, preview, setIsSubmitting)}>{isSubmitting ? "Actualizando" : "Actualizar foto"}</Button>
            </div>
        </>
    )
};

const getMessage = (preview) => {
    if (!preview) return (<span>JPG/PNG | Máx 100Kb</span>);

    return (
        preview.filename ? (
            <span className={style.filename}>{preview.filename}</span>
        ) : (
            <span className={style.error}>{preview.error}</span>
        )
    )
}

const handleChange = async (ev, setPreview) => {
    const file = ev.target.files[0];

    if(!file) {
        setPreview();
        return;
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        setPreview(
            {
                error: 'Sólo JPG/PNG'
            }
        )
        return;
    }

    
    if(file.size > MAX_SIZE) {
        setPreview(
            {
                error: 'Máximo 100Kb'
            }
        )
        return;
    }

    try {
        const dataUrl = await fileToDataURL(file);

        setPreview(
            {
                src: dataUrl,
                filename: file.name
            }
        )

    } catch (err) {
        setPreview(
            {
                error: err.message
            }
        );
    }
}

const handleClick = async (userId, closeModal, onSuccess, preview, setIsSubmitting) => {
    console.log(userId)
    if (!preview) return;

    setIsSubmitting(true)

    try {
        const success = await updateUserPic(userId, preview.src);

        if(success){
            alertBox.success("Imagen actualizada con éxito")
            onSuccess();
        }else{
            alertBox.error("Error al actualizar la foto")
            setIsSubmitting(false)
        }
        
    } catch (err) {
    }
    
    closeModal();
    
}

export default UserPicForm;