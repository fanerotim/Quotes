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
            const token = await http.post('http://localhost:3000/user/register', {email, password});

            // add token to localStorage
            localStorage.setItem('accessToken', JSON.stringify(token))
            // redirect to login on success
            navigate('/users/login')
        } catch(err) {
            console.log(err);
        }
    }

    return {
        register
    }
}

export default useRegister