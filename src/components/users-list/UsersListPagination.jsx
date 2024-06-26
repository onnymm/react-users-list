import { PAGINATION } from "../../constants/pagination";
import { itemsPerPageChanged, pageChanged } from "../../lib/actions/filtersActions";
import PageSelector from "../forms/PageSelector";
import Select from "../forms/Select";
import style from "./UsersListPagination.module.css";

const UsersListPagination = ({page, itemsPerPage, dispatchFilters, totalUsers}) => (
    <div className={style.wrapper}>
        <div className={style.itemsPerPage}>
            <Select value={itemsPerPage} onChange={ev => dispatchFilters(itemsPerPageChanged(Number(ev.target.value)))}>
                {PAGINATION.ITEMS_PER_PAGE_VALUES.map(
                    (value) => (
                        <option value={value} key={value}>{value}</option>
                    )
                )}
            </Select>
            <p>Elementos por página</p>
        </div>
        <PageSelector page={page} totalPages={Math.ceil(totalUsers / itemsPerPage)} setPage={(value) => dispatchFilters(pageChanged(value))} />
    </div>
)

export default UsersListPagination;