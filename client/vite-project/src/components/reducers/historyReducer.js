export const historyReducer = (state, action) => {

    switch (action.type) {
        case 'ADD-ROUTE': {

            // we do not want to have two identical routes one after another
            const isAdded = state.routes.includes(action.payload)

            if (state.routes[state.routes.length - 1] !== action.payload && !isAdded) {
                return { routes: [...state.routes, action.payload] }
            }
            return state;
        }
        case 'REMOVE-ROUTE': {
            return { routes: state.routes.splice(0, state.routes.length - 1) }
        }
        default:
            return state
    }
}