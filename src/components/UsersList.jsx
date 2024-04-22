import { getUsersToDisplay, useFilters } from '../lib/hooks/useFilters';
import useUsers from '../lib/hooks/useUsers';
import style from './UsersList.module.css';
import UsersListFilters from './UsersListFilters';
import UsersListPagination from './UsersListPagination';
import UsersListRows from './UsersListRows';
import UserFormProvider from './providers/UserFormsProvider';
import UserFormContainer from './user-forms/UserFormContainer';

const UsersList = () => {

	const { filters, pagination, filtersSetters, paginationSetters, resetFilters } = useFilters();
	const { users, usersLoading, usersError, reloadUsers } = useUsers();
	const { paginatedUsers, totalPages } = getUsersToDisplay(users, {...filters}, {...pagination} )


	

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de usuarios</h1>
			<UserFormProvider resetFilters={resetFilters} reloadUsers={reloadUsers}>
				<UsersListFilters {...filters} {...filtersSetters} />

				<UserFormContainer />

				<UsersListRows users={paginatedUsers} error={usersError} loading={usersLoading} />
			</UserFormProvider>
			<UsersListPagination
				{...pagination}
				{...paginationSetters}
				totalPages={totalPages}
			/>
		</div>
	);
};

export default UsersList;
