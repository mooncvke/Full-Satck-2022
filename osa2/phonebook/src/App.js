import { useEffect, useState } from "react";

import ShowPersons from "./components/ShowPersons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";

const DeletePerson = () => {};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    {
      if (persons.some((person) => person.name === newName)) {
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one`
          ) === true
        ) {
          console.log(
            "here i am going. index:  ",
            persons.findIndex((person) => person.name === newName)
          );
          personService
            .update(
              persons.findIndex((person) => person.name === newName) + 1,
              personObject.name,
              personObject.number
            )
            .then((response) => {
              console.log(response.data);
            });

          setNewName("");
          setNewNumber("");
        }
      } else {
        personService.create(personObject).then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
        });
      }
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
      <ShowPersons persons={persons} newFilter={newFilter} />
    </div>
  );
};
export default App;
