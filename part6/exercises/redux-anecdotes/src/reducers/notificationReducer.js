let timeoutIdClear

export const setNotificationWith = (message, time) => {
    const timeout = time * 1000
    return async dispatch => {
        dispatch({
            type:'SET_NOTIFICATION',
            data: { 
                message,
            }
        })
        if (timeoutIdClear !== undefined)
            clearTimeout(timeoutIdClear)

        timeoutIdClear = await setTimeout(() => {
            dispatch(removeNotification())
        }, timeout);
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