import styles from './QuoteDetails.module.scss';
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
        <section className={styles.quote__details__container}>

            <div className={styles.back__button}>
                <BackButton />
            </div>

            <div className={styles.likes__details}>
                <LikeCountIcon likesCount={likesCount} />
            </div>

            <div className={styles.heading__container}>
                <h1>Excerpts...</h1>
            </div>

            <div className={styles.quote__details}>
                <h2 className={styles.quote__details__text}>{quote?.text}</h2>
                <h3 className={styles.quote__details__author}>{quote?.author}</h3>
            </div>

            <div className={styles.action__buttons}>
                {isOwner && <DeleteButton />}
                {isOwner && <EditButton id={quote?.id} />}
                {canLike && <LikeButton updateLikeCount={updateLikeCount} />}
            </div>

            <div className={styles.social__sharing}>
                <SocialSharingButtons />
            </div>
        </section>
    )
}

export default QuoteDetails;