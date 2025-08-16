import './Navigation.scss'
import { Link } from "react-router-dom";
import Logout from '../logout/logout';
import { useAuth } from '../../contexts/authContext';

const Navigation = () => {

    const { auth } = useAuth();

    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/quotes'>Quotes</Link>
            {auth?.auth ? <Link to='/quotes/add-quote'>Add quote</Link> : ''}
            {!auth?.auth ? <Link to='/users/register'>Register</Link> : ''}
            {!auth?.auth ? <Link to='/users/login'>Login</Link> : ''}
            {auth?.auth ? <Logout /> : ''}
        </nav>
    )
}

export default Navigation;