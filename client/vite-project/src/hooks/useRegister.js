import validateInputs from "../utils/validateInputs";
import useRegisterRequest from "./useRegisterRequest";
import { useNavigate } from "react-router-dom";

const useRegister = () => {

    const { register } = useRegisterRequest();
    const navigate = useNavigate();

    const submitHandler = async (e, values) => {
        e.preventDefault();

        // additional check to make sure passwords match / this logic no yet added to my validateInputs function
        if (values.password !== values.rePassword) {
            setError('Password mismatch!');
            throw error;
        }

        try {
            validateInputs(values)
            const token = await register(values);
            navigate('/users/login')
            return token;
        } catch (err) {
            throw err;
        }
    }

    return {
        submitHandler
    }
}

export default useRegister