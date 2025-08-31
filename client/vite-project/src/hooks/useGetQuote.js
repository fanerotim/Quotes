import http from "../requester/http";

const useGetQuote = () => {

    const getQuote = async (quoteId) => {
        try {
            const newQuote = await http.get(`${import.meta.env.VITE_BASE_URL}/${quoteId}`);
            return newQuote[0];
        } catch (err) {
            return err;
        }

    }

    return {
        getQuote
    }
}

export default useGetQuote;