import http from "../requester/http";

const useDeleteRequest = () => {

    const deleteOne = async (url, values) => {

        try {
            const result = await http.deleteOne(`${import.meta.env.VITE_BASE_URL}/${url}`, values);
            return result;
        } catch (err) {
            throw err;
        }
    }

    return {
        deleteOne
    }
}

export default useDeleteRequest;