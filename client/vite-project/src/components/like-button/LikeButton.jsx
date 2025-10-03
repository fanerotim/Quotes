import './LikeButton.scss';
import useLike from '../../hooks/useLike';

const LikeButton = ({updateLikeCount}) => {

    const { handleLike, hasLiked } = useLike();

    return (
        <div>
            <button
                onClick={(e) => {
                    updateLikeCount();
                    handleLike(e);
                }}
                disabled={hasLiked}
            >
                Like
            </button>
        </div>
    )
}

export default LikeButton;