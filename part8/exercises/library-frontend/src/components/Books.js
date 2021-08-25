import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const { loading, data } = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState('all')

  if (!props.show) {
    return null
  }

  if (loading) return <div>loading...</div>

  const booksToShow = filter === 'all'
    ? data.allBooks
    : data.allBooks.filter(book => book.genres.some(genre => genre === filter))

  const genres = [...new Set(
    data.allBooks.reduce((genres, book) => {
      return book.genres.concat(genres)
    }, ['all'])
  )]

  return (
    <div>
      <h2>books</h2>
      <p>in genre <strong>{filter}</strong></p>
      <table>
        <tbody>
          <tr>
            <th />
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genres.map(genre => {
          return (
            <label key={genre}>
              <input
                name={genre}
                type='radio'
                value={genre}
                checked={filter === genre}
                onChange={() => setFilter(genre)}
              />
              {genre}
            </label>
          )
        }
        )}
      </div>
    </div>
  )
}

export default Books
