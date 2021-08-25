import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
fragment BookDetails on Book{
    id
    title
    published
    author {
        name
    }
    genres
}`
export const ALL_AUTHORS = gql`
query allAuthors{
    allAuthors {
        name
        born
        bookCount
        id
    }
}`
export const ALL_BOOKS = gql`
query allBooks {
    allBooks {
        ...BookDetails
    }
}
${BOOK_DETAILS}
`
export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres
    ) {
        title
        author {
            name
        }
        published
        id
        genres
    }
}
`
export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
        name: $name,
        setBornTo: $setBornTo
    ) {
        name
        id
        born
        bookCount
    }
}
`
export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
    login(
        username: $username,
        password: $password
    ) {
        value
    }
}
`
export const ME = gql`
query me{
    me {
        favoriteGenre
        id
    }
}`
export const FILTER_BOOKS = gql`
query filter_books($author: String, $genre: String) {
    allBooks(
        author: $author,
        genre: $genre
        ){
            id
            title
            published
            author {
                name
            }
        }
}
`
export const BOOK_ADDED = gql`
subscription bookAdded {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
