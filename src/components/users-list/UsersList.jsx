import { useState } from 'react';
import { useFilters } from '../../lib/hooks/useFilters';
import useUsers from '../../lib/hooks/useUsers';
import UserFormProvider from '../providers/UserFormsProvider';
import UserFormContainer from '../user-forms/UserFormContainer';
import style from './UsersList.module.css';
import UsersListFilters from './UsersListFilters';
import UsersListPagination from './UsersListPagination';
import UsersListRows from './UsersListRows';
import UsersListViewSelector from './UsersListViewSelector';

const UsersList = () => {
	const [view, setView] = useState(true);

	const { filters, filtersSetters, paginationSetters, resetFilters } = useFilters();
	const { users, usersCount, usersLoading, usersError } = useUsers(filters);


	

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de usuarios</h1>
			<UserFormProvider resetFilters={resetFilters}>
				<UsersListFilters search={filters.search} onlyActive={filters.onlyActive} sortBy={filters.sortBy} {...filtersSetters} />

				<UserFormContainer />
				<UsersListViewSelector view={view} setView={setView}/>
				<UsersListRows users={users} error={usersError} loading={usersLoading} view={view} />
			</UserFormProvider>
			<UsersListPagination
				page={filters.page}
				itemsPerPage={filters.itemsPerPage}
				{...paginationSetters}
				totalUsers={usersCount}
			/>
		</div>
	);
};

export default UsersList;
