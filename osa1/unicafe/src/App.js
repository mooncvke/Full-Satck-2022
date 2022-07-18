import { useState } from 'react'

const App = () => {
  const [clicks, setClicks] =  useState({
    good: 0, neutral: 0, bad: 0
  })

  const handleGood = () => {
    const newClicks = {
      good: clicks.good +1,
      neutral: clicks.neutral,
      bad: clicks.bad
    }
    setClicks(newClicks)
  }

  const handleNeutral = () => {
    const newClicks = {
      good: clicks.good,
      neutral: clicks.neutral + 1,
      bad: clicks.bad
    }
    setClicks(newClicks)
  }

  const handleBad = () => {
    const newClicks = {
      good: clicks.good,
      neutral: clicks.neutral,
      bad: clicks.bad +1
    }
    setClicks(newClicks)
  }

  return (
    <div> 
      <h1>give feedback</h1>
      <div>
        <button onClick={handleGood}>good</button>
        <button onClick={handleNeutral}>neutral</button>
        <button onClick={handleBad}>bad</button>
      </div>
      <h1>statistics</h1>
      <p>good {clicks.good}</p>
      <p>neutral {clicks.neutral}</p>
      <p>bad {clicks.bad}</p>
    </div>
  )
}

export default App;
