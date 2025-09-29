import { useState } from "react";
import http from "../requester/http";
import validateInputs from "../utils/validateInputs";
import useLogoutOn401Error from "./useLogoutOn401Error";
import useHasMoreQuotes from "./useHasMoreQuotes";

const useAddQuote = () => {
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const { logoutOn401 } = useLogoutOn401Error();
    const { setHasMoreStatus } = useHasMoreQuotes();

    const addQuote = async (values) => {
        setError(null);

        try {
            validateInputs(values);
            setLoading(true);
            const newQuote = await http.post(`${import.meta.env.VITE_BASE_URL}/add-quote`, values);
            // update local storage status of hasMore to true to make sure load more button is enabled again
            setHasMoreStatus(true);
            return newQuote;
        } catch (err) {
            // check if error is 401 to logout the user
            logoutOn401(err);
            setError(err.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {
        addQuote,
        error,
        isLoading
    }
}

export default useAddQuote;