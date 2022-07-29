import React from 'react'

const CreateButton = ({ country, setNewFilter }) => {
  const click = (event) => {
    event.preventDefault()
    console.log('clicked', event.target.value)
    setNewFilter(event.target.value)  
  }
  return <button onClick={click} value={country.name.common}>show </button>
}

export default CreateButton