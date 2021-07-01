const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})
describe('When there is initially some blogs saved', () => {
  test('blogs returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const result = await api.get('/api/blogs')

    expect(result.body).toHaveLength(helper.initialBlogs.length)
  })

  test('"id" property is the name of unic identificator', async () => {
    const result = await api.get('/api/blogs')
    expect(result.body[0].id).toBeDefined()
  })
})

describe('Addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'POST a new Test Blog',
      author: 'Pablo',
      url: 'https://test-blog.com/',
      likes: 5
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blogsInDb = await helper.blogsInDb()
    const titlesBlogsInDb = blogsInDb.map(b => b.title)

    expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1)
    expect(titlesBlogsInDb).toContain(newBlog.title)
  })

  test('has 0 likes by default if "like" property missing', async () => {
    const newBlog = {
      title: 'Test Blog without likes property',
      author: 'Pablo',
      url: 'https://test-blog.com/'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blogsInDb = await helper.blogsInDb()
    const newBlogAdded = blogsInDb.find(b => b.title === 'Test Blog without likes property')

    expect(newBlogAdded.likes).toBe(0)
  })

  test('fails when "title" or "url" missing', async () => {
    const newBlogWithoutTitle = {
      title: '',
      author: 'Pablo',
      url: 'https://test-blog-without-title-property.com/'
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithoutTitle)
      .expect(400)

    const newBlogWithoutUrl = {
      title: 'Test Blog without "url" property',
      author: 'Pablo'
    }
    await api
      .post('/api/blogs')
      .send(newBlogWithoutUrl)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('Deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    await api
      .delete(`/api/blogs/${blogsAtStart[0].id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
  })
})

describe('Update of a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogs = await helper.blogsInDb()
    const blogToUpdate = blogs[0]
    const newContentBlog = {
      title: 'This is a test to update a blog',
      author: blogToUpdate.author,
      url: blogToUpdate.url
    }
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newContentBlog)
      .expect(200)

    const updatedBlog = await Blog.findById(blogToUpdate.id)
    expect(updatedBlog.title).toContain(newContentBlog.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
