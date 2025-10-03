import './LikeCountIcon.scss'
import { CiHeart } from 'react-icons/ci';

const LikeCountIcon = ({ likesCount }) => {

    return (
        <div className='icon-wrapper'>
            <CiHeart 
                className='icon'    
            />
            <div>{likesCount}</div>
        </div>
    )
}

export default LikeCountIcon;