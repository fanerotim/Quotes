import './Navigation.scss'
import { Link } from "react-router-dom";
import Logout from '../logout/logout';
import { useAuthContext } from '../../hooks/useAuthContext';

const Navigation = () => {

    // TODO: fix this bug - on refresh auth.email is no longer working
    const { auth } = useAuthContext();

    return (
        <nav>
            {auth && (<span className='greeting'>Hello, {auth.email}</span>)}
            <Link to='/'>Home</Link>
            <Link to='/quotes'>Quotes</Link>
            {auth && (<Link to='/quotes/add-quote'>Add quote</Link>)}
            {!auth && (<Link to='/users/register'>Register</Link>)}
            {!auth && (<Link to='/users/login'>Login</Link>)}
            {auth && (<Logout />)}
        </nav>
    )
}

export default Navigation;