import http from "../requester/http";
import { useState } from "react";
import validateInputs from "../utils/validateInputs";

const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const register = async (values) => {
        setError(null);

        // additional check to make sure passwords match / this logic no yet added to my validateInputs function
        if (values.password !== values.rePassword) {
            setError('Password mismatch!');
            throw error;
        }

        try {
            validateInputs(values)
            setIsLoading(true)
            const token = await http.post('http://localhost:3000/user/register', { email: values.email, password: values.password });
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