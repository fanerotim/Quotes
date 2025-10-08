import styles from './BackButton.module.scss';
import useBackButton from '../../hooks/useBackButton';
import {IoIosArrowRoundBack} from 'react-icons/io';

const BackButton = () => {
    
    const {handleClick} = useBackButton();

    return (
        <button 
            className={styles.back__btn}
            onClick={handleClick}>
            <IoIosArrowRoundBack
                className={styles.back__btn__icon}/>
            {/* Back */}
        </button>
    )
}

export default BackButton;