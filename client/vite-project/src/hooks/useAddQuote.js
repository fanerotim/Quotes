import http from "../requester/http";
import { useNavigate } from "react-router-dom";

const useAddQuote = () => {

    const navigate  = useNavigate();

    const addQuote = async (values) => {
        try {
            const newQuote = await http.post(`${import.meta.env.VITE_QUOTES_URL}/add-quote`, values);
            navigate('/quotes')
            // return newQuote;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    return {
        addQuote
    }
}

export default useAddQuote;