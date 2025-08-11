import './Navigation.scss'
import { Link } from "react-router-dom";
import Logout from '../logout/logout';

const Navigation = () => {

    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/quotes'>Quotes</Link>
            <Link to='/quotes/add-quote'>Add quote</Link>
            <Link to='/users/register'>Register</Link>
            <Link to='/users/login'>Login</Link>
            <Logout/>
        </nav>
    )
}

export default Navigation;