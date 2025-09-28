import useRequestMoreQuotes from "./useRequestMoreQuotes";

const useLocalStorageQuotes = () => {

    // make api calls with this method - maybe rename it to be clear
    const { requestQuotes } = useRequestMoreQuotes();

    // hardcoded values as those are the initial quotes; for now we control them from here
    const offset = 0;
    const limit = 10;

    const setInitialQuotesInLocalStorage = async () => {

        try {
            const initialQuotes = await requestQuotes(offset, limit);
            localStorage.setItem('quotes', JSON.stringify(initialQuotes));
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

    return {
        setInitialQuotesInLocalStorage,
        updateLocalStorageQuotes,
        getQuotesFromLocalStorage
    }
}

export default useLocalStorageQuotes;