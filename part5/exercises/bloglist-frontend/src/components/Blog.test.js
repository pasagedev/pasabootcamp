import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM, render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import { exportAllDeclaration } from '@babel/types'


describe('<Blog />', () => {
  let component
  let blog
  const mockHandleLike = jest.fn()

  beforeEach(() => {
    blog = {
      title: 'test of blog component',
      author: 'react-testing',
      url: 'www.blogComponentTest.test',
      likes: 1,
      user:
                {
                  username: 'blogTestUsername'
                }
    }

    component = render(
      <Blog blog={blog} handleLike={mockHandleLike}/>
    )

  })

  test('renders the blog\'s title and author', () => {

    const divTitleAndAuthor = component.getByText(blog.title + ' ' + blog.author)
    expect(divTitleAndAuthor).toBeDefined()
  })

  test('does not render blog\'s url or number of likes by default', () => {
    const url = component.getByText(blog.url)
    const likes = component.getByText(`likes ${blog.likes}`)

    expect(url.parentNode).toHaveStyle('display: none')
    expect(likes.parentNode).toHaveStyle('display: none')
  })

  test('renders blog\'s url and number of likes after click in show button', () => {
    const url = component.getByText(blog.url)
    const likes = component.getByText(`likes ${blog.likes}`)
    const button = component.getByText('show')

    fireEvent.click(button)

    expect(url.parentNode).not.toHaveStyle('display: none')
    expect(likes.parentNode).not.toHaveStyle('display: none')
  })

  test('calls the correct number of times to handler like button', () => {
    const button = component.getByText('like')
    const clicks = 2
    for(let i=0; i<clicks; i++){
      fireEvent.click(button)

    }
    expect(mockHandleLike.mock.calls).toHaveLength(clicks)

  })

})

