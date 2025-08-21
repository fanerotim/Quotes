import { useState } from "react";
import http from "../requester/http";
import { useNavigate } from "react-router-dom";

const useAddQuote = () => {
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const navigate  = useNavigate();

    const addQuote = async (values) => {
        try {
            const newQuote = await http.post(`${import.meta.env.VITE_BASE_URL}/add-quote`, values);
            navigate('/quotes')
            return newQuote;
        } catch (err) {
            // TODO ERROR HANDLING
            console.log(err);
            // return err;
        }
    }

    return {
        addQuote,
        error,
        isLoading
    }
}

export default useAddQuote;