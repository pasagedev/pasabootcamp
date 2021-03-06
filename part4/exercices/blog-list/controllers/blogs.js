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

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

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

  const blogWithUser = await Blog
    .findById(savedBlog.id).populate('user', { username: 1, name: 1 })

  response.status(201).json(blogWithUser)
})
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const newComment = request.body.comment

  const commentedBlog = await Blog.findByIdAndUpdate(request.params.id, { $push: { comments: newComment } }, { new: true })

  response.json(commentedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const blogToDelete = await Blog.findById(request.params.id)
  if (blogToDelete === null) return response.status(204).end()

  if (
    !request.token || !decodedToken.id ||
    !(decodedToken.id.toString() === blogToDelete.user.toString())) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blogToUpdate =
    {
      title: body.title,
      url: body.url,
      author: body.author,
      likes: body.likes
    }
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id, blogToUpdate, { new: true }
  )
  response.json(updatedBlog)
})
module.exports = blogsRouter
