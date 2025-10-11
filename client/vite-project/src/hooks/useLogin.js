import { useAuthContext } from './useAuthContext';
import validateInputs from '../utils/validateInputs';
import { useNavigate } from 'react-router-dom';
import useLoginRequest from './useLoginRequest';

const useLogin = () => {
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();
    const { login } = useLoginRequest();

    const submitHandler = async (e, values) => {
        e.preventDefault();

        try {
            validateInputs(values);
            const token = await login(values);

            dispatch({
                type: 'LOGIN',
                payload: token,
            })

            navigate('/')
        } catch (err) {
            throw err;
        }
    }

    return {
        submitHandler
    }
}

export default useLogin;