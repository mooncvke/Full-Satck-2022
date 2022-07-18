import { useState } from 'react'

const All = (props) => {
  return (
    <div>
      <p>{props.text} {props.allClicks.length}</p>
    </div>
  )
}

const Avg = (props) => {
  const avg = (props.good * 1 + props.bad * -1) / props.allClicks.length
  if (props.allClicks.length == 0) {
    return (
      <div>
        <p>average 0</p>
      </div>
    )
  }
  return (
    <div>
      <p>average {avg}</p>
    </div>
  )
}

const Pos = (props) => {
  const percent = props.good / props.allClicks.length * 100
  if (props.allClicks.length == 0) {
    return (
      <div>
        <p>positive 0</p>
      </div>
    )
  }
  return (
    <div>
      <p>positive {percent} %</p>
    </div>
  )

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
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <All text="all" allClicks={allClicks}/>
      <Avg text="avg" allClicks={allClicks} good={good} neutral={neutral} bad={bad} />
      <Pos text="pos" allClicks={allClicks} good={good}/>

    </div>
  )
}

export default App;
