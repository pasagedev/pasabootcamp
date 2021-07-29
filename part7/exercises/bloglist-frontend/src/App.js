import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { BlogForm } from './components/BlogForm'
import { Notification } from './components/Notification'
import { LoginForm } from './components/LoginForm'
import { Togglable } from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { clearNotification, setNotificationWith } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const DEFAULT_MESSAGE = { content: null, type: null }
  const [message, setMessage] = useState(DEFAULT_MESSAGE)

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )

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
      console.log('wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear('loggedBlogAppUser')
    setUser(null)
  }

  const newBlog = async (newBlogObject) => {
    try {
      const newBlogAdded = await blogService.create(newBlogObject)
      const blogsUpdated= await blogService.getAll()
      setBlogs(blogsUpdated)
      setMessage(
        {
          content: `a new blog ${newBlogAdded.title} added`,
          type: 'success'
        }
      )
      setTimeout(() => {
        setMessage(DEFAULT_MESSAGE)
      }, 3000)
    }catch (exception) {
      console.log(exception)
    }
  }

  const handleLike = async ({ id: blogId, user, likes, author, title, url }) => {
    const blogWithNewLike = {
      user: user.id,
      likes: likes+1,
      author,
      title,
      url
    }
    try {
      await blogService.update(blogId, blogWithNewLike)
      const blogsUpdated= await blogService.getAll()
      setBlogs(blogsUpdated)
    } catch (exception){
      console.log(exception)
    }
  }

  const handleDelete = async blog => {
    const confirm = window.confirm(`Remove blog ${blog.title}`)

    if (!confirm) return

    try {
      await blogService.remove(blog.id)
      const blogsUpdated= await blogService.getAll()
      setBlogs(blogsUpdated)
    }catch (exception) {
      console.log(exception)
    }

  }

  const renderBlogs = () => {
    const sortedBlogs = blogs.sort((first, second) => second.likes - first.likes)
    return(
      sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => handleLike(blog)}
          handleDelete={() => handleDelete(blog)}
          deleteButton ={blog.user.username === user.username ? true: false}
        />
      )
    )}
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message.content} className={message.type}/>
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
            <BlogForm newBlog={newBlog}/>
          </Togglable>
          {renderBlogs()}
        </div>
      }
    </div>
  )
}

export default App