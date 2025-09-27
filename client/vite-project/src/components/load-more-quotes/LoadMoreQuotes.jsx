import './LoadMoreQuotes.scss'
import useLoadMoreQuotes from '../../hooks/useLoadMoreQuotes';

const LoadMoreQuotes = () => {

    const {
        hasMore,
        clickHandler
    } = useLoadMoreQuotes();

    return (
        <button
            onClick={clickHandler}
            disabled={!hasMore}
            className='load-more-btn'>
            Load More Quotes
        </button>
    )
}

export default LoadMoreQuotes;