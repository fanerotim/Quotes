import { useState } from 'react';
import http from '../requester/http';
import { useAuthContext } from './useAuthContext';

const useLogin = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (values) => {
        setError(null);
        setLoading(true);

        try {
            const token = await http.post(`${import.meta.env.VITE_USER_URL}/login`, values);

            dispatch({
                type: 'LOGIN',
                payload: token,
            })

            return token;

        } catch (err) {
            setLoading(false);
            setError(err);
            throw new Error(err);
        } finally {
            setLoading(false);
        }
    }

    return {
        login,
        error,
        loading
    }
}

export default useLogin;