import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM, render } from '@testing-library/react'
import Blog from './Blog'
import { exportAllDeclaration } from '@babel/types'


describe('<Blog />', () => {
  let component
  let blog
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
      <Blog blog={blog}/>
    )

  })

  test('renders the blog\'s title and author', () => {

    const divTitleAndAuthor = component.getByText(blog.title + ' ' + blog.author)
    expect(divTitleAndAuthor).toBeDefined()
  })

  test('does not render its url or number of likes by default', () => {
    const url = component.getByText(blog.url)
    const likes = component.getByText(`likes ${blog.likes}`)

    expect(url.parentNode).toHaveStyle('display: none')
    expect(likes.parentNode).toHaveStyle('display: none')
  })

})

