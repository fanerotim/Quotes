import http from "../requester/http";
import { useState } from "react";

const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const register = async ({ email, password, rePassword }) => {
        setError(null);
        

        if (email === '' || password === '' || rePassword === '') {
            setError('Cannot register without filling in the form.');
            throw error;
        }

        if (password !== rePassword) {
            setError('Password mismatch!');
            throw error;
        }

        try {
            setIsLoading(true)
            const token = await http.post('http://localhost:3000/user/register', { email, password });
            return token;
        } catch (err) {
            setError(err);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    return {
        register,
        error,
        isLoading
    }
}

export default useRegister