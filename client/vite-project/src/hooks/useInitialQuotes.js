import useRequestMoreQuotes from "./useRequestMoreQuotes";

const useInitialQuotes = () => {

    const { requestQuotes } = useRequestMoreQuotes();
    const offset = 0;
    const limit = 10;

    const getInitialQuotes = async () => {

        try {
            const initialQuotes = await requestQuotes(offset, limit);
            setInitialQuotesinLocalStorage(initialQuotes)
        } catch (err) {
            console.error(err);
            throw err.message
        }
    }

    const getQuotesFromLocalStorage = () => {
        const localStorageQuotes = JSON.parse(localStorage.getItem('quotes'));
        return localStorageQuotes;
    }

    const setInitialQuotesinLocalStorage = (quotes) => {
        localStorage.setItem('quotes', JSON.stringify(quotes));
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
        getInitialQuotes,
        setQuotesinLocalStorage,
        getQuotesFromLocalStorage
    }
}

export default useInitialQuotes;