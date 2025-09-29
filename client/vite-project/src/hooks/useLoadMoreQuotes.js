import useRequestMoreQuotes from "./useRequestMoreQuotes";
import useQuoteContext from '../hooks/useQuoteContext';
import useLocalStorageQuotes from './useLocalStorageQuotes';
import useHasMoreQuotes from './useHasMoreQuotes';

const useLoadMoreQuotes = () => {

    const { requestQuotes } = useRequestMoreQuotes();
    const { quotes, updateQuotes } = useQuoteContext();
    const { updateLocalStorageQuotes } = useLocalStorageQuotes();
    const {
        getHasMoreStatus,
        setHasMoreStatus
    }
        = useHasMoreQuotes();

    // conditional chaining kept in case someone decide to delete localStorage manually
    const offset = quotes?.length;
    const limit = 10;

    const clickHandler = async () => {

        try {
            const nextQuotes = await requestQuotes(offset, limit);
            const updatedLocalStorageQuotes = updateLocalStorageQuotes(nextQuotes);
            // update quotes context state
            updateQuotes(updatedLocalStorageQuotes);

            // if returned quotes are less than limit, then there are no more quotes in db atm and thus we want to disable 'load more' btn
            if (nextQuotes.length < limit) {
                setHasMoreStatus(false);
            }

        } catch (err) {
            throw err.message
        }
    }

    return {
        clickHandler
    }
}

export default useLoadMoreQuotes;