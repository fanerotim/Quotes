import http from "../requester/http";
import { useState } from "react";
import useLogoutOn401Error from "./useLogoutOn401Error";

const useEditQuote = () => {
    const [error, setError] = useState({message: null});
    const [isLoading, setIsLoading] = useState(false);
    const { useLogoutOn401 } = useLogoutOn401Error();

    const edit = async (values, quoteId) => {
        setError(null);

        // validate input / it is very ugly, but it works for now. 
        // TODO: write a function that will validate input - receied inputs in an Array, loops through them and returns true / false
        if (!values.author || !values.author.trim()
            || !values.text || !values.text.trim()
            || !values.category || !values.category.trim()) {
            setError({message: 'All fields must be filled!'});
            throw error;
        }

        try {
            setIsLoading(true);
            await http.put(`${import.meta.env.VITE_BASE_URL}/edit-quote/${quoteId}`, values);
        } catch (err) {
            useLogoutOn401(err);
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