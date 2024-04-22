import { useContext } from 'react';
import { UserFormContext } from '../../lib/contexts/UsersContext';
import IconButton from '../buttons/IconButton';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
import UserDisplay from '../user/UserDisplay';
import UserRole from '../user/UserRole';
import UserStatus from '../user/UserStatus';
import style from './UserRow.module.css';


const UserRow = ({ id, username, name, active, role}) => {
	const {setEditForm, setDeleteForm} = useContext(UserFormContext)


	return (
		<div className={style.wrapper}>
			<div className={style.name}>
				<UserDisplay name={name} username={username} />
			</div>
			<div className={style.status}>
				<UserStatus active={active} />
			</div>
			<div className={style.role}>
				<UserRole role={role} />
			</div>
			<div className={style.action}>
				<IconButton icon={PencilIcon} onClick={() => setEditForm({id, username, name, active, role})}/>
				<IconButton icon={TrashIcon} onClick={() => setDeleteForm({id, name})} kind='red'/>
			</div>
		</div>
	);
};

export default UserRow;
