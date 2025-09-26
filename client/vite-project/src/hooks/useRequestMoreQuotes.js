import http from "../requester/http";

const useRequestMoreQuotes = () => {

    const requestMoreQuotes = async (offset) => {
        try {
            const nextQuotes = await http.post(`${import.meta.env.VITE_BASE_URL}/get-more-quotes`, { offset })
        } catch (err) {

        }
    }
}

export default useRequestMoreQuotes;