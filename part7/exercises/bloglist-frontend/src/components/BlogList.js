import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

export const BlogList = ({ user }) => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = blogs.sort((first, second) => second.likes - first.likes)
  console.log(user, blogs)

  return(
    sortedBlogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        deleteButton ={
          blog.user.username
            ? blog.user.username === user.username
            : blog.user === user.username}
      />
    )
  )}