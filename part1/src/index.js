import ReactDOM from 'react-dom';
import {useState} from 'react'

const Hello = ({ age, name }) => {

    const bornYear = () => (new Date().getFullYear() - age)

    return (
        <div>
            <p>
                Hello {name}, you are {age} years old
            </p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    )
}

// const App = () => {
//     const name = 'Peter'
//     const age = 10

//     return (
//     <div>
//         <h1>Grettings</h1>
//         <Hello name="Maya" age={26 + 10} />
//         <Hello name={name} age={age} />
//     </div>
//     )
// }

const App = (props) => {
    const [counter, setCounter ] = useState(0)

    return (
        <div onSelect = {() => console.profileEnd('click')}>{counter}</div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))