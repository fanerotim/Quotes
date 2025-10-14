import { useAuthContext } from './useAuthContext';
import validateInputs from '../utils/validateInputs';
import { useNavigate } from 'react-router-dom';
import useLoginRequest from './useLoginRequest';
import useFormStates from './useFormStates';

const useLogin = () => {
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();
    const { login } = useLoginRequest();
    const { isLoading, error, success, updateState } = useFormStates();

    const submitHandler = async (e, values) => {
        e.preventDefault();
        // set error to null as we'd be making a new api call
        updateState('SET_ERROR');

        try {
            // set loading to true while we wait for response from api
            updateState('SET_LOADING');
            validateInputs(values);
            const token = await login(values);

            // if token then update success to true / isLoading and error are set to false by the reducer
            if (token) {
                updateState('SET_SUCCESS');
            }

            dispatch({
                type: 'LOGIN',
                payload: token,
            })

            navigate('/')

        } catch (err) {
            // if error then set error to true and update error message
            updateState('SET_ERROR', err);
            throw err;
        }
    }

    return {
        submitHandler,
        isLoading,
        error,
        success
    }
}

export default useLogin;