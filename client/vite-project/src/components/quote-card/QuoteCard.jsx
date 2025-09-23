import './QuoteCard.scss';

const QuoteCard = ({ quote, mapRefs, onCardClick }) => {

    return (
        <article
            ref={(node) => {
                mapRefs.set(quote.id, node)
            }}>
            <li>{quote.text}</li>
            <h2>{quote.author}</h2>
            <button onClick={() => onCardClick(quote.id)}>
                Show details
            </button>
        </article>
    )
}

export default QuoteCard;