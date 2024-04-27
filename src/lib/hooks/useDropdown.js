import { useEffect, useRef, useState } from "react";

const useDropdown = () => {
    const [dropDownOpened, setDropdownOpened] = useState(false);
    const dropdownRef = useRef(null);

    const openDropdown = () => setDropdownOpened(true);
    const closeDropdown = () => setDropdownOpened(false);

    useEffect(
        () => {
            if (!dropDownOpened) return;

            const handleClickOutside = (ev) => {
                if (!dropdownRef.current.contains(ev.target)){
                    console.log("Ejecución", dropdownRef, ev.target)
                    closeDropdown();
                }
                
            }
            document.addEventListener('click', handleClickOutside, {capture: true})
            
            return(
                () => {
                    document.addEventListener('click', handleClickOutside, {capture: true});
                }
            )
        }, [dropDownOpened]
    )

    return {dropDownOpened, dropdownRef, openDropdown, closeDropdown};
}

export default useDropdown;