import { useState } from "react";
import validateInputs from '../utils/validateInputs';
import useRequestSearch from "./useRequestSearch";

const useSearch = () => {

    const [error, setError] = useState(null);
    const { requestSearch } = useRequestSearch();

    const handleSubmit = async (e, values) => {
        e.preventDefault();
        setError(null);

        try {
            validateInputs(values)
            //set loading state to true

            //make api request
            const searchedQuotes = await requestSearch(values);
            console.log(searchedQuotes);
            // return result
            return searchedQuotes;
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            // set loading state to false
        }
    }

    return {
        handleSubmit,
        error
    }
}

export default useSearch;