import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import {Notification} from './components/notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const DEFAULT_MESSAGE = {content: null, type: null}
  const [message, setMessage] = useState(DEFAULT_MESSAGE)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
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
      setMessage(
        {
          content: `${user.name} logged in successfully`,
          type: 'success'
        }
      )
      setTimeout(() => {
        setMessage(DEFAULT_MESSAGE)
      }, 3000); 
    }catch (exception) {
      setMessage(
        {
          content: 'wrong credentials',
          type: 'error'
        }
      )
      setTimeout(() => {
        setMessage(DEFAULT_MESSAGE)
      }, 3000); 
      console.log('wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear('loggedBlogAppUser')
    setUser(null)
  }

  const renderLoginForm = () => (
    <form onSubmit={handleLogin}>
        <div> username   
          <input 
            type='text'
            value={username}
            name='Username'
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div> password   
          <input 
            type='password'
            value={password}
            name='Password'
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
  )

  const handleNewBlog = async event => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url
    }
    try {
      const newBlogAdded = await blogService.create(blogObject)
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(newBlogAdded))
      setMessage(
        {
          content: `a new blog ${newBlogAdded.title} added`,
          type: 'success'
        }
      )
      setTimeout(() => {
        setMessage(DEFAULT_MESSAGE)
      }, 3000); 
    }catch (exception) {
      console.log(exception)
    }

  }

  const renderNewBlogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
          <div> title:   
            <input 
              type='text'
              value={title}
              name='title'
              onChange={({target}) => setTitle(target.value)}
            />
          </div>
          <div> author:   
            <input 
              type='author'
              value={author}
              name='author'
              onChange={({target}) => setAuthor(target.value)}
            />
          </div>
          <div> url:   
            <input 
              type='text'
              value={url}
              name='url'
              onChange={({target}) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
    </div>
  )

  const renderBlogs = () => (
      blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )
  )
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message.content} className={message.type}/>
      {user === null
        ? renderLoginForm()
        : <div>
            <p>{user.name} logged in
              <button onClick = {handleLogout} >logout</button> 
            </p>      
          {renderNewBlogForm()} 
          {renderBlogs()}
          </div>
      }
    </div>
  )
}

export default App