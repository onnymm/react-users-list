import UserRole from './UserRole';
import style from './UserRow.module.css';
import UserStatus from './UserStatus';

const UserRow = ({ id, name, active, role, toggleUserActive }) => {

	console.log("Render de UserRow")

	return (
		<div className={style.user}>
			<div className={style.name}>
				<span>{name}</span>
			</div>
			<div className={style.status}>
				<UserStatus active={active} />
			</div>
			<div className={style.role}>
				<UserRole role={role} />
			</div>
			<div className={style.action}>
				<button
					onClick={() => {toggleUserActive(id)}}
					className='btn-style btn-medium'
				>
					{active ? 'Desactivar' : 'Activar'}
				</button>
			</div>
		</div>
	);
};

export default UserRow;
