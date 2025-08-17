import http from '../requester/http';
import { useAuthContext } from './useAuthContext';

const useLogin = () => {

    const { dispatch } = useAuthContext();

    const login = async (values) => {

        try {
            const token = await http.post(`${import.meta.env.VITE_USER_URL}/login`, values);
            
            dispatch({
                type: 'LOGIN',
                payload: token,
            })

        } catch (err) {
            console.log(err);
        }
    }

    return {
        login
    }
}

export default useLogin;