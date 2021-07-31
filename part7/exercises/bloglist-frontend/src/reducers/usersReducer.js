import userService from '../services/users'

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: { users }
    })
  }
}

export const usersReducer = (state=[], { type, data }) => {
  switch (type) {
  case 'INIT_USERS': {
    return data.users
  }
  default:
    return state
  }
}