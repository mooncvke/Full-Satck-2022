import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

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
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      
      <h2>Add a new</h2>
      <PersonForm addNmae={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter}/>
    </div>
  )
}
export default App