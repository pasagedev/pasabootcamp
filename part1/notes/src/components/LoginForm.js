import React, { useState } from 'react'

export const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange=({ target }) => setUsername(target.value)
  const handlePasswordChange=({ target }) => setPassword(target.value)

  const handleLogin = async event => {
    event.preventDefault()
    login({ username, password })
  }

  return(
    <form onSubmit={handleLogin}>
      <div>username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )
}