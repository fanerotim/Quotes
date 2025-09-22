import './QuoteCard.scss';
import { useNavigate } from 'react-router-dom';
import useScroll from '../../hooks/useScroll';

const QuoteCard = ({ quote, mapRefs }) => {

    const navigate = useNavigate();
    const { setQuoteId } = useScroll();

    const clickHandler = (id) => {
        setQuoteId(id);
        navigate({
            pathname: `/quotes/${id}}`
        })
    }

    return (
        <article
            ref={(node) => {
                mapRefs.set(quote.id, node)
            }}>
            <li>{quote.text}</li>
            <h2>{quote.author}</h2>
            <button onClick={() => clickHandler(quote.id)}>
                Show details
            </button>
        </article>
    )
}

export default QuoteCard;