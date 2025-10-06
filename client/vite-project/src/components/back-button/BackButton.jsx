import './BackButton.scss';
import useBackButton from '../../hooks/useBackButton';


const BackButton = () => {
    
    const {handleClick} = useBackButton();

    return (
        <button onClick={handleClick}>
            Back
        </button>
    )
}

export default BackButton;