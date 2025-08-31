import { useState } from "react";
import http from "../requester/http";
import validateInputs from "../utils/validateInputs";
import useLogoutOn401Error from "./useLogoutOn401Error";

const useAddQuote = () => {
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const { logoutOn401 } = useLogoutOn401Error();

    const addQuote = async (values) => {
        setError(null);

        try {
            validateInputs(values);
            setLoading(true);
            const newQuote = await http.post(`${import.meta.env.VITE_BASE_URL}/add-quote`, values);
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