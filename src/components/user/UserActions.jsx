import { useState } from "react";
import IconButton from "../buttons/IconButton";
import PencilIcon from "../icons/PencilIcon";
import TrashIcon from "../icons/TrashIcon";
import Modal from "../modal/Modal";
import UserDeleteForm from "../user-forms/UserDeleteForm";
import UserEditForm from "../user-forms/UserEditForm";

const UserActions = ({user}) => {
    const [modalContent, setModalContent] = useState(false)

    return (
        <>
            <Modal closeModal={() => {setModalContent(false)}}>
				{modalContent}
			</Modal>
            <IconButton icon={PencilIcon} onClick={() => setModalContent(<UserEditForm closeModal={() => {setModalContent(false)}} currentUser={user} />)} />
            <IconButton icon={TrashIcon} onClick={() => setModalContent(<UserDeleteForm closeModal={() => {setModalContent(false)}} currentUser={user}/>)} kind='red'/>
        </>
    );
};

export default UserActions;