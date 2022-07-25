import { useState } from 'react'
const Person = ( {person} ) => {
    console.log(person)
    return (
        <div> {person.name} {person.number} </div>
    )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(false)

  const addName = (event) => {
    event.preventDefault()

    const nameObject = {
    name: newName,
    number: newNumber,
    id: persons.length + 1 }
    

    { persons.map(person => 
      { person.name === newName ? alert(`${newName} is already added to phonebook`) :  
      setPersons(persons.concat(nameObject))
      setNewName('') 
      setNewNumber('')
      })}
  }
  
  const personsToShow = () => persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  
    

  const handleNameChange = ( event ) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

    const handleNumberChange = ( event ) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = ( event ) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with<input value={newFilter} onChange={handleFilterChange} /></div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow().map(person => (
          <Person key={person.id} person={person} />
        ))}
      </div>
    </div>
  )
}
export default App