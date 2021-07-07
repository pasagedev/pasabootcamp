const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const userObjects = helper.initialUsers.map(user => new User(user))
  const promiseUsersArray = userObjects.map(user => user.save())
  await Promise.all(promiseUsersArray)

  const [userObject] = await User.find({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog({ ...blog, user: userObject }))
  const promiseBlogsArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseBlogsArray)
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
    const token = await helper.getValidToken()
    const newBlog = {
      title: 'POST a new Test Blog',
      author: 'Pablo',
      url: 'https://test-blog.com/',
      likes: 5
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const blogsInDb = await helper.blogsInDb()
    const titlesBlogsInDb = blogsInDb.map(b => b.title)

    expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1)
    expect(titlesBlogsInDb).toContain(newBlog.title)
  })

  test('has 0 likes by default if "like" property missing', async () => {
    const token = await helper.getValidToken()
    const newBlog = {
      title: 'Test Blog without likes property',
      author: 'Pablo',
      url: 'https://test-blog.com/'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const blogsInDb = await helper.blogsInDb()
    const newBlogAdded = blogsInDb.find(b => b.title === 'Test Blog without likes property')

    expect(newBlogAdded.likes).toBe(0)
  })

  test('fails when "title" or "url" missing', async () => {
    const token = await helper.getValidToken()
    const newBlogWithoutTitle = {
      title: '',
      author: 'Pablo',
      url: 'https://test-blog-without-title-property.com/'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlogWithoutTitle)
      .expect(400)

    const newBlogWithoutUrl = {
      title: 'Test Blog without "url" property',
      author: 'Pablo'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlogWithoutUrl)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
  test('fails with 401 status code when token is missing', async () => {
    const newBlog = {
      title: 'POST a new Test Blog',
      author: 'Pablo',
      url: 'https://test-blog.com/',
      likes: 5
    }
    await api
      .post('/api/blogs')
      .set('Authorization', ' ')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('Deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const token = await helper.getValidToken()
    const blogsAtStart = await helper.blogsInDb()
    await api
      .delete(`/api/blogs/${blogsAtStart[0].id}`)
      .set('Authorization', `Bearer ${token}`)
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
describe('Add a new user', () => {
  test('fails with status 400 if username is already on database', async () => {
    const userAtStart = await helper.usersInDb()
    const userToAdd = {
      username: userAtStart[0].username,
      name: 'same username',
      password: 'sameUser1234'
    }

    const result = await api
      .post('/api/users')
      .send(userToAdd)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(userAtStart.length)
  })

  test('fails with status 400 if username or password do not have the minimum length', async () => {
    const userAtStart = await helper.usersInDb()
    const userToAdd = {
      username: 'pab',
      name: 'short username and password',
      password: 'sa'
    }

    const result = await api
      .post('/api/users')
      .send(userToAdd)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('is shorter than the minimum')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(userAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
