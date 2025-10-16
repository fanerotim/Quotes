import { useAuthContext } from './useAuthContext';
import validateInputs from '../utils/validateInputs';
import { useNavigate } from 'react-router-dom';
import useLoginRequest from './useLoginRequest';
import useFormStates from './useFormStates';
import useSuccessModal from './useSuccessModal';

const useLogin = () => {
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();
    const { login } = useLoginRequest();
    const { isLoading, error, success, updateState } = useFormStates();
    const { delayMs } = useSuccessModal();


    const submitHandler = async (e, values) => {
        e.preventDefault();
        // set error to null as we'd be making a new api call
        updateState('SET_ERROR');

        try {
            // set loading to true while we wait for response from api
            updateState('SET_LOADING');
            validateInputs(values);
            const token = await login(values);

            //if we get a token, show success modal
            updateState('SET_SUCCESS');

            // setting timeout for now here, as i want to show a success dialog that runs for x seconds and then redirects user
            setTimeout(() => {
                    dispatch({
                        type: 'LOGIN',
                        payload: token,
                    })
            
                    navigate('/')
            }, delayMs)
            
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