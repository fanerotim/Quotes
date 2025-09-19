import './QuoteCard.scss'

const QuoteCard = ({ quote, clickHandler }) => {

    return (
        <article 
            key={quote.id}>
            <li>{quote.text}</li>
            <h2>{quote.author}</h2>
            <button onClick={() => {
                clickHandler(quote.id);
            }}>
                Show details
            </button>
        </article>
    )
}

export default QuoteCard;