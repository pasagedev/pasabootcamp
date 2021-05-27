import React from 'react'

const Header = ({ course }) => <h1>{course}</h1>

const Part = ({part}) => {
  const {name, exercises} = part
  return (<p>{name + ' ' + exercises}</p>)
}


const Content = ({parts}) => {
  const [part1, part2, part3] = parts
  return (
    <div>
      <Part part={part1} />
      <Part part={part2} />
      <Part part={part3} />
    </div>
  )
}

const Total = (props) => {
  const excercises1 = props.parts[0].exercises
  const excercises2 = props.parts[1].exercises
  const excercises3 = props.parts[2].exercises
  return <p>{excercises1 + excercises2 + excercises3}</p>
}



const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App