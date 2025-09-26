import useRequestMoreQuotes from "./useRequestMoreQuotes";
import useQuoteContext from '../hooks/useQuoteContext';
import { useState } from "react";

const useLoadMoreQuotes = () => {

    const { requestQuotes } = useRequestMoreQuotes();
    const { quotes, updateQuotes } = useQuoteContext();
    const [hasMore, setHasMore] = useState(true);

    const offset = quotes.length;
    const limit = 10;

    const clickHandler = async () => {

        try {
            const nextQuotes = await requestQuotes(offset, limit);

            if (nextQuotes.length < 1) {
                setHasMore(false);
            }
            updateQuotes(nextQuotes);
        } catch (err) {
            throw err.message
        }
    }

    return {
        clickHandler,
        hasMore
    }
}

export default useLoadMoreQuotes;