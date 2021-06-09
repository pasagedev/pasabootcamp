import React, { useState, useEffect } from 'react'
import { Persons, Filter, PersonForm } from './components/phonebook'
import axios from 'axios'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newNameFilter, setNewFilter] = useState('')

  useEffect(() => {personsService
    .getAllPersons()
    .then(persons => setPersons(persons))
  }, [])

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
    const newPerson = { name: newName, number: newPhone }
    !isPersonOnBook(newName)
      ? personsService.addPerson(newPerson).then(addedPerson => setPersons(persons.concat(addedPerson)))
      : alert(`${newName} is already added to phonebook`)
    setNewName('')
    setNewPhone('')
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
