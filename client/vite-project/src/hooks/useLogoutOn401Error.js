import { useAuthContext } from "./useAuthContext";

const useLogoutOn401Error = () => {

    const { dispatch } = useAuthContext();

    const logoutOn401 = (err) => {
        if (err.status === 401) {   
            dispatch({
                type: 'SESSION-EXPIRED'
            });
        }
    }

    return {
        logoutOn401
    }
}

export default useLogoutOn401Error;