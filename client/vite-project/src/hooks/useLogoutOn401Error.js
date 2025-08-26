import { useAuthContext } from "./useAuthContext";

const useLogoutOn401Error = () => {

    const { dispatch } = useAuthContext();

    const useLogoutOn401 = (err) => {
        if (err.status === 401) {   
            dispatch({
                type: 'SESSION-EXPIRED'
            });
        }
    }

    return {
        useLogoutOn401
    }
}

export default useLogoutOn401Error;