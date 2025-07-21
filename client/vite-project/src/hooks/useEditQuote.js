import { useNavigate } from "react-router-dom";
import http from "../requester/http";

const useEditQuote = () => {
    
    const navigate = useNavigate();

    const edit = async (values, quoteId) => {
        // TODO: ADD ERROR HANDLING
        try {
            const updatedQuote = await http.put(`${import.meta.env.VITE_BASE_URL}/edit-quote/${quoteId}`, values);
            navigate(`/quotes/${quoteId}`)
        } catch(err) {
            console.log(err);
            return err;
        }
    }

    return {
        edit
    }
}

export default useEditQuote;