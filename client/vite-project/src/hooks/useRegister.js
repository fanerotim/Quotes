import validateInputs from "../utils/validateInputs";
import useRegisterRequest from "./useRegisterRequest";
import { useNavigate } from "react-router-dom";
import useFormStates from "./useFormStates";

const useRegister = () => {

    const { register } = useRegisterRequest();
    const navigate = useNavigate();
    const {error, isLoading, success, updateState} = useFormStates();

    const submitHandler = async (e, values) => {
        e.preventDefault();
        // reset error upon next api request
        updateState('SET_ERROR');

        // additional check to make sure passwords match / this logic no yet added to my validateInputs function
        if (values.password !== values.rePassword) {
            setError('Password mismatch!');
            throw error;
        }

        try {
            // set loading to true before making the api request
            updateState('SET_LOADING');
            validateInputs(values)
            const token = await register(values);
            // set success to true and reset error and isLoading states after token is returned
            updateState('SET_SUCCESS');
            navigate('/users/login')
            return token;
        } catch (err) {
            updateState('SET_ERROR', err);
            throw err;
        }
    }

    return {
        submitHandler,
        error,
        isLoading,
        success
    }
}

export default useRegister