import { useMutation } from '@apollo/client'
import React, { useState } from 'react'

import { EDIT_AUTHOR } from '../queries'

const BirthYearForm = ({ authors }) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      console.log(error.message)
    }
  })

  const submit = (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, setBornTo: year } })

    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <select onChange={({ target }) => setName(target.value)}>
          <option defaultValue='' disabled={name !== ''}>Select your option</option>
          {authors.map(author => {
            return (
              <option
                key={author.name}
                value={author.name}
              >{author.name}
              </option>
            )
          })}
        </select>
        <div>
          born <input
            type='number'
            value={year}
            onChange={({ target }) => setYear(Number.parseInt(target.value))}
               />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BirthYearForm
