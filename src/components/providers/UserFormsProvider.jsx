import { UserFormContext } from "../../lib/contexts/UsersContext";
import useSelectedForm from "../../lib/hooks/useSelectedForm";

const UserFormProvider = ({resetFilters, children}) => {
    const { setFiltersForm, ...restSelectedForm } = useSelectedForm();

    const onSuccess = () => {
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