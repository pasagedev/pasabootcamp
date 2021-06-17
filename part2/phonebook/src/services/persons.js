import axios from 'axios'
const baseUrl = '/api/persons'

const getAllPersons = () => (
    axios
        .get(baseUrl)
        .then(response => response.data)
)

const addPerson = personToAdd =>
    axios
        .post(baseUrl, personToAdd)
        .then(response => response.data)

const deletePerson = personToDelete =>
    axios
        .delete(`${baseUrl}/${personToDelete}`)
        .then(deletedPerson => deletedPerson)

const updatePerson = (idPerson, newPerson) =>
    axios
        .put(`${baseUrl}/${idPerson}`, newPerson)
        .then(updatedPerson => updatedPerson.data)

export default {
    getAllPersons,
    addPerson,
    deletePerson,
    updatePerson
}