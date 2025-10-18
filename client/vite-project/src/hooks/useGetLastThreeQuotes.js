import { useEffect, useState } from "react";
import useRequestLastThreeQuotes from "./useRequestLastThreeQuotes";

const useGetLastThreeQuotes = () => {

    const [lastThreeQuotes, setLastThreeQuotes] = useState([]);
    const { getLastThreeQuotes } = useRequestLastThreeQuotes();

    useEffect(() => {
        getLastThreeQuotes()
            .then(quotes => setLastThreeQuotes(quotes))
            .catch(err => {
                console.log(err);
            })
    }, [])

    return {
        lastThreeQuotes
    }
}

export default useGetLastThreeQuotes;