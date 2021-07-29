export const setNotificationWith = (notification, error) => (
  {
    type: 'SET_NOTIFICATION',
    data: {
      notification,
      error
    }
  }
)


export const clearNotification = () => (
  { type: 'RESET_NOTIFICATION' }
)

export const notificationReducer = (state = {}, action) => {
  const { type, data } = action

  switch(type){
  case 'SET_NOTIFICATION':{
    return {
      notification: data.notification,
      error: data.error
    }
  }
  case 'RESET_NOTIFICATION':{
    return {}
  }
  default:
    return state
  }
}
