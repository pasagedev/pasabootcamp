import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = () => (
    axios
        .get(baseUrl)
        .then(response => response.data)
)

const addPerson = personToAdd =>
    axios
        .post(baseUrl, personToAdd)
        .then(response => response.data)

const deletePerson = personTodelete =>
    axios
    .delete(`${baseUrl}/${personTodelete}`)
    .then(deletedPerson => deletePerson)

export default {
    getAllPersons,
    addPerson,
    deletePerson
}