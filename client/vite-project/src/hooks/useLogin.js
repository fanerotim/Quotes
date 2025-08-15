import http from '../requester/http';
import { useAuth } from '../contexts/authContext';

const useLogin = () => {

    const { dispatch } = useAuth();

    const login = async (values) => {

        try {
            const token = await http.post(`${import.meta.env.VITE_USER_URL}/login`, values);

            // add token to localStorage / TODO: make this abstract, so it does not have to exist in useRegister too;
            dispatch({
                type: 'LOGIN',
                accessToken: token.auth,
            })

            // return token;
        } catch (err) {
            console.log(err);
        }
    }

    return {
        login
    }
}

export default useLogin;