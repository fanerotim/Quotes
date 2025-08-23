import http from "../requester/http";
import { useAuthContext } from '../hooks/useAuthContext'

const useLogout = () => {

    const { dispatch } = useAuthContext();

    const logout = async () => {

        try {
            const result = await http.get(`${import.meta.env.VITE_USER_URL}/logout`)
            
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