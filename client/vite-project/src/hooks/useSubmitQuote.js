import http from "../requester/http";

const useSubmitQuote = () => {

    const addQuote = async (values) => {
        try {
            const newQuote = await http.post(`${import.meta.env.VITE_BASE_URL}/add-quote`, values);
            return newQuote;
        } catch (err) {
            throw err;
        }
    }

    return { 
        addQuote 
    };
}

export default useSubmitQuote;