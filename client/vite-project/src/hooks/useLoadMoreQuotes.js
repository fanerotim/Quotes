import useRequestMoreQuotes from "./useRequestMoreQuotes";
import useQuoteContext from '../hooks/useQuoteContext';
import { useState } from "react";
import useInitialQuotes from '../hooks/useInitialQuotes';

const useLoadMoreQuotes = () => {

    const { requestQuotes } = useRequestMoreQuotes();
    const { quotes, updateQuotes } = useQuoteContext();
    const [hasMore, setHasMore] = useState(true);
    const { setQuotesinLocalStorage } = useInitialQuotes();

    const offset = quotes?.length;
    const limit = 10;

    const clickHandler = async () => {

        try {
            const nextQuotes = await requestQuotes(offset, limit);
            const updatedLocalStorageQuotes = setQuotesinLocalStorage(nextQuotes);
            updateQuotes(updatedLocalStorageQuotes);
            // think about and improve this logic - think about isLoading state. should i use reducer?
            if (nextQuotes.length < limit) {
                setHasMore(false);
            }

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