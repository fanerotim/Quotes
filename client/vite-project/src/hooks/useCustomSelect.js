import { useState } from "react";

const useCustomSelect = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [choice, setChoice] = useState('Select a category')
   
    const dropdownToggleHandler = () => {
        setIsDropdownOpen((prev) => !prev);
    }

    const updateChoice = (e) => {
        const selectedNode = e.target.nodeName;

        // if the selected node is different than paragraph return
        if (selectedNode !== 'P') {
            return;
        }   

        // get the text of the new choice 
        const choiceText = e.target.textContent;
        // update choice, so it reflects in the custom select
        setChoice((prev) => choiceText);
        // close dropdown after selecting an option
        dropdownToggleHandler();
    }

    return {
        dropdownToggleHandler,
        isDropdownOpen,
        choice,
        updateChoice
    }
}

export default useCustomSelect;