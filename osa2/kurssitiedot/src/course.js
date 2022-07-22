import Header from './components/header'
import Content from './components/content'
import Total from './components/total'

const Course = ({course}) => {

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>

  )
}

export default Course