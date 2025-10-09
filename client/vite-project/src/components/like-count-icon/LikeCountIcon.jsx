import styles from './LikeCountIcon.module.scss'
import { CiHeart } from 'react-icons/ci';

const LikeCountIcon = ({ likesCount }) => {

    return (
        <div className='icon-wrapper'>
            <CiHeart 
                className={styles.likes__icon}   
            />
            <div className={styles.likes__count}>{likesCount}</div>
        </div>
    )
}

export default LikeCountIcon;