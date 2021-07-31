import React, { useEffect, useState } from 'react'
import userService from '../services/users'

export const Users =  () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll()
      .then(users => setUsers(users))
      .catch()
  }, [])

  return (
    <table>
      <thead>
        <tr>
          <th />
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user =>
          <tr key={user.id}>
            <td> {user.username} </td>
            <td>{user.blogs.length}</td>

          </tr>
        )}
      </tbody>
    </table>

  )
}