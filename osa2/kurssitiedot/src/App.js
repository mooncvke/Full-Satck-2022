const Course = (props) => {
  const course = props.course

  const total = course.parts.reduce(
    (previousTotal, currentTotal) => previousTotal + currentTotal.exercises, 0
  )


  return(
    <div>
      <h1>{course.name}</h1>

      {course.parts.map((part, i) => (
        <p key={part.id}> {course.parts[i].name} {course.parts[i].exercises}</p>
      ))}


      <h4>total of {total} exercises</h4>  
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
