import UserRow from "./UserRow";

const UsersListRows = ({ users, loading, error, setEditForm, setDeleteForm}) => {
	if (loading) return <p>Cargando...</p>
	if (error) return <p>Error al cargar los usuarios</p>;
	if (!users.length) return <p>No hay usuarios</p>;

	return users.map(user => <UserRow key={user.id} setEditForm={setEditForm} setDeleteForm={setDeleteForm} {...user} />);
}

export default UsersListRows;