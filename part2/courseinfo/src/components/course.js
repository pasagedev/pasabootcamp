import react from 'react'

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Total = ({ course }) => {
    const parts = course.parts
    const sum = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <strong>Number of exercises {sum}</strong>
    )
  }
  
  const Part = ({ part }) => {
    return (
      <li>
        {part.name} {part.exercises}
      </li>
    )
  }
  
  const Content = ({ course }) => {
    return (
      <ul>
        {course.parts.map((part) =>
          <Part key={part.id} part={part} />
        )}
      </ul>
    )
  }
  
export const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }