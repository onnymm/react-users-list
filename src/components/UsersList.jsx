import { useState } from 'react';
import { useFilters } from '../lib/hooks/useFilters';
import { filterActiveUsers, filterUsersByName, paginateUsers, sortUsers } from '../lib/users/filterUsers';
import style from './UsersList.module.css';
import UsersListFilters from './UsersListFilters';
import UsersListPagination from './UsersListPagination';
import UsersListRows from './UsersListRows';

const UsersList = ({ initialUsers }) => {

	const {search, onlyActive, sortBy, ...setFiltersFunctions} = useFilters();

	const [page, setPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(2);
	
	const {users, totalPages} = getUsers(initialUsers, {search, onlyActive, sortBy, page, itemsPerPage});


	
	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de usuarios</h1>
			<UsersListFilters
				search={search}
				onlyActive={onlyActive}
				sortBy={sortBy}
				{...setFiltersFunctions}
			/>
				<UsersListRows users={users}/>
				<UsersListPagination
					page={page}
					itemsPerPage={itemsPerPage}
					setPage={setPage}
					setItemsPerPage={setItemsPerPage}
					totalPages={totalPages}
				/>
		</div>
	);
};

const getUsers = (initialUsers, {search, onlyActive, sortBy, page, itemsPerPage}) => {

	let usersFiltered = filterActiveUsers(initialUsers, onlyActive);
	usersFiltered = filterUsersByName(usersFiltered, search);
	usersFiltered = sortUsers(usersFiltered, sortBy);
	const totalPages = Math.ceil(usersFiltered.length / itemsPerPage);
	usersFiltered = paginateUsers(usersFiltered, page, itemsPerPage);


	return {users: usersFiltered, totalPages};
}

export default UsersList;
