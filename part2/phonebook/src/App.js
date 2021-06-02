import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const isPersonOnBook = (name) => {
    return persons.find((person) => person.name === name) 
    ?true
    :false
    
  }

  const addPerson = (event) => {
    event.preventDefault()
    !isPersonOnBook(newName)
    ?setPersons(persons.concat({ name: newName }))
    :alert(`${newName} is already added to phonebook`)
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            onChange={handleNameChange}
            value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.map((person) => (
        <div key={person.name}>{person.name}</div>
      )
      )}
      </div>
    </div>
  )
}

export default App
