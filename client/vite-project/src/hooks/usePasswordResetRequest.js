import http from '../requester/http';

const usePasswordResetRequest = () => {

    const resetPassword = async (values) => {
        try {   
            const result = await http.post(`${import.meta.env.VITE_USER_URL}/reset-password`, values);
            return result;
        } catch(err) {
            throw err;
        }
    }

    return {
        resetPassword
    }
}

export default usePasswordResetRequest;