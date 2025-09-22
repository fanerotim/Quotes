import { useRef } from "react";

let quoteId = 0;

const useScroll = () => {
    const quoteCardRefs = useRef(null);

    const setQuoteId = (id) => {
        quoteId = id;
    }

    const createMap = () => {

        if (!quoteCardRefs.current) {
            quoteCardRefs.current = new Map();
        }
        return quoteCardRefs.current;
    }

    const scrollToItem = () => {
        quoteCardRefs.current.get(quoteId)?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }

    return {
        createMap,
        scrollToItem,
        setQuoteId
    }
}

export default useScroll;