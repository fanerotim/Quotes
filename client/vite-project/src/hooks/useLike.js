import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useParams } from "react-router-dom";

const useLike = () => {

    //TODO: write functionality that checks if user has already liked a button
    //this has to happen on initial render, so useEffect will be needed
    const [hasLiked, setHasLiked] = useState(false);

    const context = useAuthContext();
    // get user id
    const { id } = context.auth;
    const { quoteId } = useParams();

    const handleLike = (e) => {
        console.log('userId and quoteId:', id, quoteId);
        e.preventDefault();
    }

    return {
        handleLike,
        hasLiked
    }
}

export default useLike;