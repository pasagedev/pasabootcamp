import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, deleteButton }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showWhenVisible = {display: visible ? '': 'none'}
  const toggleVisivility = () => setVisible(!visible)
  const buttonLabelVisibility = visible ? 'hide' : 'show'
  return(
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisivility}>{buttonLabelVisibility}</button>
        <div style={showWhenVisible}>
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
