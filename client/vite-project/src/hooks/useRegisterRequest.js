import http from "../requester/http";

const useRegisterRequest = () => {

    const register = async (values) => {
        try {
            const token = await http.post('http://localhost:3000/user/register', { email: values.email, password: values.password });
            return token;
        } catch(err) {
            throw err;
        }
    }

    return {
        register
    }
}

export default useRegisterRequest;