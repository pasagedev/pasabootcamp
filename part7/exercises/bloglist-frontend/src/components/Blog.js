import React from 'react'
import { Button, Form, FormControl, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { commentBlog, deleteBlog, updateBlog } from '../reducers/blogReducer'

const Blog = () => {
  const blogId = useParams().blogId
  const dispatch = useDispatch()
  const history = useHistory()
  const blog = useSelector(store => store.blogs.find(
    blog => blog.id === blogId
  ))

  const user = useSelector(store => store.user)

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
    history.push('/blogs')
  }

  const handleComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    dispatch(commentBlog(blog, comment))
    event.target.comment.value = ''
  }

  return(
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>likes {blog.likes} <Button size='sm' onClick={handleLike}>like</Button></div>
      <div>added by {blog.user.username}</div>
      {user.username === blog.user.username
        ? <Button variant='danger' size='sm' onClick={handleDelete}>delete</Button>
        : null
      }
      <h3>Comments</h3>
      <Form onSubmit={handleComment}>
        <Form.Group>
          <Row>
            <Col>
              <FormControl as='textarea'
                type=''
                name='comment'
                size='sm'
              />
            </Col>
            <Col><Button type='submit'>add comment</Button></Col>
          </Row>
        </Form.Group>
      </Form>
      <ul>
        {blog.comments && blog.comments.map((comment, index) =>
          <li key={index}>{comment}</li>
        )}
      </ul>
    </div>
  )
}

export default Blog
