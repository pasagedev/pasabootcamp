const blogsRouter = require('express').Router()

const { request } = require('express')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()

  response.status(201).json(result)
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
