const Total = ({course}) => {
  const total = course.parts.reduce((previous, current) => previous + current.exercises, 0)

  return (
    <div>
      <h4>total of {total} exercises</h4>
    </div>
  )

}

export default Total