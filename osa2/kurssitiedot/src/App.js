const Header = ({course}) => {
  return (
    <div>
      <h2>{course.name}</h2>
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
      <h4>total of {total} exercises</h4>
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
  const courses = [
    {
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web developement curriculum</h1>
      {courses.map(course => (
        <Course key={course.id} course={course} />
      )) }
    </div>
  )
}

export default App