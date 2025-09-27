import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useScroll from "./useScroll";
import useScrollContext from "./useScrollContext";
import { useLocation } from "react-router-dom";
import useQuoteContext from "./useQuoteContext";

const useQuotes = () => {
    const { quotes } = useQuoteContext();

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