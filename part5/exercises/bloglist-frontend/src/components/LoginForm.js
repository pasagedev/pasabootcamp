import React from "react"

export const LoginForm = ({handleSubmit, username, password, handleUsernameChange, handlePasswordChange}) => (
  <form onSubmit={handleSubmit}>
      <div> username   
        <input 
          type='text'
          value={username}
          name='Username'
          onChange={handleUsernameChange}
        />
      </div>
      <div> password   
        <input 
          type='password'
          value={password}
          name='Password'
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
  </form>
  )