import { useState } from "react";
import useUpdatePasswordRequest from "./useUpdatePasswordRequest";
import validateInputs from "../utils/validateInputs";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from 'react-router-dom';

const useUpdatePassword = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { updatePassword } = useUpdatePasswordRequest();
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const toggleIsOpen = () => {
        setIsOpen((isOpen) => !isOpen)
    }

    // TODO: implement this in a useEffect, so that we can clear the timeout if the user navigates away from this page (component unmounts, but keeping it like so for now)
    const handleSuccessfulUpdate = () => {

        // hide form
        setIsOpen(false);
        
        // set timeout, so user can have some time to read the message and then proceed with logic
        setTimeout(() => {
            // logout user as they changed their password
            dispatch({
                type: 'LOGOUT'
            })

            // navigate user to login page again, so they can login
            navigate('/users/login');
        }, 5000)
    }

    const handleSubmit = async (e, values) => {
        e.preventDefault();

        try {
            // validate inputs - this needs to be written properly
            validateInputs(values);
            // make request to change password
            await updatePassword(values);
            // handle success by calling this function
            handleSuccessfulUpdate();
        } catch (err) {
            throw err.message;
        }
    }

    return {
        handleSubmit,
        toggleIsOpen,
        isOpen
    }
}

export default useUpdatePassword;