const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 10
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }

]
beforeAll(async () => {
  await Blog.deleteMany({})

  let blog = new Blog(initialBlogs[0])
  await blog.save()

  blog = new Blog(initialBlogs[1])
  await blog.save()
})

test('blogs returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('all blogs are returned', async () => {
  const result = await api.get('/api/blogs')

  expect(result.body).toHaveLength(initialBlogs.length)
})
test('"id" property is the name of unic identificator', async () => {
  const result = await api.get('/api/blogs')
  expect(result.body[0].id).toBeDefined()
})
test('a new blog entry is added correctly', async () => {
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

  const blogs = await Blog.find({})
  const titlesBlogsInDb = blogs.map(b => b.title)

  expect(blogs).toHaveLength(initialBlogs.length + 1)
  expect(titlesBlogsInDb).toContain(newBlog.title)
})
test('blog with missing "like" property is added with 0 by default', async () => {
  const newBlog = {
    title: 'Test Blog without likes property',
    author: 'Pablo',
    url: 'https://test-blog.com/'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogs = await Blog.find({})
  const newBlogAdded = blogs.find(b => b.title === 'Test Blog without likes property')

  expect(newBlogAdded.likes).toBe(0)
})
test.only('blog with missing "title" or "url" property is not added', async () => {
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

  const blogs = await Blog.find({})
  expect(blogs).toHaveLength(initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
