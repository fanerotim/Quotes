import { useState } from 'react';
import http from '../requester/http';
import { useAuthContext } from './useAuthContext';

const useLogin = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (values) => {
        setError(null);
        
        if (values.email === '' || values.password === '') {
            setError('No login details provided.');
            throw error;
        }

        try {
            setLoading(true);
            const token = await http.post(`${import.meta.env.VITE_USER_URL}/login`, values);

            dispatch({
                type: 'LOGIN',
                payload: token,
            })

            return token;

        } catch (err) {
            setError(err);
            throw error;
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