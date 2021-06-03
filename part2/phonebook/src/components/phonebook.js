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

const Person = ({ name, number }) => <div>{name} {number}</div>

export const Persons = ({ numbersToShow }) => {
    return (
        <div> {numbersToShow.map(({ name, number }) => (
            <Person key={name}
                name={name}
                number={number} />))}
        </div>)
}