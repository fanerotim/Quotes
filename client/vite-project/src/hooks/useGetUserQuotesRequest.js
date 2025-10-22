import http from "../requester/http";
import useLogoutOn401Error from './useLogoutOn401Error';

const useGetUserQuotesRequest = () => {

    const { logoutOn401 } = useLogoutOn401Error();

    const getUserQuotes = async () => {
        try {
            const userQuotes = await http.post(`${import.meta.env.VITE_BASE_URL}/user-quotes`);
            return userQuotes;
        } catch (err) {
            logoutOn401(err);
            console.error(err);
        }
    }

    return {
        getUserQuotes
    }
}

export default useGetUserQuotesRequest;