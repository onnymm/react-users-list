import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import CrossCircleIcon from '../components/icons/CrossCircleIcon';
import style from './UserStatus.module.css';

const UserStatus = ({ active }) => {
	const activeClassName = active ? style.active : style.inactive;
	const Icon = active ? CheckCircleIcon : CrossCircleIcon;

	return (
	<div className={activeClassName}>
		<Icon className={style.icon}/>
		<span>{active ? 'Activo' : 'Inactivo'}</span>
	</div>
	);
};

export default UserStatus;
