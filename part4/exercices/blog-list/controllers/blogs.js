const blogsRouter = require('express').Router()
const { request } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

const getToken = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getToken(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token && !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.userId)

  const blog = new Blog({
    url: body.url,
    title: body.title,
    likes: body.likes,
    author: body.author,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blogToUpdate =
    {
      title: body.title,
      url: body.url,
      author: body.author
    }
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id, blogToUpdate, { new: true }
  )
  response.json(updatedBlog)
})
module.exports = blogsRouter
