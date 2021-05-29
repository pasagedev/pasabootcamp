import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistic = ({text, value}) => {
return (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)
}

const Statistics = ({ good, neutral, bad, all, average, positivePercent }) => {
  if (all === 0) {
    return <p>No feedback given</p>
  }
  return (
      <table>
        <tbody>
          <Statistic text='good' value={good} />
          <Statistic text='neutral' value={neutral} />
          <Statistic text='bad' value={bad} />
          <Statistic text='all' value={all} />
          <Statistic text='average' value={average} />
          <Statistic text='positive' value={positivePercent + ' %'} />
        </tbody>
      </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positivePercent = good / all * 100

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <h2>statistics</h2>
      <Statistics all={all} average={average} positivePercent={positivePercent} good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
