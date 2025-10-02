import './QuoteCard.scss';

const QuoteCard = ({ quote, mapRefs, onCardClick }) => {

    // format quote text to not show in its entirety if it's too long
    const quoteText = quote.text.length > 100 ? quote.text.substring(0, 100) + '...' : quote.text;

    return (
        <article
            ref={(node) => {
                mapRefs.set(quote.id, node)
            }}>
            <li>{quoteText}</li>
            
            <button onClick={() => onCardClick(quote.id)}>
                Show more
            </button>

            <h2>{quote.author}</h2>
        </article>
    )
}

export default QuoteCard;