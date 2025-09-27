import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useScroll from "./useScroll";
import useScrollContext from "./useScrollContext";
import { useLocation } from "react-router-dom";
import useQuoteContext from "./useQuoteContext";
import useInitialQuotes from './useInitialQuotes';

const useQuotes = () => {
    const { quotes, updateQuotes } = useQuoteContext();
    const { getQuotesFromLocalStorage } = useInitialQuotes();

    const { createMap, scrollToItem } = useScroll();
    const mapRefs = createMap();
    // get scroll context data: item id and setter fn
    const { itemId, updateItemId } = useScrollContext();

    const navigate = useNavigate();
    // access isBack prop (provided by back button) - use optional chaining as normally this prop does not exist;
    const isBack = useLocation().state?.isBack;

    const clickHandler = (id) => {
        // update scroll context's itemId upon route change (so we know where to go back to afterwards)
        updateItemId(id)
        navigate(`/quotes/${id}`)
    }

    useEffect(() => {

        // check what quotes we have in localStorage (current cache) and update context state
        const currentQuotes = getQuotesFromLocalStorage();
        updateQuotes(currentQuotes);

        // check if user is navigating back and scroll to the quote the last opened
        if (isBack) {
            scrollToItem(itemId);
        }
    }, [])

    return {
        quotes,
        mapRefs,
        clickHandler
    }
}

export default useQuotes;