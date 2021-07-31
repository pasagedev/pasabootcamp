import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = blogs.sort((first, second) => second.likes - first.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    sortedBlogs.map(blog =>
      <div key={blog.id} style={blogStyle}>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
    )
  )}