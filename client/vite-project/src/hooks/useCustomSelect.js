import { useState } from "react";

const useCustomSelect = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [choice, setChoice] = useState('Select a category')
   
    const dropdownToggleHandler = () => {
        setIsDropdownOpen((prev) => !prev);
    }

    const updateChoice = (e) => {
        const clickedNode = e.target.nodeName;

        // if the selected node is different than paragraph (text) or div (text container) return
        // i.e. if user clicks on the checkox return. if allowed, this breaks the text in the custom select as checkbox does not have textContent
        if (clickedNode !== 'P' && clickedNode !== 'DIV') {
            return
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