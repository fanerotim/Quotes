import useRequestMoreQuotes from "./useRequestMoreQuotes";
import useRequestMoreQuotes from "./useRequestMoreQuotes";

const useLoadMoreQuotes = () => {

    const { requestMoreQuotes } = useRequestMoreQuotes();

    const clickHandler = async () => {
        try {
            const nextQuotes = await requestMoreQuotes()
        } catch(err) {
            throw err.message
        }
    }

    return {
        clickHandler
    }
}

export default useLoadMoreQuotes;