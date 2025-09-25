import { useState } from "react";
import useUpdatePasswordRequest from "./useUpdatePasswordRequest";
import validateInputs from "../utils/validateInputs";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from 'react-router-dom';

const useUpdatePassword = () => {
    const [isOpen, setIsOpen] = useState(false);

    // refactor using a status that combines the below states
    // possible states: idle, submitted, loading, error
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { updatePassword } = useUpdatePasswordRequest();
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const toggleIsOpen = () => {
        setIsOpen((isOpen) => !isOpen)
    }

    const handleSuccessfulUpdate = () => {
        // show success message if we got to this fn
        setIsSubmitted(true);

        // hide form
        setIsOpen(false);
        
        // set timeout, so user can have some time to read the message and then proceed with logic
        const timeout = setTimeout(() => {
            // logout user as they changed their password
            dispatch({
                type: 'LOGOUT'
            })

            // clear timeout
            clearTimeout(timeout);
            // navigate user to login page again, so they can login
            navigate('/users/login');
        }, 5000)
    }

    const handleSubmit = async (e, values) => {
        e.preventDefault();
        // reset error if there was one in the prev request
        setError(null);

        try {
            // validate inputs - this needs to be written properly
            validateInputs(values);
            // set is loading to true (disable submit button)
            setIsLoading(true);
            // make request to change password
            await updatePassword(values);
            // handle success by calling this function
            handleSuccessfulUpdate();
        } catch (err) {
            setError(err.message);
            throw err.message;
        } finally {
            // in any case - success or error - form no longer loads, so reset status
            setIsLoading(false);
        }
    }

    return {
        handleSubmit,
        toggleIsOpen,
        isOpen,
        isSubmitted,
        error,
        isLoading
    }
}

export default useUpdatePassword;