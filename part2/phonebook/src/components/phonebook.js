import react from 'react'

export const Filter = ({ handleFilterChange, newNameFilter }) => (
    <div>filter show with: <input
        onChange={handleFilterChange}
        value={newNameFilter} />
    </div>
)

export const PersonForm = ({ handleSubmit, handleNameInput, nameInputValue, handleNumberInput, numberInputValue }) => (
    <form onSubmit={handleSubmit}>
        <h3>add a new</h3>
        <div>
            name: <input
                onChange={handleNameInput}
                value={nameInputValue} />
        </div>
        <div>
            number: <input
                onChange={handleNumberInput}
                value={numberInputValue} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)
export const SuccessfullyAlert = ({ message }) => (
    message === null ? <div>mensage: {message}</div>
        :
        <div className='successfully'>
            {message}
        </div>
)

const Person = ({ name, number, handleDeletePerson }) => (
    <div>{name} {number} <button onClick={handleDeletePerson}>delete</button></div>
)

export const Persons = ({ numbersToShow, handleDeletePerson }) => {
    return (
        <div> {numbersToShow.map(({ name, number, id }) => (
            <Person key={id} name={name} number={number} handleDeletePerson={() => handleDeletePerson(name, id)} />))}
        </div>)
}