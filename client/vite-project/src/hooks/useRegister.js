import http from "../requester/http";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const useRegister = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

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
            setLoading(true)
            const token = await http.post('http://localhost:3000/user/register', { email, password });
            return token;
        } catch (err) {
            setError(err);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {
        register,
        error,
        loading
    }
}

export default useRegister