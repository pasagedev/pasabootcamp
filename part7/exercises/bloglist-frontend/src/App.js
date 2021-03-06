import React, { useEffect } from 'react'
import { BlogForm } from './components/BlogForm'
import { Notification } from './components/Notification'
import { LoginForm } from './components/LoginForm'
import { Togglable } from './components/Togglable'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { BlogList } from './components/BlogList'
import Blog from './components/Blog'
import { initializeBlogList } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { removeUser, setUserWith } from './reducers/userReducer'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Users } from './components/Users'
import { User } from './components/User'
import { NavBar } from './components/NavBar'


const App = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogList())
    dispatch(initializeUsers())

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUserWith(user))
      blogService.setToken(user.token)
    }

  }, [dispatch])

  return (
    <div className='container'>
      <Notification />
      <Router>
        {user === null
          ? <LoginForm />
          : <div>
            <NavBar />
            <h2>blogs app</h2>
            <Switch>
              <Route path='/users/:userId'>
                <User />
              </Route>
              <Route path='/users'>
                <h2>Users</h2>
                <Users />
              </Route>
              <Route path='/blogs/:blogId'>
                <Blog />
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
    </div>
  )
}

export default App