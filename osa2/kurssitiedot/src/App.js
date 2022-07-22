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
  const total = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises

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