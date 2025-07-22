import { useNavigate } from "react-router-dom";
import http from "../requester/http";

const useDelete = () => {

    const navigate = useNavigate();

    const deleteOne = async (url, values) => {

        try {
            await http.deleteOne(`${import.meta.env.VITE_BASE_URL}/${url}`, values)
            navigate('/quotes')
            // There is no item to return as I return success msg;
            // TODO: think if you want to return a success msg instead of redirecting
            // return deletedItem;
        } catch(err) {
            return err;
        }
    }
    
    return {
        deleteOne
    }
}

export default useDelete;