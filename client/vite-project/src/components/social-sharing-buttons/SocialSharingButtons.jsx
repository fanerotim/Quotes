import { FacebookShareButton, FacebookIcon } from 'react-share';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const SocialSharingButtons = () => {

    const location = useLocation();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className='social__media__buttons'>
            <FacebookShareButton
                url={`${import.meta.env.VITE_BASE_URL}${location.pathname}`}
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
        </div>
    )
}

export default SocialSharingButtons;