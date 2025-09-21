import './Navigation.scss'
import { NavLink, useLocation } from "react-router-dom";
import Logout from '../logout/logout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useEffect } from 'react';
import { useHistoryContext } from '../../hooks/useHistoryContext';
import BackButton from '../back-button/BackButton';

const Navigation = () => {

    const { auth } = useAuthContext();

    // listen for route changes and dispatch an action to update history context
    const location = useLocation();
    const currentLocation = location.pathname;
    const { dispatch } = useHistoryContext();

    useEffect(() => {
        dispatch({
            type: 'UPDATE-HISTORY',
            payload: currentLocation
        })
    }, [location])

    return (
        <nav>
            {auth && (<span className='greeting'>Hello, {auth.email}</span>)}
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/quotes' end>Quotes</NavLink>
            {auth && (<NavLink to='/quotes/add-quote'>Add quote</NavLink>)}
            {!auth && (<NavLink to='/users/register'>Register</NavLink>)}
            {!auth && (<NavLink to='/users/login'>Login</NavLink>)}
            {auth && <NavLink to='/users/user-profile'>Profile</NavLink>}
            {auth && (<Logout />)}
        </nav>
    )
}

export default Navigation;