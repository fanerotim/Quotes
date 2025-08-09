import http from '../requester/http';

const useLogin = () => {

    const login = async (values) => {
        
        try {
            const token = await http.post(`${import.meta.env.VITE_USER_URL}/login`, values);

            // add token to localStorage
            localStorage.setItem('accessToken', JSON.stringify(token));

            return token;
        } catch(err) {
            console.log(err);
        }
    }

    return {
        login
    }
}

export default useLogin;