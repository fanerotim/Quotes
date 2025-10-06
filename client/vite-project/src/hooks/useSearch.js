import { useState } from "react";
import validateInputs from '../utils/validateInputs';
import useRequestSearch from "./useRequestSearch";
import useQuoteContext from "./useQuoteContext";

const useSearch = () => {

    const [error, setError] = useState(null);
    const { requestSearch } = useRequestSearch();
    const { updateQuotes } = useQuoteContext();

    const handleSubmit = async (e, values) => {
        e.preventDefault();
        setError(null);

        try {
            validateInputs(values)
            //set loading state to true - NOT YET IMPLEMENTED

            //make api request
            const searchedQuotes = await requestSearch(values);
            // update quotes state in Quote context, but think if it will be better to update local storage as if I open details of a quote and then come back to quotes page my serach result disappears
            updateQuotes(searchedQuotes);
            // return result
            return searchedQuotes;
        } catch (err) {
            setError(err.message);
        } finally {
            // set loading state to false - NOT YET IMPLEMENTED
        }
    }

    return {
        handleSubmit,
        error
    }
}

export default useSearch;