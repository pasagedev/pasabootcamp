import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const User = () => {
  const id = useParams().userId
  const user = useSelector(state =>
    state.users.find(
      user => user.id === id))

  if (!user){
    return null
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}