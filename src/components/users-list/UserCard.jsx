import { useContext } from 'react';
import { UserFormContext } from '../../lib/contexts/UsersContext';
import IconButton from '../buttons/IconButton';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
import UserDisplay from '../user/UserDisplay';
import UserRole from '../user/UserRole';
import UserStatus from '../user/UserStatus';
import style from './UserCard.module.css';


const UserCard = ({ id, username, name, active, role}) => {
	const {setEditForm, setDeleteForm} = useContext(UserFormContext)


	return (
		<div className={style.wrapper}>
			<div className={style.card}>
				<div className={style.name}>
					<UserDisplay name={name} username={username} />
				</div>
				<div className={style.info}>
					<UserRole role={role} />
					<UserStatus active={active} />
					<div className={style.actions}>
						<IconButton icon={PencilIcon} onClick={() => setEditForm({id, username, name, active, role})}/>
						<IconButton icon={TrashIcon} onClick={() => setDeleteForm({id, name})} kind='red'/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
