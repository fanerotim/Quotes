import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useLikeRequests from "./useLikeRequests";
import useLogoutOn401Error from './useLogoutOn401Error';

const useLike = () => {

    const [hasLiked, setHasLiked] = useState(false);
    const { quoteId } = useParams();
   
    const {
        addLike,
        checkIfAlreadyLiked
    } = useLikeRequests();

    const { logoutOn401 } = useLogoutOn401Error();

    useEffect(() => {
        checkIfAlreadyLiked(quoteId)
            .then(result => {
                // set hasLiked to true if the quote was already liked to disable 'Like' button
                result.length > 0 ? setHasLiked(true) : setHasLiked(false);
            })
            .catch(err => {
                console.error(err)
            })
    }, [])


    const handleLike = async (e) => {
        e.preventDefault();

        try {
            const likeResult = await addLike(quoteId);
            // update hasLiked to true to disable 'Like' button
            setHasLiked(true);
        } catch (err) {
            console.error(err.message);
            logoutOn401(err);
        }
    }

    return {
        handleLike,
        hasLiked
    }
}

export default useLike;