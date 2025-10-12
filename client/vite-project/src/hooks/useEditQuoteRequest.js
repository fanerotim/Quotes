import http from "../requester/http";

const useEditQuoteRequest = () => {
    
    const edit = async (values, quoteId) => {
        
        try {
            const updatedQuote = await http.put(`${import.meta.env.VITE_BASE_URL}/edit-quote/${quoteId}`, values);
            return updatedQuote;
        } catch (err) {
            throw err;
        }
    }

    return {
        edit,
    }
}

export default useEditQuoteRequest;