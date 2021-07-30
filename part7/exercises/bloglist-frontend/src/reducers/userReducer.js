export const setUserWith = (user) => {
  return {
    type: 'SET_USER',
    data: { user }
  }
}

export const removeUser = () => {
  return {
    type: 'REMOVE_USER',
  }
}

export const userReducer = (state=null, { type, data }) => {
  switch (type) {
  case 'SET_USER': {
    return data.user
  }
  case 'REMOVE_USER': {
    return null
  }
  default:
    return state
  }
}