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

    // TODO: reset password flow is not the best. anyone can reset a user's email as long as they know their email address. 
    // implement a better flow - either ask for security question or send the user a link that will allow them to change their password
    // currently security is poor in this regard
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