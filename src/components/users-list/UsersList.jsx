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
	const [showRowsFormat, setShowRowsFormat] = useState(true);

	const { filters, filtersSetters, paginationSetters, resetFilters } = useFilters();
	const { users, totalUsers, usersLoading, usersError } = useUsers(filters);


	

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de usuarios</h1>
			<UserFormProvider resetFilters={resetFilters}>
				<UsersListFilters search={filters.search} onlyActive={filters.onlyActive} sortBy={filters.sortBy} {...filtersSetters} />

				<UserFormContainer />
				<UsersListViewSelector showRowsFormat={showRowsFormat} setShowRowsFormat={setShowRowsFormat}/>
				<UsersListRows users={users} error={usersError} loading={usersLoading} view={showRowsFormat} />
			</UserFormProvider>
			<UsersListPagination
				page={filters.page}
				itemsPerPage={filters.itemsPerPage}
				{...paginationSetters}
				totalUsers={totalUsers}
			/>
		</div>
	);
};

export default UsersList;
