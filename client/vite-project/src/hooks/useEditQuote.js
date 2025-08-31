import http from "../requester/http";
import { useState } from "react";
import useLogoutOn401Error from "./useLogoutOn401Error";
import validateInputs from "../utils/validateInputs";

const useEditQuote = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { useLogoutOn401 } = useLogoutOn401Error();

    const edit = async (values, quoteId) => {
        setError(null);
        console.log(values)
        try {
            // validate input / throws error on empty field
            validateInputs(values);
            setIsLoading(true);
            await http.put(`${import.meta.env.VITE_BASE_URL}/edit-quote/${quoteId}`, values);
        } catch (err) {
            // check if error is 401 to logout the user
            useLogoutOn401(err);
            setError(err.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    return {
        edit,
        error,
        isLoading
    }
}

export default useEditQuote;