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
        updateState('SET_ERROR');

        try {
            updateState('SET_LOADING');

            validateInputs(values);
            const token = await login(values);

            dispatch({
                type: 'LOGIN',
                payload: token,
            })

            navigate('/')

        } catch (err) {
            updateState('SET_ERROR', err);
            throw err;
        } finally {
            updateState('SET_LOADING');
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