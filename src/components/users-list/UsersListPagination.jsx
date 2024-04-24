import { FILTERS_ACTIONS } from "../../constants/filtersActions";
import { PAGINATION } from "../../constants/pagination";
import PageSelector from "../forms/PageSelector";
import Select from "../forms/Select";
import style from "./UsersListPagination.module.css";

const UsersListPagination = ({page, itemsPerPage, dispatchFilters, totalUsers}) => (
    <div className={style.wrapper}>
        <div className={style.itemsPerPage}>
            <Select value={itemsPerPage} onChange={ev => dispatchFilters({type: FILTERS_ACTIONS.ITEMS_PER_PAGE, value: Number(ev.target.value)})}>
                {PAGINATION.ITEMS_PER_PAGE_VALUES.map(
                    (value) => (
                        <option value={value} key={value}>{value}</option>
                    )
                )}
            </Select>
            <p>Elementos por página</p>
        </div>
        <PageSelector page={page} totalPages={Math.ceil(totalUsers / itemsPerPage)} setPage={(value) => dispatchFilters({type: FILTERS_ACTIONS.PAGE, value})} />
    </div>
)

export default UsersListPagination;