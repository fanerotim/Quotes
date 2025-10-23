import { useState } from "react";
import useUpdatePasswordRequest from "./useUpdatePasswordRequest";
import validateInputs from "../utils/validateInputs";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from 'react-router-dom';
import useFormStates from "./useFormStates";
import useSuccessModal from "./useSuccessModal";

const useUpdatePassword = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { updatePassword } = useUpdatePasswordRequest();
    // these are the current form states that I am using - have not implemented error logic for this form yet, but keeping the state for now as it will be implemented
    const { isLoading, error, success, updateState } = useFormStates();
    // delayMs is used to control the timeout delay before redirecting the user
    const { delayMs } = useSuccessModal();
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const toggleIsOpen = () => {
        setIsOpen((isOpen) => !isOpen)
    }

    // TODO: implement this in a useEffect, so that we can clear the timeout if the user navigates away from this page (component unmounts, but keeping it like so for now)
    const handleSuccessfulUpdate = () => {

        // Set timeout, so we can show the success modal to the user
        // TODO: export this logic into a custom hook as it's used across multiple components
        setTimeout(() => {
            // dispatch a LOGOUT action, so we can reset / clear auth data we keep in localStorage, which logs them out
            dispatch({
                type: 'LOGOUT'
            })

            // navigate user to login page again, so they can login
            navigate('/users/login');
        }, delayMs)
    }

    const handleSubmit = async (e, values) => {
        e.preventDefault();

        try {
            // update isLoading to true, so we can show a loder to the user
            updateState('SET_LOADING')
            // validate inputs - this needs to be written properly
            validateInputs(values);
            // make request to change password
            await updatePassword(values);
            // set success to true, so user can see success modal
            updateState('SET_SUCCESS')
            // handle success by calling this function
            handleSuccessfulUpdate();
        } catch (err) {
            throw err.message;
        }
    }

    return {
        handleSubmit,
        toggleIsOpen,
        isOpen,
        isLoading,
        success
    }
}

export default useUpdatePassword;