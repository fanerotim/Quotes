import { useRef } from 'react';
import { useHistoryContext } from '../../hooks/useHistoryContext';
import './BackButton.scss';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const { location } = useHistoryContext();
    const navigate = useNavigate();

    let locationRef = useRef(1);

    const handleClick = () => {
        // I know I can also use navigate(-1), but wanted to try and build my own BackButton functionality
        // pass isBack in the state, so we can scroll to the item only if we are going back (and not opening quotes as a normal route in the nav)
        navigate(location[locationRef.current], {
            state: {
                isBack: true
            }
        });

        // here i use locationRef.current as index that i mapped to array item, which is the path to which I want to go back
        // i do not want to keep incrementing locationRef.current to increase number of items in location arr as result will be inaccurate
        // then i also increment locationRef.current with 2 instead of 1, as when I go back a page the last route is added at position 1 of location arr, so the last route i want to go to will be 2 indexes down, instead of 1, as it's pushed by the newly added route (last route)
        if (locationRef.current < location.length - 1) {
            locationRef.current += 2;
        }
    }

    return (
        <button onClick={handleClick}>
            Back
        </button>
    )
}

export default BackButton;