import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

export const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = blogs.sort((first, second) => second.likes - first.likes)

  return(
    <div>
      <Table striped>
        <tbody>
          {sortedBlogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </td>
              <td>
                {blog.author}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )}