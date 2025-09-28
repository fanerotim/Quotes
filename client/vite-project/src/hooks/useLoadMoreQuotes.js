import useRequestMoreQuotes from "./useRequestMoreQuotes";
import useQuoteContext from '../hooks/useQuoteContext';
import { useState } from "react";
import useLocalStorageQuotes from './useLocalStorageQuotes';

const useLoadMoreQuotes = () => {

    const { requestQuotes } = useRequestMoreQuotes();
    const { quotes, updateQuotes } = useQuoteContext();
    const [hasMore, setHasMore] = useState(true);
    const { updateLocalStorageQuotes } = useLocalStorageQuotes();

    // conditional chaining kept in case someone decide to delete localStorage manually
    const offset = quotes?.length;
    const limit = 10;

    const clickHandler = async () => {

        try {
            const nextQuotes = await requestQuotes(offset, limit);
            const updatedLocalStorageQuotes = updateLocalStorageQuotes(nextQuotes);
            // update quotes context state
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