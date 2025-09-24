import { useState } from "react";

const useUpdatePassword = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const toggleIsOpen = () => {
        setIsOpen((isOpen) => !isOpen)
    }

    // TODO: Send an actual request to the server to update the password
    const handleSubmit = (e, values) => {
        e.preventDefault();
        console.log(values);
        setIsSubmitted((isSubmitted) => !isSubmitted)
        setIsOpen((isOpen) => !isOpen)
        setTimeout(() => {
            setIsSubmitted((isSubmitted) => !isSubmitted)
        }, 3000)
    }

    return {
        handleSubmit,
        toggleIsOpen,
        isOpen,
        isSubmitted
    }
}

export default useUpdatePassword;