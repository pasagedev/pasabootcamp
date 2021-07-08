import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username, password
      })
      setUsername('')
      setPassword('')
      setUser(user)
      console.log(user)
    }catch (exception) {
      console.log('wrong credentials')
    }
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

  const renderBlogsForm = () => (
      blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )
  )
  return (
    <div>
      <h2>blogs</h2>
      {user === null
        ? renderLoginForm()
        : <div>
            <p>{user.name} logged in</p>
            {renderBlogsForm()}
          </div>
      }
    </div>
  )
}

export default App