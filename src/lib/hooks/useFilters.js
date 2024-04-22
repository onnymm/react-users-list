import { useState } from "react";
import { SORT_OPTIONS } from "../../constants/sortOptions";
import { filterActiveUsers, filterUsersByName, paginateUsers, sortUsers } from "../users/filterUsers";

const INITIAL_STATE = {
	search: "",
	onlyActive: false,
	sortBy: SORT_OPTIONS.DEFAULT,
	page: 1,
	itemsPerPage: 6,
};

export const useFilters = () => {
	const [filters, setFilters] = useState(INITIAL_STATE);

	const setSearch = (search) =>
		setFilters({
			...filters,
			page: 1,
			search
		}
	)

	const setSortBy = sortBy =>
		setFilters({
			...filters,
			page: 1,
			sortBy
		}
	)

	const setOnlyActive = onlyActive => {
        const newSortBy = (onlyActive && filters.sortBy === SORT_OPTIONS.ACTIVE)
        ? SORT_OPTIONS.DEFAULT
        : filters.sortBy;

		setFilters({
			...filters,
			sortBy: newSortBy,
			page: 1,
			onlyActive
		})
	}

	const setPage = newPage => 
		setFilters({
			...filters,
			page: newPage,
		})

	const setItemsPerPage = newItemsPerPage => 
	setFilters({
		...filters,
		page: 1,
		itemsPerPage: newItemsPerPage,
	})

	const resetFilters = () => setFilters(INITIAL_STATE)

	const { search, onlyActive, sortBy, page, itemsPerPage } = filters;

	return {
		filters: {
			search, onlyActive, sortBy
		},
		pagination: {
			page, itemsPerPage
		},
		filtersSetters: {
			setSearch, setOnlyActive, setSortBy
		},
		paginationSetters: {
			setPage, setItemsPerPage,
		}, 
		resetFilters
	}
}

export const getUsersToDisplay = (users, { search, onlyActive, sortBy }, { page, itemsPerPage }) => {
	let usersFiltered = filterActiveUsers(users, onlyActive);
	usersFiltered = filterUsersByName(usersFiltered, search);
	usersFiltered = sortUsers(usersFiltered, sortBy);
	
	const {paginatedUsers, totalPages} = paginateUsers(usersFiltered, page, itemsPerPage);

	return { paginatedUsers, totalPages }
}