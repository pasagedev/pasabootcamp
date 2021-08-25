const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const { createServer } = require('http')
const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server-express')
const { PubSub } = require('graphql-subscriptions')

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'SECRET_WORD_FOR_TOKEN'
const MONGODB_URI = 'mongodb+srv://bootcamp:34456631@cluster0.lz7do.mongodb.net/graphql-library?retryWrites=true&w=majority'

const pubsub = new PubSub()

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB', error.message)
  })

const typeDefs = gql`
  type User{
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book]!
      allAuthors: [Author]!
      me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  },
  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Author: {
    bookCount: (root) => root.books.length
  },
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: () => {
      return Author.find({})
    },
    allBooks: async (root, args) => {
      const filter = {}
      if (args.genre) {
        filter.genres = args.genre
      }
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        filter.author = author._id
      }
      return Book.find(filter).populate('author')
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) { throw new AuthenticationError('not authenticated') }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author })
        try {
          author = await author.save()
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }
      const book = new Book({ ...args, author: author._id })
      try {
        const savedBook = await book.save()
        author.books = author.books.concat(savedBook._id)
        await author.save()

        pubsub.publish('BOOK_ADDED', {
          bookAdded: savedBook.populate('author').execPopulate()
        })

        return (savedBook.populate('author').execPopulate())
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      const { name, setBornTo } = args
      const author = await Author.findOne({ name })

      if (!currentUser) { throw new AuthenticationError('not authenticated') }
      if (author === null) { return null }

      author.born = setBornTo
      try {
        const savedAuthor = await author.save()
        return savedAuthor
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      try {
        const savedUser = await user.save()
        return savedUser
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username })

      if (!user || password !== 'secretPass') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username,
        id: user._id
      }
      return ({ value: jwt.sign(userForToken, JWT_SECRET) })
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const app = express()
const httpServer = createServer(app)
const schema = makeExecutableSchema({ typeDefs, resolvers })

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.start()
  .then(() => {
    server.applyMiddleware({
      app,
      path: '/'
    })
  })
  .then(() => {
    const subscriptionServer = SubscriptionServer.create({
      schema,
      execute,
      subscribe
    }, {
      server: httpServer,
      path: `${server.graphqlPath}graphql`
    })

    const PORT = 4000

    httpServer.listen(PORT, () => {
      console.log(`🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`)
      console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}graphql`)
      return subscriptionServer
    })
  })
