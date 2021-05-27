import React from 'react'

const Header = ({ course }) => <h1>{course.name}</h1>

const Part = ({ part }) => {
  const { name, exercises } = part
  return (<p>{name + ' ' + exercises}</p>)
}


const Content = ({ course }) => {
  const parts = course.parts
  const [part1, part2, part3] = parts
  return (
    <div>
      <Part part={part1} />
      <Part part={part2} />
      <Part part={part3} />
    </div>
  )
}

const Total = ({ course }) => {
  const [ part1, part2, part3 ] = course.parts
  return <p>{part1.exercises + part2.exercises + part3.exercises}</p>
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App