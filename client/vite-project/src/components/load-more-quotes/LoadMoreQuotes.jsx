// i am not using any custom styles for this button, but keeping the import here in case i need add specific styles later on
import styles from './LoadMoreQuotes.module.scss'
import globalStyles from '../../App.module.scss';
import useLoadMoreQuotes from '../../hooks/useLoadMoreQuotes';
import useHasMoreQuotes from '../../hooks/useHasMoreQuotes';

const LoadMoreQuotes = () => {

    const {
        clickHandler
    } = useLoadMoreQuotes();

    const { getHasMoreStatus } = useHasMoreQuotes();

    return (
        <>
        {getHasMoreStatus() && <button
            onClick={clickHandler}
            className={globalStyles.submit__button}>
            Load More
        </button>}
        </>
    )
}

export default LoadMoreQuotes;