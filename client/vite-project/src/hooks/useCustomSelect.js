import { useState } from "react";

const useCustomSelect = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   
    const dropdownToggleHandler = () => {
        setIsDropdownOpen((prev) => !prev);
    }

    return {
        dropdownToggleHandler,
        isDropdownOpen
    }
}

export default useCustomSelect;