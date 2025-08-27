import { useState } from 'react';
import http from '../requester/http';
import { useAuthContext } from './useAuthContext';
import validateInputs from '../utils/validateInputs';

const useLogin = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (values) => {
        setError(null);
        
        try {
            validateInputs(values);
            setIsLoading(true);
            const token = await http.post(`${import.meta.env.VITE_USER_URL}/login`, values);

            dispatch({
                type: 'LOGIN',
                payload: token,
            })

            return token;

        } catch (err) {
            setError(err.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    return {
        login,
        error,
        isLoading
    }
}

export default useLogin;