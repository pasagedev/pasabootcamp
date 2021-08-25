import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      window.localStorage.setItem('library-user-token', token)
      setPage('add')
    }
  }, [result.data])

  if (!show) return null

  const submit = (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }
  return (
    <div>
      <form onSubmit={submit}>
        <div> username <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
                       />
        </div>
        <div> password <input
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
                       />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
