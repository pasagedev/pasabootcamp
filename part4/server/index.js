const { request, response } = require('express')
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Note = require('./models/note')


const app = express()
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(express.json())
app.use(requestLogger)
app.use(morgan('dev'))
app.use(cors())
app.use(express.static('build'))



app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({})
    .then(notes => response.json(notes))
})

app.get('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  Note.findById(id)
    .then(note => {
      if (note)
        response.json(note)
      else
        response.status(404).end()
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  Note.findByIdAndDelete(id)
    .then(result => response.json(result))
    .catch(error => next(error))
})

app.post('/api/notes/', (request, response, next) => {
  const body = request.body

  const newNote = new Note({
    content: body.content,
    date: new Date(),
    important: body.important || false,
  })

  newNote.save()
    .then(savedNote => savedNote.toJson())
    .then(savedAndFormattedNote => response.json(savedAndFormattedNote))
    .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body
  const newNote = {
    content : body.content,
    important : body.important
  }
  Note.findByIdAndUpdate(id, newNote, { new: true })
    .then(result => response.json(result))
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  console.log(request)
  response.status(404).send(
    {
      error: 'unknown endpoint',
      method: request.method,
      path: request.path,
      body: request.body,
    })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError')
    return response.status(400).send({ error: 'malformatted id' })
  else if (error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})