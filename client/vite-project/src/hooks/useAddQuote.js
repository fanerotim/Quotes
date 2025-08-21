import { useState } from "react";
import http from "../requester/http";

const useAddQuote = () => {
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const addQuote = async (values) => {
        setError(null);

        if (values.author === '' || values.text === '' || values.category === '') {
            setError('All fields need to be filled in order to add a quote');
            throw error;
        }

        try {
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