import React, { useEffect, useState } from "react";

import ShowPersons from "./components/ShowPersons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";
import Notification from "./components/Notification";
import ErrorNotification from "./components/ErrorNotification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

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
          personService.getAll().then((response) => {
            setPersons(response.data);
          });
          personService
            .update(
              persons.findIndex((person) => person.name === newName) + 1,
              personObject.name,
              personObject.number
            )
            .then((response) => {
              console.log(response.data);
              personService.getAll().then((response) => {
                setPersons(response.data);
              });
              setMessage(`Updated ${newName}'(s) number`);
              setTimeout(() => {
                setMessage(null);
              }, 3000);
              setNewName("");
              setNewNumber("");
            })
            .catch((error) => {
              setError(
                `Information about ${personObject.name} has already been removed from the server`
              );
              setTimeout(() => {
                setError(null);
              }, 3000);
            });
        }
      } else {
        personService.create(personObject).then((response) => {
          setPersons(persons.concat(response.data));
          personService.getAll().then((response) => {
            setPersons(response.data);
          });
          setMessage(`Added ${newName}`);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
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
      <Notification message={message} setMessage={setMessage} />
      <ErrorNotification error={error} seError={setError} />
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
      <ShowPersons
        persons={persons}
        newFilter={newFilter}
        setMessage={setMessage}
        setPersons={setPersons}
      />
    </div>
  );
};
export default App;
