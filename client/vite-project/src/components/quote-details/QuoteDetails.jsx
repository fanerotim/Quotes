import './QuoteDetails.scss';
import { useParams } from "react-router-dom";
import useGetQuote from "../../hooks/useGetQuote";
import { useEffect, useState } from "react";
import EditButton from "../buttons/edit-btn/EditButton";
import DeleteButton from "../buttons/delete-btn/DeleteButton";
import { useAuthContext } from '../../hooks/useAuthContext';

const QuoteDetails = () => {

    const { quoteId } = useParams();
    const { getQuote } = useGetQuote();
    const [quote, setQuote] = useState(null)

    // for dev purposes, for now I am only checking if the user is logged in, but eventually i would like to check if user is owner of the quote. other users cannot edit / delete
    const { auth } = useAuthContext();

    useEffect(() => {
        getQuote(quoteId)
            .then(data => setQuote(data))
            .catch(err => console.error(err));
    }, [])

    return (
        <section className="quote-details__container">
            <h1>Welcome to quote details page</h1>
            <h2>{quote?.text}</h2>
            <h3>{quote?.author}</h3>
            {auth && <DeleteButton quoteId={quote?.id} />}
            <br />
            {auth && <EditButton id={quote?.id} />}
        </section>
    )
}

export default QuoteDetails;