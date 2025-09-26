import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useScroll from "./useScroll";
import useScrollContext from "./useScrollContext";
import { useLocation } from "react-router-dom";
import useRequestMoreQuotes from "./useRequestMoreQuotes";

const useQuotes = () => {
    const [quotes, setQuotes] = useState([]);
    const { requestQuotes } = useRequestMoreQuotes();
    const offset = 0;
    const limit = 10;

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

    // TODO: TOO MANY RERENDERS; FIX THIS;
    useEffect(() => {

        (async () => {
            const result = await requestQuotes(offset, limit);
            setQuotes(result);

            // scroll to quote that was accessed before if user is clicking back button
            if (isBack) {
                scrollToItem(itemId);
            }
        })();

    }, [])

    return {
        quotes,
        mapRefs,
        clickHandler
    }
}

export default useQuotes;