const Header = ({course}) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

const Content = ({course}) => {
  return (
    <div>
      {course.parts.map(part => (
          <Part key={part.id} part={part} />
      ))}
    </div>
  )
}

const Total = ({course}) => {
  const total = course.parts.reduce((previous, current) => previous + current.exercises, 0)

  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )

}

const Part = ({part}) => {
  return (
      <p>{part.name} {part.exercises}</p>

  )
}

const Course = ({course}) => {

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>

  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App