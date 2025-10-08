import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetQuote from "./useGetQuote";
import { useAuthContext } from "./useAuthContext";
import useLikeRequests from "./useLikeRequests";

const useQuoteDetails = () => {
    const { quoteId } = useParams();
    const { getQuote } = useGetQuote();
    const [quote, setQuote] = useState(null);

    const { auth } = useAuthContext();
    const isOwner = auth && quote && auth.id === quote.ownerId ? true : false;
    const canLike = auth && !isOwner;

    const { getLikesCount } = useLikeRequests();
    const [likesCount, setLikesCount] = useState(0);

    const updateLikeCount = () => {
        setLikesCount((prev) => prev + 1);
    }

    useEffect(() => {
        // make sure page is scrolled to top when it loads
        window.scrollTo(0, 0)

        getQuote(quoteId)
            .then(data => setQuote(data))
            .catch(err => console.error(err));

        getLikesCount(quoteId)
            .then(data => setLikesCount(data.length))
            .catch(err => console.error(err));
    }, [])

    return {
        quote,
        likesCount,
        isOwner,
        canLike,
        updateLikeCount
    }
}

export default useQuoteDetails;