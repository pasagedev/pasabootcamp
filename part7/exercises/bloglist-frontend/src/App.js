import React, { useEffect } from 'react'
import { BlogForm } from './components/BlogForm'
import { Notification } from './components/Notification'
import { LoginForm } from './components/LoginForm'
import { Togglable } from './components/Togglable'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { BlogList } from './components/BlogList'
import { initializeBlogList } from './reducers/blogReducer'
import { removeUser, setUserWith } from './reducers/userReducer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Users } from './components/Users'

const App = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogList())

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUserWith(user))
      blogService.setToken(user.token)
    }

  }, [])

  const handleLogout = () => {
    window.localStorage.clear('loggedBlogAppUser')
    dispatch(removeUser())
  }

  return (
    <Router>
      <h2>blogs</h2>
      <Notification />
      {user === null
        ? <LoginForm />
        : <div>
          <p>{user.name} logged in</p>
          <button onClick = {handleLogout} >logout</button>
          <Switch>
            <Route path='/users'>
              <h2>Users</h2>
              <Users />
            </Route>
            <Route path='/'>
              <Togglable showButtonLabel='create new blog' hideButtonLabel='cancel'>
                <BlogForm />
              </Togglable>
              <BlogList user={user}/>
            </Route>
          </Switch>
        </div>
      }
    </Router>
  )
}

export default App