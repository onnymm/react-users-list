import { useState } from "react";
import { SORT_OPTIONS } from "../../constants/sortOptions";
import { PAGINATION } from "../../constants/pagination";

const INITIAL_STATE = {
	search: "",
	onlyActive: false,
	sortBy: SORT_OPTIONS.DEFAULT,
	page: PAGINATION.DEFAULT_PAGE,
	itemsPerPage: PAGINATION.DEFAULT_ITEMS_PER_PAGE,
};

export const useFilters = () => {
	const [filters, setFilters] = useState(INITIAL_STATE);

	const setSearch = (search) =>
		setFilters({
			...filters,
			page: PAGINATION.DEFAULT_PAGE,
			search
		}
	)

	const setSortBy = sortBy =>
		setFilters({
			...filters,
			page: PAGINATION.DEFAULT_PAGE,
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
			page: PAGINATION.DEFAULT_PAGE,
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
		page: PAGINATION.DEFAULT_PAGE,
		itemsPerPage: newItemsPerPage,
	})

	const resetFilters = () => setFilters({...INITIAL_STATE})

	return {
		filters,
		filtersSetters: {
			setSearch, setOnlyActive, setSortBy
		},
		paginationSetters: {
			setPage, setItemsPerPage,
		}, 
		resetFilters
	}
}