import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ADD_BOOK, ALL_BOOKS, FILTER_BOOKS, ME } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
    onError: (error) => console.log(error.message),
    update: (store, response) => {
      try {
        const meInStore = store.readQuery({ query: ME })
        const filterBookInStore = store.readQuery({
          query: FILTER_BOOKS,
          variables: { genre: meInStore.me.favoriteGenre }
        })
        store.writeQuery({
          query: FILTER_BOOKS,
          data: {
            ...filterBookInStore,
            allBooks: [...filterBookInStore.allBooks, response.data.addBook]
          },
          variables: { genre: meInStore.me.favoriteGenre }
        })
      } catch (error) {
        console.log(error)
      }
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    try {
      addBook({ variables: { title, author, published, genres } })
    } catch (error) {
      console.log('can\'t add book', error)
    }

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>add book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(Number.parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type='button'>add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
