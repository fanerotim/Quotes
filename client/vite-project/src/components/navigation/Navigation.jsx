import styles from './Navigation.module.scss'
import { NavLink, useLocation } from "react-router-dom";
import Logout from '../logout/Logout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useEffect } from 'react';
import { useHistoryContext } from '../../hooks/useHistoryContext';
import useStickyHeader from '../../hooks/useStickyHeader';

const Navigation = () => {

    const { auth } = useAuthContext();

    // listen for route changes and dispatch an action to update history context
    const location = useLocation();
    const currentLocation = location.pathname;
    // check if isBack flag is provided as we dispatch different action if that's the case
    const isBack = location.state?.isBack;
    const { dispatch } = useHistoryContext();
    const { shouldStick } = useStickyHeader();

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
        <nav className={`${styles.navigation__wrapper} ${shouldStick ? styles.sticky : ''}`}>
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