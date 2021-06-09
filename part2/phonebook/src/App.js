import React, { useState, useEffect } from 'react'
import { Persons, Filter, PersonForm } from './components/phonebook'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newNameFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => setPersons(response.data))
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
    const postRequest = () => axios
      .post('http://localhost:3001/persons', newPerson)
    !isPersonOnBook(newName)
      ? postRequest().then(() => setPersons(persons.concat(newPerson)))
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
