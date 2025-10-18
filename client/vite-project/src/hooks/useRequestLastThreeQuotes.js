import http from "../requester/http";

const useRequestLastThreeQuotes = () => {

    const getLastThreeQuotes = async () => {
        try {
            const lastThreeQuotes = await http.get(`${import.meta.env.VITE_BASE_URL}/last-three-quotes`);
            return lastThreeQuotes;
        } catch(err) {
            throw err;
        }
    }

    return {
        getLastThreeQuotes
    }
}

export default useRequestLastThreeQuotes;