import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import {BlogForm} from './components/BlogForm'
import {Notification} from './components/notification'
import { LoginForm } from './components/LoginForm'
import { Togglable } from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const DEFAULT_MESSAGE = {content: null, type: null}
  const [message, setMessage] = useState(DEFAULT_MESSAGE)


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

  const newBlog = async (newBlogObject) => {
    try {
      const newBlogAdded = await blogService.create(newBlogObject)
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

  const handleLike = async ({id: blogId, user, likes, author, title, url}) => {
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
  const renderBlogs = () => {
    const sortedBlogs = blogs.sort((first, second) => second.likes - first.likes)
    return(
      sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={() => handleLike(blog)}/>
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
            handleUsernameChange={({target}) => setUsername(target.value)}
            handlePasswordChange= {({target}) => setPassword(target.value)}
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