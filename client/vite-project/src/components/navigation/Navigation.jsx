import './Navigation.scss'
import { NavLink } from "react-router-dom";
import Logout from '../logout/logout';
import { useAuthContext } from '../../hooks/useAuthContext';

const Navigation = () => {

    // TODO: fix this bug - on refresh auth.email is no longer working
    const { auth } = useAuthContext();

    return (
        <nav>
            {auth && (<span className='greeting'>Hello, {auth.email}</span>)}
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/quotes'>Quotes</NavLink>
            {auth && (<NavLink to='/quotes/add-quote'>Add quote</NavLink>)}
            {!auth && (<NavLink to='/users/register'>Register</NavLink>)}
            {!auth && (<NavLink to='/users/login'>Login</NavLink>)}
            {auth && (<Logout />)}
        </nav>
    )
}

export default Navigation;