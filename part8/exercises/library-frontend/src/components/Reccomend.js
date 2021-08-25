import { useLazyQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { ME, FILTER_BOOKS } from '../queries'

const Reccomend = ({ show }) => {
  const [me, meResult] = useLazyQuery(ME)
  const [filterBooks, filterBooksResult] = useLazyQuery(FILTER_BOOKS)

  useEffect(() => {
    if (show) {
      me()
    }
  }, [show])

  useEffect(() => {
    if (meResult.data) {
      filterBooks({ variables: { genre: meResult.data.me.favoriteGenre } })
    }
  }, [show, meResult.data])

  if (!show) return null

  if (meResult.loading || filterBooksResult.loading) {
    return <div>loading...</div>
  }

  const favoriteGenre = !meResult.data ? null : meResult.data.me.favoriteGenre
  const booksToShow = !filterBooksResult.data ? [] : filterBooksResult.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>
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
    </div>
  )
}

export default Reccomend
