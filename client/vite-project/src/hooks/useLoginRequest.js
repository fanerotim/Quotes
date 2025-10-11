import http from "../requester/http";

const useLoginRequest = () => {

    const login = async (values) => {

        try {
            const token = await http.post(`${import.meta.env.VITE_USER_URL}/login`, values);
            return token;
        } catch (err) {
            throw err;
        }
    }

    return {
        login
    }
}

export default useLoginRequest;