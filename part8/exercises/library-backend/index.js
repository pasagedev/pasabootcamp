const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

const MONGODB_URI = 'mongodb+srv://bootcamp:34456631@cluster0.lz7do.mongodb.net/graphql-library?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB', error.message)
  })

const typeDefs = gql`
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
  }
`

const resolvers = {
  Author: {
    bookCount: (root) => books.filter(book => root.name === book.author).length
  },
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allAuthors: () => {
      return Author.find({})
    },
    allBooks: async (root, args) => {
      const params = Object.keys(args)

      const reducer = (filteredBooks, param) => {
        return param === 'genre'
          ? filteredBooks.filter(book => book.genres.includes(args[param]))
          : filteredBooks.filter(book => book[param] === args[param])
      }

      return params.reduce(reducer, Book.find({}).populate('author'))
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })

      if (author === null) {
        const author = new Author({ name: args.author })
        await author.save()
      }
      const book = new Book({ ...args, author: author._id })
      return (book.save())
    },
    editAuthor: (root, args) => {
      const { name, setBornTo } = args
      const index = authors.findIndex(author => author.name === name)
      if (index === -1) return null

      authors[index].born = setBornTo
      return authors[index]
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
