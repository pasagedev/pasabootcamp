import React, { useState, useEffect } from 'react'
import { Persons, Filter, PersonForm, SuccessfullyAlert } from './components/phonebook'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newNameFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personsService
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
    if (isPersonOnBook(newName)) {
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)
      if (result) {
        const oldPerson = persons.find(person => person.name === newPerson.name)
        personsService.updatePerson(oldPerson.id, newPerson)
          .then(updatedPerson =>
            setPersons(persons.map(person => person.id !== oldPerson.id ? person : updatedPerson))
          )
      }
    }
    else {
      personsService.addPerson(newPerson)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          console.log('ok')
          setSuccessMessage(`Added ${addedPerson.name}`)
          setTimeout(() => setSuccessMessage(null), 2000)
          setNewName('')
          setNewPhone('')

        }
        )
    }
  }

  const handleDeletePerson = (name, id) => {
    if (window.confirm(`Delete ${name} ?`))
      personsService.deletePerson(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
  }

  const numbersToShow = persons.filter((person) => person.name.toLowerCase().indexOf(newNameFilter.toLowerCase()) !== -1)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} value={newNameFilter} />
      <SuccessfullyAlert message={successMessage} />
      <PersonForm
        handleSubmit={handleSubmitPersonForm}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
        nameInputValue={newName}
        numberInputValue={newPhone} />
      <h3>Numbers</h3>
      <Persons numbersToShow={numbersToShow} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App
