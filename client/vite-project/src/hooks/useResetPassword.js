import { useState } from "react";
import usePasswordResetRequest from "./usePasswordResetRequest";
import { useNavigate } from 'react-router-dom';
import validateInputs from '../utils/validateInputs';

const useResetPassword = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { resetPassword } = usePasswordResetRequest();
    const navigate = useNavigate();

    const handleSuccessfulReset = () => {
        // update isSubmitted state to trigger form state change
        setIsSubmitted(true);

        // set timeout to give user time to read success message
        setTimeout(() => {

            // redirect user to /login page, so they can log in again
            navigate('/users/login')

        }, 5000)
    }

    const handleSubmit = async (e, values) => {
        e.preventDefault();
        setError(null);

        try {
            validateInputs(values)
            setIsLoading(true);
            const result = await resetPassword(values);
            handleSuccessfulReset();
        } catch (err) {
            setError(err.message)
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    return {
        handleSubmit,
        isSubmitted,
        isLoading,
        error
    }
}

export default useResetPassword;