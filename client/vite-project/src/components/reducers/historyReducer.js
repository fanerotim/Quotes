export const historyReducer = (state, action) => {

    switch (action.type) {
        case 'UPDATE-HISTORY': {

            const newState = { location: state.location.slice(0) }
            // we do not want to have two identical routes one after another
            if (state.location[0] !== action.payload) {
                newState.location.unshift(action.payload);
            }

            return newState
        }
        default:
            return state
    }
}