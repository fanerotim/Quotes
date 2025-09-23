import './Navigation.scss'
import { NavLink, useLocation } from "react-router-dom";
import Logout from '../logout/logout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useEffect } from 'react';
import { useHistoryContext } from '../../hooks/useHistoryContext';

const Navigation = () => {

    const { auth } = useAuthContext();

    // listen for route changes and dispatch an action to update history context
    const location = useLocation();
    const currentLocation = location.pathname;
    // check if isBack flag is provided as we dispatch different action if that's the case
    const isBack = location.state?.isBack;
    const { dispatch } = useHistoryContext();

    useEffect(() => {

        // if back is present, when I will be removing the last item in the arr of routes
        if (isBack) {
            dispatch({
                type: 'REMOVE-ROUTE',
                payload: currentLocation
            })
        }

        dispatch({
            type: 'ADD-ROUTE',
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