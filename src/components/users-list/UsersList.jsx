import { useState } from 'react';
import { reset } from '../../lib/actions/filtersActions';
import { UserFormContext } from '../../lib/contexts/UsersContext';
import { useFilters } from '../../lib/hooks/useFilters';
import useUsers from '../../lib/hooks/useUsers';
import AlertBox from '../alerts/AlertBox';
import style from './UsersList.module.css';
import UsersListFilters from './UsersListFilters';
import UsersListPagination from './UsersListPagination';
import UsersListRows from './UsersListRows';
import UsersListViewSelector from './UsersListViewSelector';

const UsersList = () => {
	const [showRowsFormat, setShowRowsFormat] = useState(true);

	const { filters, dispatchFilters } = useFilters();
	const { users, totalUsers, usersLoading, usersError } = useUsers(filters);

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de usuarios</h1>
			<AlertBox />
			<UserFormContext.Provider value={{onSuccess: () => dispatchFilters(reset())}}>
				<UsersListFilters search={filters.search} onlyActive={filters.onlyActive} sortBy={filters.sortBy} dispatchFilters={dispatchFilters} />

				<UsersListViewSelector showRowsFormat={showRowsFormat} setShowRowsFormat={setShowRowsFormat}/>
				<UsersListRows users={users} error={usersError} loading={usersLoading} view={showRowsFormat} />
			</UserFormContext.Provider>
			<UsersListPagination
				page={filters.page}
				itemsPerPage={filters.itemsPerPage}
				dispatchFilters={dispatchFilters}
				totalUsers={totalUsers}
			/>
		</div>
	);
};

export default UsersList;
