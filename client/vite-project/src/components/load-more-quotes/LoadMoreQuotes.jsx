import './LoadMoreQuotes.scss'
import useLoadMoreQuotes from '../../hooks/useLoadMoreQuotes';
import useHasMoreQuotes from '../../hooks/useHasMoreQuotes';

const LoadMoreQuotes = () => {

    const {
        clickHandler
    } = useLoadMoreQuotes();

    const { getHasMoreStatus } = useHasMoreQuotes();

    return (
        <button
            onClick={clickHandler}
            disabled={!getHasMoreStatus()}
            className='load-more-btn'>
            Load More Quotes
        </button>
    )
}

export default LoadMoreQuotes;