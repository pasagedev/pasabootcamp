import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newNameFilter, setNewFilter] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewPhone(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const isPersonOnBook = (name) => {
    return persons.find((person) => person.name === name)
      ? true
      : false
  }

  const addPerson = (event) => {
    event.preventDefault()
    !isPersonOnBook(newName)
      ? setPersons(persons.concat({ name: newName, number: newPhone }))
      : alert(`${newName} is already added to phonebook`)
    setNewName('')
    setNewPhone('')
  }

  const numbersToShow = persons.filter( (person) => person.name.toLowerCase().indexOf(newNameFilter.toLowerCase()) !== -1)

  console.log(numbersToShow)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          filter show with: <input
            onChange={handleFilterChange}
            value={newNameFilter} />
        </div>
        <h2>add a new</h2>
        <div>
          name: <input
            onChange={handleNameChange}
            value={newName} />
        </div>
        <div>
          number: <input
            onChange={handleNumberChange}
            value={newPhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{numbersToShow.map(({ name, number }) => (
        <div key={name}>{name} {number}</div>
      )
      )}
      </div>
    </div>
  )
}

export default App
