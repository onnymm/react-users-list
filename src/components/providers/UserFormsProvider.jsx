import { UserFormContext } from "../../lib/contexts/UsersContext";
import useSelectedForm from "../../lib/hooks/useSelectedForm";

const UserFormProvider = ({reloadUsers, resetFilters, children}) => {
    const { setFiltersForm, ...restSelectedForm } = useSelectedForm();

    const onSuccess = () => {
		reloadUsers();
		resetFilters();
		setFiltersForm();
	}

    return (
        <UserFormContext.Provider value={{ setFiltersForm, onSuccess, ...restSelectedForm }}>
            {children}
        </UserFormContext.Provider>
    )
}

export default UserFormProvider;