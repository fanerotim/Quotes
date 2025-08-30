import http from "../requester/http";
import { useAuthContext } from '../hooks/useAuthContext'
import useGetAccessToken from "./useGetAccessToken";
import useLogoutOn401Error from './useLogoutOn401Error';

const useLogout = () => {

    const { dispatch } = useAuthContext();
    const getToken = useGetAccessToken();
    const accessToken = getToken();
    // TODO: FIX THIS, I NEED TO ABSTRACT THIS LOGIC AS I AM FINDING MYSELF HAVING TO ADD THE BELOW FUNCTION IN EVERY COMPONENT THAT MAKES AUTHORIZED REQUESTS
    const { useLogoutOn401 } = useLogoutOn401Error();

    const logout = async () => {

        try {
            const result = await http.post(`${import.meta.env.VITE_USER_URL}/logout`, accessToken)

            dispatch({
                type: 'LOGOUT'
            })
        } catch (err) {
            useLogoutOn401(err);
            console.error(err);
        }
    }

    return {
        logout
    }
}

export default useLogout;