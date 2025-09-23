import http from "../requester/http";
import { useAuthContext } from "./useAuthContext";

const useQuotes = () => {

    const { dispatch } = useAuthContext();

    const getAllQuotes = async () => {

        try {
            const result = await http.get(import.meta.env.VITE_BASE_URL);
            return result;
        } catch (err) {
            // TODO: ADD ERROR HANDLING
            dispatch({
                type: 'LOGOUT'
            })
            // return(err)
        }
    }

    return {
        getAllQuotes
    }

}

export default useQuotes;