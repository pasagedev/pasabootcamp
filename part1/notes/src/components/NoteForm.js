import React, { useState } from 'react'

export const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('a new note...')
  const handleNoteChange=({ target }) => setNewNote(target.value)

  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: false
    })
    setNewNote('')
  }

  return(
    <div className='formDiv'>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}