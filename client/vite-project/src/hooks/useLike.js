import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useLikeRequests from "./useLikeRequests";
import useLogoutOn401Error from './useLogoutOn401Error';

const useLike = () => {

    const [hasLiked, setHasLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const { quoteId } = useParams();
    const { addLike, checkIfAlreadyLiked } = useLikeRequests();
    const { logoutOn401 } = useLogoutOn401Error();

    useEffect(() => {
        checkIfAlreadyLiked(quoteId)
            .then(result => {
                // set hasLiked to true if the quote was already liked
                result.length > 0 ? setHasLiked(true) : setHasLiked(false);
            })
            .catch(err => {
                setError(err.message)
            })
    }, [])


    const handleLike = async (e) => {
        e.preventDefault();
        setError(false);

        try {
            // setLoading(true);
            const likeResult = await addLike(quoteId);
            // update hasLiked to true to disable button
            setHasLiked(true);
        } catch (err) {
            console.error(err.message);
            setError(err.message);
            logoutOn401(err);
        } finally {
            // setLoading(false);
        }
    }

    return {
        handleLike,
        hasLiked,
        error,
        loading
    }
}

export default useLike;