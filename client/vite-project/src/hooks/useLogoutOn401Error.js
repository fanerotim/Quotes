import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

const useLogoutOn401Error = () => {

    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const useLogoutOn401 = (err) => {
        if (err.status === 401) {   
            dispatch({
                type: 'LOGOUT'
            })
            navigate('/users/login')
        }
    }

    return {
        useLogoutOn401
    }
}

export default useLogoutOn401Error;