import './Navigation.scss'
import { Link } from "react-router-dom";

const Navigation = () => {

    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/quotes'>Quotes</Link>
            <Link to='/quotes/add-quote'>Add quote</Link>
            <Link to='/users/register'>Register</Link>
            <Link to='/users/login'>Login</Link>
        </nav>
    )
}

export default Navigation;