import React, { useState, useEffect, useRef } from 'react'
import { Note } from './components/Note'
import noteService from './services/notes'
import { Notification } from './components/notification'
import { LoginForm } from './components/LoginForm'
import { NoteForm } from './components/NoteForm'
import { Togglable } from './components/Togglable'
import loginService from './services/login'

const App = () => {

  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true)

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService.update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(() => {
        setErrorMessage(`Note '${note.content}' was already removed from server`)
        setTimeout(() => { setErrorMessage(null) }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const addNote = noteObject => {
    noteFormRef.current.toggleVisible()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
    return (
      <div style={footerStyle}>
        <br />
        <em>Note app, Department of Computer Science, University of Helsinki 2020</em>
      </div>)
  }

  const login = async ({ username, password }) => {
    try{
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null
        ? <Togglable buttonLabel='show login'>
          <LoginForm
            login={login}
          />
        </Togglable>
        : <div>
          <p>{user.name} logged-in</p>
          <Togglable buttonLabel='new note' ref={noteFormRef}>
            <NoteForm createNote={addNote}/>
          </Togglable>
        </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'} notes
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id}
            note={note}
            toggleImportance={toggleImportanceOf} />
        )}
      </ul>

      <Footer />
    </div>
  )
}

export default App