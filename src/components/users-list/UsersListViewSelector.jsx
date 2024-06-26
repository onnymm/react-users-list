import GridIcon from "../icons/GridIcon";
import ListIcon from "../icons/ListIcon";
import style from "./UsersListViewSelector.module.css";

const UsersListViewSelector = ({ showRowsFormat, setShowRowsFormat }) => (
    <div className={style.wrapper}>
        <button onClick={() => setShowRowsFormat(false)} disabled={showRowsFormat === false}>
            <GridIcon className={style.icon}/>
        </button>
        <div className={style.divider} />
        <button onClick={() => setShowRowsFormat(true)} disabled={showRowsFormat === true}>
            <ListIcon className={style.icon}/>
        </button>
    </div>
)

export default UsersListViewSelector;