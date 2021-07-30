import React, { useState } from 'react'
import PropTypes from 'prop-types'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { setNotificationWith, clearNotification } from '../reducers/notificationReducer'
import { setUserWith } from '../reducers/userReducer'
import blogService from '../services/blogs'

export const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async event => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
      dispatch(setUserWith(user))
      blogService.setToken(user.token)

      dispatch(setNotificationWith(`${user.name} logged in successfully`, false))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 3000)
    }catch (exception) {
      dispatch(setNotificationWith('wrong credentials', true))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div> username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={event => setUsername(event.target.value)}
        />
      </div>
      <div> password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired
}