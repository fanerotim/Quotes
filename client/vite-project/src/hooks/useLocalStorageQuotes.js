import useRequestMoreQuotes from "./useRequestMoreQuotes";
import useHasMoreQuotes from "./useHasMoreQuotes";

const useLocalStorageQuotes = () => {

    // make api calls with this method - maybe rename it to be clear
    const { requestQuotes } = useRequestMoreQuotes();

    // set initial status of hasMore flag in localStorage
    const { setHasMoreStatus } = useHasMoreQuotes();

    // hardcoded values as those are the initial quotes; for now we control them from here
    const offset = 0;
    const limit = 10;

    const setInitialQuotesInLocalStorage = async () => {

        try {
            const initialQuotes = await requestQuotes(offset, limit);
            localStorage.setItem('quotes', JSON.stringify(initialQuotes));

            // set initial status of hasMore (controls load more quotes button)
            initialQuotes.length < limit
                ? setHasMoreStatus(false)
                : setHasMoreStatus(true);

        } catch (err) {
            console.error(err);
            throw err.message
        }
    }

    const getQuotesFromLocalStorage = () => {
        const localStorageQuotes = JSON.parse(localStorage.getItem('quotes'));
        return localStorageQuotes;
    }

    const updateLocalStorageQuotes = (nextQuotes) => {
        // get current quotes in local storage
        const currentQuotesInLocalStorage = getQuotesFromLocalStorage();
        // update quotes in local storage
        localStorage.setItem('quotes', JSON.stringify([...currentQuotesInLocalStorage, ...nextQuotes]));
        // get updated local storage quotes
        const updatedLocalStorageQuotes = getQuotesFromLocalStorage();
        // return updated quotes, so quote context can be updated
        return updatedLocalStorageQuotes;
    }

    const filterLocalStorageQuotesAfterDelete = (id) => {
        const currentQuotesInLocalStorage = getQuotesFromLocalStorage();
        const filteredQuotesAfterDelete = currentQuotesInLocalStorage.filter((q) => q.id !== Number(id));
        localStorage.setItem('quotes', JSON.stringify(filteredQuotesAfterDelete));
    }

    const updateLocalStorageQuotesAfterEdit = (values) => {
        const currentQuotesInLocalStorage = getQuotesFromLocalStorage();
        const updatedLocalStorageQuotesAfterEdit = currentQuotesInLocalStorage
        .map((q) => q.id == values.id ? values : q);
        localStorage.setItem('quotes', JSON.stringify(updatedLocalStorageQuotesAfterEdit));
    }

    return {
        setInitialQuotesInLocalStorage,
        updateLocalStorageQuotes,
        getQuotesFromLocalStorage,
        filterLocalStorageQuotesAfterDelete,
        updateLocalStorageQuotesAfterEdit
    }
}

export default useLocalStorageQuotes;