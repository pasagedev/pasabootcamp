


export const notificacionReducer = (state=null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        default:
            return state
    }
}