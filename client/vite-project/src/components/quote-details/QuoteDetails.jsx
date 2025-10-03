import './QuoteDetails.scss';
import EditButton from "../buttons/edit-btn/EditButton";
import DeleteButton from "../buttons/delete-btn/DeleteButton";
import BackButton from '../back-button/BackButton';
import SocialSharingButtons from '../social-sharing-buttons/SocialSharingButtons';
import LikeButton from '../like-button/LikeButton';
import LikeCountIcon from '../like-count-icon/LikeCountIcon';
import useQuoteDetails from '../../hooks/useQuoteDetails';

const QuoteDetails = () => {
    
    const {
        quote,
        likesCount,
        isOwner,
        canLike,
        updateLikeCount
    } = useQuoteDetails();

    return (
        <section className="quote-details__container">
            <BackButton />
            <h1>Welcome to quote details page</h1>
            <h2>{quote?.text}</h2>
            <h3>{quote?.author}</h3>
            <LikeCountIcon likesCount={likesCount}/>
            {isOwner && <DeleteButton />}
            <br />
            {isOwner && <EditButton id={quote?.id} />}
            {canLike && <LikeButton updateLikeCount={updateLikeCount}/>}
            <SocialSharingButtons />
        </section>
    )
}

export default QuoteDetails;