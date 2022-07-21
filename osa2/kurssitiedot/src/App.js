const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part content={props.parts[0].name} amount={props.parts[0].exercises} />
      <Part content={props.parts[1].name} amount={props.parts[1].exercises} />
      <Part content={props.parts[2].name} amount={props.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises +props.parts[2].exercises}</p>
    </div>
  )

}

const Part = (props) => {
  return (
    <div>
      <p>{props.content} {props.amount}</p>
    </div>
  )
}

const Course = (props) => {
  const course = props.course

  return(
    <div>
      <h1>{course.name}</h1>

      {course.parts.map((part, i) => (
        <p key={part.id}> {course.parts[i].name} {course.parts[i].exercises}</p>
      ))}  
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
