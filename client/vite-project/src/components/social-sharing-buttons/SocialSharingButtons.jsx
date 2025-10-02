import { FacebookShareButton, FacebookIcon } from 'react-share';
import { useLocation } from 'react-router-dom';

const SocialSharingButtons = () => {

    const location = useLocation();
    console.log(location);

    return (
        <div className='social__media__buttons'>
                <FacebookShareButton
                    url={`${import.meta.env.VITE_BASE_URL}${location.pathname}`}
                >
                    <FacebookIcon
                        className='fb__button'
                        size={32}
                        round={true}
                    />
                </FacebookShareButton>
        </div>
    )
}

export default SocialSharingButtons;