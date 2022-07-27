import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ filtered, countries }) => {

   if (filtered().map((country, index) => (
      <div key={index}></div>,
      countries.find(element => element.name.official === filtered()))).length > 10) {
      return (
        <div>Too many matches, specify another filter</div>
      )
    }

    if (filtered().map((country) => (
      countries.find(element => element.name.official === filtered()))).length === 1) {
      
      let country = ''
      filtered().map((country1) => (
        country = country1
      ))

      console.log(country)

      return (
        <div>
          <h1>{country.name.common}</h1>
          <p>
            capital {country.capital} <br></br>
            area {country.area}
          </p>
          <h3>languages:</h3>
          <ul>
            {(Object.keys(country.languages)).map(language => (
              console.log(country.languages.language),
              <li key={language.id}>{country.languages[language]}</li>
            ))}
          </ul>
          
          <img src={country.flags.png}></img>  
        </div>
        )
    } else {
      return (
        <div>
          {filtered().map((country) => (
            <div>{country.name.common}</div>
          ))}
        </div>
      ) 
    }
}

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>find countries<input value={newFilter} onChange={handleFilterChange} /></div>
  )
}

const FindCountries = ({ countries, newFilter }) => {
  const filtered = () => 
    countries.filter((country) => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
  return (
    <div>
      <Country filtered={filtered} countries={countries}/>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
 
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const handleFilterChange = ( event ) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)

  }

  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <FindCountries countries={countries} newFilter={newFilter} />
    </div>
  )
}

export default App
