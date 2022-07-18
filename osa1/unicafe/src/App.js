import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <div>
    <p>{props.text} {props.value}</p>
  </div>
  )
}

const All = (props) => {
  return (
    props.allClicks.length
  )
}

const Avg = (props) => {
  const avg = (props.good * 1 + props.bad * -1) / props.allClicks.length
  return (
    avg
  )
}

const Pos = (props) => {
  const percent = props.good / props.allClicks.length * 100
  return (
    percent
  )

}

const Statistics = (props) => {
  if (props.allClicks.length == 0) {
    return (
      <p>No feedback given</p>
    )
  } else {
    const all = <All allClicks={props.allClicks} good={props.good} neutral={props.neutral} bad={props.bad} />
    const avg = <Avg allClicks={props.allClicks} good={props.good} neutral={props.neutral} bad={props.bad} />
    const pos = <Pos allClicks={props.allClicks} good={props.good} neutral={props.neutral} bad={props.bad} />

    return (
        <div>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={avg} />
          <StatisticLine text="positive" value={pos } />
        </div> 
      )
    }
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleGood = () => {
    setAll(allClicks.concat('G'))
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setAll(allClicks.concat('N'))
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setAll(allClicks.concat('B'))
    setBad(bad + 1)
  }

  return (
    <div> 
      <h1>give feedback</h1>
      <div>
        <Button handleClick={handleGood} text='good' />
        <Button handleClick={handleNeutral} text='neutral' />
        <Button handleClick={handleBad} text='bad' />
      </div>
      <div>
        <h1>statistics</h1>
        <Statistics allClicks={allClicks} good={good} neutral={neutral} bad={bad} />
      </div>

    </div>
  )
  
}
export default App;