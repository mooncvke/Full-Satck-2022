import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Uint8Array(7))

  const handleAnecdote = () => {
    let number = selected
    while (number === selected) {
      number = Math.floor(Math.random() * 6)
    }
    setSelected(number)
  }

  const handleVote = () => {
    const copy = [...vote]
    let copy_i = copy[selected]
    copy_i += 1

    copy[selected] = copy_i

    setVote(copy)
  }

  return (
    <div>
      {anecdotes[selected]}
      <p>has {vote[selected]} votes</p>
      <Button handleClick={handleVote} text='vote' />
      <Button handleClick={handleAnecdote} text='next anecdote' />
    </div>
  )
}

export default App
