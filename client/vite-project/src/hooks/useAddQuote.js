import { useState } from "react";
import http from "../requester/http";
import validateInputs from "../utils/validateInputs";
import useLogoutOn401Error from "./useLogoutOn401Error";

const useAddQuote = () => {
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const {useLogoutOn401} = useLogoutOn401Error();

    const addQuote = async (values) => {
        setError(null);

        try {
            validateInputs(values);
            setLoading(true);
            const newQuote = await http.post(`${import.meta.env.VITE_BASE_URL}/add-quote`, values);
            return newQuote;
        } catch (err) {   
            // check if error is 401 to logout the user
            useLogoutOn401(err);
            // standardaze error handling // with this set up err.message the validator errors do not show, if i set it to err, then the front-end breaks as error comes as obj
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