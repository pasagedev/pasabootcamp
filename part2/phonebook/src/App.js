import React, { useState, useEffect } from 'react'
import { Persons, Filter, PersonForm, MessageAlert } from './components/phonebook'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newNameFilter, setNewFilter] = useState('')
  const defaultMessage = { message: null, type: '' }
  const [messageAlert, setMessageAlert] = useState(defaultMessage)

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
          .catch(error => {
            setMessageAlert(
              {
                message: error.response.data.error,
                type: 'error'
              })
            setTimeout(() => setMessageAlert(defaultMessage), 4000)
          })
      }
    }
    else {
      personsService.addPerson(newPerson)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          setMessageAlert(
            {
              message: `Added ${addedPerson.name}`,
              type: 'success'
            })
          setTimeout(() => setMessageAlert(defaultMessage), 2000)
          setNewName('')
          setNewPhone('')
        }
        )
        .catch(error => {
          setMessageAlert(
            {
              message: error.response.data.error,
              type: 'error'
            })
          setTimeout(() => setMessageAlert(defaultMessage), 4000)
        })
    }
  }

  const handleDeletePerson = (name, id) => {
    if (window.confirm(`Delete ${name} ?`))
      personsService.deletePerson(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
        .catch(() => {
          setMessageAlert(
            {
              message: `Information of ${name} has already removed from server`,
              type: 'error'
            })
          setTimeout(() => setMessageAlert(defaultMessage), 2500)
        })
  }

  const numbersToShow = persons.filter((person) => person.name.toLowerCase().indexOf(newNameFilter.toLowerCase()) !== -1)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} value={newNameFilter} />
      <MessageAlert message={messageAlert.message} type={messageAlert.type} />
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
