import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'

const Blog = ({ blog, deleteButton }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    const blogWithNewLike = { ...blog, likes: blog['likes']+1 }
    dispatch(updateBlog(blogWithNewLike))
  }

  const handleDelete = () => {
    const confirm = window.confirm(`Remove blog ${blog.title}`)

    if (!confirm) return
    dispatch(deleteBlog(blog.id))
  }

  const showWhenVisible = { display: visible ? '': 'none' }
  const toggleVisivility = () => setVisible(!visible)
  const buttonLabelVisibility = visible ? 'hide' : 'show'

  return(
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisivility}>{buttonLabelVisibility}</button>
      <div style={showWhenVisible} className='hideContent'>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
        <div>{blog.user.username}</div>
        {deleteButton
          ? <button onClick={handleDelete}>delete</button>
          : null
        }
      </div>
    </div>
  )
}

export default Blog
