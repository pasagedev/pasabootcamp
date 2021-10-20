import React, { useState } from 'react'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { setNotificationWith, clearNotification } from '../reducers/notificationReducer'
import { setUserWith } from '../reducers/userReducer'
import blogService from '../services/blogs'
import { Button, Form } from 'react-bootstrap'

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
    <>
      <h2>blogs app</h2>
      <p><i>You can use &quot;example&quot; as username and password to try</i></p>
      <Form onSubmit={handleSubmit}>
        <Form.Group  >
          <Form.Label>username</Form.Label>
          <Form.Control
            style= {{ width: '250px' }}
            type='text'
            placeholder='username'
            value={username}
            name='Username'
            onChange={event => setUsername(event.target.value)}
          />

          <Form.Label>password</Form.Label>
          <Form.Control
            style= {{ width: '250px' }}
            type='password'
            placeholder='password'
            value={password}
            name='Password'
            onChange={event => setPassword(event.target.value)}
          />
          <Button variant='primary' type="submit">login</Button>
        </Form.Group>
      </Form>

    </>
  )
}
