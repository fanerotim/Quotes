import styles from './LoadMoreQuotes.module.scss'
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
            className={styles.load__more__btn}>
            Load More
        </button>}
        </>
    )
}

export default LoadMoreQuotes;