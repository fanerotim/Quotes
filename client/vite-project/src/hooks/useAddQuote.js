import { useState } from "react";
import http from "../requester/http";
import validateInputs from "../utils/validateInputs";

const useAddQuote = () => {
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const addQuote = async (values) => {
        setError(null);

        try {
            validateInputs(values);
            setLoading(true);
            const newQuote = await http.post(`${import.meta.env.VITE_BASE_URL}/add-quote`, values);
            return newQuote;
        } catch (err) {
            setError(err);
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