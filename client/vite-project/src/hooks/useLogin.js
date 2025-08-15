import http from '../requester/http';
import { useAuth } from '../contexts/authContext';

const useLogin = () => {

    const {dispatch} = useAuth();

    const login = async (values) => {
        
        try {
            const token = await http.post(`${import.meta.env.VITE_USER_URL}/login`, values);

            // add token to localStorage / TODO: make this abstract, so it does not have to exist in useRegister too;
            // localStorage.setItem('accessToken', JSON.stringify(token));
            // server expects token to be added in this format to the localStorage: {"auth":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlAYWJ2LmJnIiwiaWF0IjoxNzU1Mjg0MzAzLCJleHAiOjE3NTUyOTg3MDN9.1Axi99lTVM19_H_E8eJSy-uyqifBE3HWxR_JIBxh0WU"}    
        
            dispatch({
                type: 'LOGIN',
                accessToken: token,
            })

            // return token;
        } catch(err) {
            console.log(err);
        }
    }

    return {
        login
    }
}

export default useLogin;