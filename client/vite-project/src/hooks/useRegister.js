import http from "../requester/http";
import { useNavigate } from "react-router-dom";

const useRegister = () => {

    const navigate = useNavigate();

    const register = async ({ email, password, rePassword }) => {

        // TODO: ADD ERROR HANDLING
        if (email === '' || password === '' || rePassword === '') {
            console.log('CANNOT REGISTER WITH EMPTY FILEDS')
        }

        if (password !== rePassword) {
            console.log('Password mismatch');
            // TODO: implement logic for this case / for now just returning to avoid unnecessary request
            return;
        }

        try {
            const newUser = await http.post('http://localhost:3000/user/register', {email, password, rePassword});
            // redirect to login on success
            navigate('/login')
        } catch(err) {
            console.log(err);
        }
    }

    return {
        register
    }
}

export default useRegister