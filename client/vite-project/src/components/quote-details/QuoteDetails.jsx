import './QuoteDetails.scss';
import { useParams } from "react-router-dom";
import useGetQuote from "../../hooks/useGetQuote";
import { useEffect, useState } from "react";
import EditButton from "../buttons/edit-btn/EditButton";
import DeleteButton from "../buttons/delete-btn/DeleteButton";

const QuoteDetails = () => {

    const { quoteId } = useParams();
    const { getQuote } = useGetQuote();
    const [quote, setQuote] = useState(null)
    
    useEffect(() => {
        getQuote(quoteId)
            .then(data => setQuote(data))
    }, [])
        
    return (
        <section className="quote-details__container">
            <h1>Welcome to quote details page</h1>
            <h2>{quote?.text}</h2>
            <h3>{quote?.author}</h3>
            <DeleteButton quoteId={quote?.id}/>
            <br/>
            <EditButton id={quote?.id}/>
        </section>
    )
}

export default QuoteDetails;