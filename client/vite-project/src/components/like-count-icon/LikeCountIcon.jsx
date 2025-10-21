import styles from './LikeCountIcon.module.scss'
import { CiHeart } from 'react-icons/ci';

const LikeCountIcon = ({ likesCount }) => {

    return (
        <div 
            className={styles.likes__count__container}
        >
            <CiHeart
                className={styles.likes__icon}
            />
            
            <span 
                className={styles.likes__count__number}
            >
                {likesCount}
            </span>

        </div>
    )
}

export default LikeCountIcon;