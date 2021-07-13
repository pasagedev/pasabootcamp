import React, { useState } from 'react'

export const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('a new note...')
  const handleNoteChange=({ target }) => setNewNote(target.value)

  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: Math.random() < 0.5
    })
    setNewNote('')
  }

  return(
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>
  )
}