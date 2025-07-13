import http from "../../requester/http";

const useQuotes = () => {

    const getAllQuotes = async () => {

        try {
            const result = await http.get(import.meta.env.VITE_QUOTES_URL);
            return result;
        } catch (err) {
            // TODO: ADD ERROR HANDLING
            console.log(err);
            return(err)
        }
    }

    return {
        getAllQuotes
    }

}

export default useQuotes;