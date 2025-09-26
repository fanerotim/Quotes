import './LoadMoreQuotes.scss'
import useLoadMoreQuotes from '../../hooks/useLoadMoreQuotes';

const LoadMoreQuotes = () => {

    const { clickHandler } = useLoadMoreQuotes();

    return (
        <button
            onClick={clickHandler}
            className='load-more-btn'>
            Load More Quotes
        </button>
    )
}

export default LoadMoreQuotes;