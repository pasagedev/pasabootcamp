export const setNotificationWith = message => {
    return {
        type:'SET_NOTIFICATION',
        data: { message }
    }
}

export const removeNotification = () => {
    return {
        type:'CLEAN_NOTIFICATION'
    }
}


export const notificacionReducer = (state=null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data.message
        case 'CLEAN_NOTIFICATION':
            return null
        default:
            return state
    }
}