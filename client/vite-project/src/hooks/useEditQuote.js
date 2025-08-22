import http from "../requester/http";
import { useState } from "react";

const useEditQuote = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const edit = async (values, quoteId) => {
        setError(null);

        // validate input / it is very ugly, but it works for now. TODO: write a function that will validate input
        if (!values.author || !values.author.trim()
            || !values.text || !values.text.trim()
            || !values.category || !values.category.trim()) {
                setError('All fields must be filled!');
                throw error;
            }

        try {
            setIsLoading(true);
            await http.put(`${import.meta.env.VITE_BASE_URL}/edit-quote/${quoteId}`, values);
        } catch (err) {
            setError(err);
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