import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogReducer'

export const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = event => {
    event.preventDefault()
    const newBlog= {
      title,
      author,
      url
    }
    dispatch(createNewBlog(newBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control
            type='text'
            value={title}
            name='title'
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>author</Form.Label>
          <Form.Control
            type='text'
            value={author}
            name='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label>url</Form.Label>
          <Form.Control
            type='text'
            value={url}
            name='url'
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button variant="primary" type="submit">create</Button>
        </Form.Group>
      </form>
    </div>
  )}