import styles from './SocialSharingButtons.module.scss';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const SocialSharingButtons = () => {

    const location = useLocation();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={styles.social__media__buttons}>
            <FacebookShareButton
                url={`${import.meta.env.VITE_FRONTEND_PROD_BASE_URL}${location.pathname}`}
                resetButtonStyle={true}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <FacebookIcon
                    size={32}
                    round={true}
                    iconFillColor={isHovered ? 'rgb(26, 26, 26)' : 'white'}
                />
            </FacebookShareButton>
            <p className={styles.social__media__text}>Share it with friends</p>
        </div>
    )
}

export default SocialSharingButtons;