export const authReducer = (state, action) => {

    switch (action.type) {
        case 'LOGIN': {
            localStorage.setItem('accessToken', JSON.stringify(action.payload));
            return { auth: action.payload };
        }
        case 'LOGOUT': {
            localStorage.removeItem('accessToken');
            return { auth: null, sessionExpired: false };
        }
        case 'SESSION-EXPIRED': {
            // shows modal and nullifies state
            return { auth: null, sessionExpired: true };
        }
        default:
            return state;
    }
}

