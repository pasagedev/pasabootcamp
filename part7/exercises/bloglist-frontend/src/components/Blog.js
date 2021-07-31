import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'

const Blog = ({ deleteButton }) => {
  const blogId = useParams().blogId
  const dispatch = useDispatch()

  const blog = useSelector(store => store.blogs.find(
    blog => blog.id === blogId
  ))

  if (!blog)
    return null

  const handleLike = () => {
    const blogWithNewLike = { ...blog, likes: blog['likes']+1 }
    dispatch(updateBlog(blogWithNewLike))
  }

  const handleDelete = () => {
    const confirm = window.confirm(`Remove blog ${blog.title}`)

    if (!confirm) return
    dispatch(deleteBlog(blog.id))
  }

  return(
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a>{blog.url}</a>
      <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
      <div>{blog.user.username}</div>
      {deleteButton
        ? <button onClick={handleDelete}>delete</button>
        : null
      }
      <h3>Comments</h3>
      <ul>
        {blog.comments && blog.comments.map((comment, index) =>
          <li key={index}>{comment}</li>
        )}
      </ul>
    </div>
  )
}

export default Blog
