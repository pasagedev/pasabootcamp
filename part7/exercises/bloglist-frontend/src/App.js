import React, { useState, useEffect } from 'react'
import { BlogForm } from './components/BlogForm'
import { Notification } from './components/Notification'
import { LoginForm } from './components/LoginForm'
import { Togglable } from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { clearNotification, setNotificationWith } from './reducers/notificationReducer'
import { BlogList } from './components/BlogList'
import { initializeBlogList } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogList())

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      console.log(user)
      setUsername('')
      setPassword('')
      setUser(user)
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

  const handleLogout = () => {
    window.localStorage.clear('loggedBlogAppUser')
    setUser(null)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null
        ? <LoginForm
          handleSubmit={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange= {({ target }) => setPassword(target.value)}
        />
        : <div>
          <p>{user.name} logged in
            <button onClick = {handleLogout} >logout</button>
          </p>
          <Togglable showButtonLabel='create new blog' hideButtonLabel='cancel'>
            <BlogForm />
          </Togglable>
          <BlogList
            user={user}/>
        </div>
      }
    </div>
  )
}

export default App