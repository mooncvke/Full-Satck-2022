import { useEffect, useState } from "react";
import axios from "axios";

import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);
  console.log("render", persons.length, "persons");

  const addName = (event) => {
    event.preventDefault();

    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    {
      persons.map((person) => {
        person.name === newName
          ? alert(`${newName} is already added to phonebook`)
          : axios
              .post("http://localhost:3001/persons", nameObject)
              .then((response) => {
                console.log(response);
                setPersons(persons.concat(nameObject));
                setNewName("");
                setNewNumber("");
              });
      });
    }
  };
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  );
};
export default App;
