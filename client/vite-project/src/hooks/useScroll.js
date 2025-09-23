import { useRef } from "react";

const useScroll = () => {
    const quoteCardRefs = useRef(null);

    const createMap = () => {

        if (!quoteCardRefs.current) {
            quoteCardRefs.current = new Map();
        }
        return quoteCardRefs.current;
    }

    const scrollToItem = (id) => {
        quoteCardRefs.current.get(id)?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }

    return {
        createMap,
        scrollToItem,
    }
}

export default useScroll;