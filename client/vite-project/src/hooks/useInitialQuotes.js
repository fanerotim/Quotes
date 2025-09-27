import useRequestMoreQuotes from "./useRequestMoreQuotes";

const useInitialQuotes = () => {

    // make api calls with this method - maybe rename it to be clear
    const { requestQuotes } = useRequestMoreQuotes();

    // hardcoded values as those are the initial values, we control them from here
    const offset = 0;
    const limit = 10;

    const setInitialQuotes = async () => {

        try {
            const initialQuotes = await requestQuotes(offset, limit);
            localStorage.setItem('quotes', JSON.stringify(initialQuotes));
            // setInitialQuotesinLocalStorage(initialQuotes)
        } catch (err) {
            console.error(err);
            throw err.message
        }
    }

    const getQuotesFromLocalStorage = () => {
        const localStorageQuotes = JSON.parse(localStorage.getItem('quotes'));
        return localStorageQuotes;
    }

    const setQuotesinLocalStorage = (newQuotes) => {
        // get existing quotes in local storage
        const existingQuotes = JSON.parse(localStorage.getItem('quotes'));
        // update local storage by adding new quotes
        const newQuoqtes = [...existingQuotes, ...newQuotes];
        localStorage.setItem('quotes', JSON.stringify(newQuoqtes));
        const updatedLocalStorageQuotes = JSON.parse(localStorage.getItem('quotes'));
        // return updated quotes, so context can be updated
        return updatedLocalStorageQuotes;
    }

    return {
        setInitialQuotes,
        setQuotesinLocalStorage,
        getQuotesFromLocalStorage
    }
}

export default useInitialQuotes;