import http from "../requester/http";

const useUpdatePasswordRequest = () => {

    const updatePassword = async (values) => {

        try {
            const updatedPassword = await http.post(`${import.meta.env.VITE_USER_URL}/update-password`, values);
            return updatedPassword;
        } catch (err) {
            throw err;
        }
    }

    return {
        updatePassword
    }
}

export default useUpdatePasswordRequest;