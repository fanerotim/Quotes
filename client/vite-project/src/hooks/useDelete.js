import { useNavigate } from "react-router-dom";
import http from "../requester/http";
import useLogoutOn401Error from "./useLogoutOn401Error";

const useDelete = () => {

    const navigate = useNavigate();
    const { logoutOn401 } = useLogoutOn401Error();

    const deleteOne = async (url, values) => {
  
        try {
            await http.deleteOne(`${import.meta.env.VITE_BASE_URL}/${url}`, values)
            navigate('/quotes')
            // There is no returned item, as I simply return success msg;
            // TODO: think if you want to return a success msg instead of redirecting
        } catch (err) {
            logoutOn401(err);
            throw err;
        }
    }

    return {
        deleteOne
    }
}

export default useDelete;