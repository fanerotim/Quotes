import './LikeButton.scss';
import useLike from '../../hooks/useLike';

const LikeButton = () => {

    const { handleLike, hasLiked } = useLike();

    return (
        <button
            onClick={(e) => handleLike(e)}
            // if user already liked the quote disable button
            disabled={hasLiked}
        >
            Like
        </button>
    )
}

export default LikeButton;