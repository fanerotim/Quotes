import http from '../requester/http';

const useLikeRequests = () => {

    const addLike = async (quoteId) => {
        try {
            const likeResult = await http.post(`${import.meta.env.VITE_BASE_URL}/add-like`, { quoteId });
            return likeResult;
        } catch (err) {
            throw err;
        }
    }

    const checkIfAlreadyLiked = async (quoteId) => {

        try {
            const result = await http.post(`${import.meta.env.VITE_BASE_URL}/has-liked-quote`, { quoteId });
            return result;
        } catch (err) {
            throw err;
        }
    }

    const getLikesCount = async (quoteId) => {
        
        try {
            const likesCount = await http.post(`${import.meta.env.VITE_BASE_URL}/get-likes-count`, { quoteId });
            return likesCount;
        } catch (err) {
            throw err;
        }
    }

    return {
        addLike,
        checkIfAlreadyLiked,
        getLikesCount
    }
}

export default useLikeRequests;