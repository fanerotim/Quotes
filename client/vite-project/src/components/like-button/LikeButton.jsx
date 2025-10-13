import styles from './LikeButton.module.scss';
import useLike from '../../hooks/useLike';
import { AiOutlineLike } from "react-icons/ai";

const LikeButton = ({ updateLikeCount }) => {

    const { handleLike, hasLiked } = useLike();

    return (
        <div
            className={styles.like__button__container}
        >
            <button
                onClick={(e) => {
                    updateLikeCount();
                    handleLike(e);
                }}
                className={styles.like__button}
                disabled={hasLiked}
            >
                <AiOutlineLike />

            </button>


            <p
                className={styles.user__has__liked__message}
            >
                {hasLiked
                    ? 'You have already liked this quote'
                    : 'Give a like'}
            </p>

        </div>
    )
}

export default LikeButton;