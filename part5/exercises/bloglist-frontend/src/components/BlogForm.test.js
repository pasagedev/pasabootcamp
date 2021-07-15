import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { BlogForm } from './BlogForm'

test('BlogForm calls newBlog handler with property details', () => {
  const mockNewBlog = jest.fn()
  const blog = {
    title: 'titleForTest',
    author: 'authorForTest',
    url: 'urlForTest'
  }

  const component = render(
    <BlogForm newBlog={mockNewBlog}/>
  )

  const inputs = component.getAllByRole('textbox')
  const titleInput = inputs.find(input => input.name === 'title')
  const authorInput = inputs.find(input => input.name === 'author')
  const urlInput = inputs.find(input => input.name === 'url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: blog.title }
  })
  fireEvent.change(authorInput, {
    target: { value: blog.author }
  })

  fireEvent.change(urlInput, {
    target: { value: blog.url }
  })

  fireEvent.submit(form)

  expect(mockNewBlog.mock.calls[0][0]).toEqual(blog)

})