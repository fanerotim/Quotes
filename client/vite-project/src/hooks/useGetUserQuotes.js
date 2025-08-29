import http from "../requester/http";
import useGetAccessToken from "./useGetAccessToken";

const useGetUserQuotes = () => {

    const getToken = useGetAccessToken();
    const userId = getToken().id;
   
    const getUserQuotes = async () => {

        try {
            const userQuotes = await http.post(`${import.meta.env.VITE_BASE_URL}/user-quotes`, { userId });
            return userQuotes;
        } catch (err) {
            console.error(err);
        }
    }

    return {
        getUserQuotes
    }
}

export default useGetUserQuotes;