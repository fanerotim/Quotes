import http from "../requester/http";
import { useAuthContext } from '../hooks/useAuthContext'
import useGetAccessToken from "./useGetAccessToken";

const useLogout = () => {

    const { dispatch } = useAuthContext();
    const getToken = useGetAccessToken();
    const accessToken = getToken();

    const logout = async () => {

        try {
            const result = await http.post(`${import.meta.env.VITE_USER_URL}/logout`, accessToken)

            dispatch({
                type: 'LOGOUT'
            })
        } catch (err) {
            console.error(err);
        }
    }

    return {
        logout
    }
}

export default useLogout;