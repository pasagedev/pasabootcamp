import React, { useState } from 'react'
import { Persons, Filter, PersonForm } from './components/phonebook'

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

  const handleNameInput = (event) => setNewName(event.target.value)
  const handleNumberInput = (event) => setNewPhone(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const isPersonOnBook = (name) => {
    return persons.find((person) => person.name === name)
      ? true
      : false
  }

  const handleSubmitPersonForm = (event) => {
    event.preventDefault()
    if (newName === '')
      return alert('You must to enter a name')
    event.preventDefault()
    !isPersonOnBook(newName)
      ? setPersons(persons.concat({ name: newName, number: newPhone }))
      : alert(`${newName} is already added to phonebook`)
    setNewName('')
    setNewPhone('')
    console.log({ newPhone })
  }

  const numbersToShow = persons.filter((person) => person.name.toLowerCase().indexOf(newNameFilter.toLowerCase()) !== -1)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} value={newNameFilter} />
      <PersonForm
        handleSubmit={handleSubmitPersonForm}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
        nameInputValue={newName}
        numberInputValue={newPhone} />
      <h3>Numbers</h3>
      <Persons numbersToShow={numbersToShow} />
    </div>
  )
}

export default App
