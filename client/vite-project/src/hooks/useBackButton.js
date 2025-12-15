import { useHistoryContext } from "./useHistoryContext";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const useBackButton = () => {
    const { routes } = useHistoryContext();
    const navigate = useNavigate();

    const location = useLocation();
    const currentLocation = location.pathname;
    //find the index of the current location in the routes []
    //should be ok if i just specify the last index of the arr as I am now removing the last item inside routes[] when user goes back. will refactor at later point
    const currentRouteIndex = routes.indexOf(currentLocation);
    const prevRouteIndex = currentRouteIndex - 1;

    const handleClick = () => {
        navigate(routes[prevRouteIndex], {
            state: {
                isBack: true
            }
        });
    }

    return {
        handleClick
    }
}

export default useBackButton