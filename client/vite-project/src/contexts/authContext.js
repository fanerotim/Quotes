import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext('default token');

export const authReducer = (state, action) => {

    // JUST IDEA OF HOW WE CAN USE THE REDUCER

    switch(action.type) {
        case 'LOGIN':
            // some logic here
            const token = JSON.parse(localStorage.getItem('accessToken'));
            console.log('this is my token', token)
            return token;
        case 'LOGOUT':
            // some logic here
            return;
        default: 
            return state;
    }
}

export const isAuthenticated = () => {

    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('accessToken'));
        
        if (token) {
            setAuth(true)
        }
    })

    return auth;
}