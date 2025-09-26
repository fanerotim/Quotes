import http from "../requester/http";

const useRequestMoreQuotes = () => {

    const requestQuotes = async (offset, limit) => {
        try {
            const quotes = await http.post(`${import.meta.env.VITE_BASE_URL}/get-quotes`, { offset, limit });
            return quotes;
        } catch (err) {
            console.error(err.message);
            throw err.message;
        }
    }

    return {
        requestQuotes
    }
}

export default useRequestMoreQuotes;