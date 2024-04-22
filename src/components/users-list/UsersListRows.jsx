import UserCard from "./UserCard";
import UserRow from "./UserRow";
import style from './UsersListRows.module.css';

const UsersListRows = ({ users, loading, error, view }) => {
	if (loading) return <p>Cargando...</p>
	if (error) return <p>Error al cargar los usuarios</p>;
	if (!users.length) return <p>No hay usuarios</p>;

	const UserComponent = view ? UserRow : UserCard;

	return <div className={style.container}>{users.map(user => <UserComponent key={user.id} {...user} />)}</div>;
}

export default UsersListRows;