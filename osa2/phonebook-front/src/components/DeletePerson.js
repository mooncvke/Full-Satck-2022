import React from "react";
import personService from "./../services/persons";

const DeletePerson = ({ person, persons, setMessage, setPersons }) => {
  const click = (event) => {
    event.preventDefault();
    console.log("clicked", event.target.value);
    if (window.confirm(`Delete ${person.name} ?`) === true) {
      personService.deleteId(event.target.value).then((response) => {
        console.log(persons);
        personService.getAll().then((response) => {
          setPersons(response.data);
        });
        setMessage(`Deleted ${person.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      });
    }
  };
  return (
    <button onClick={click} value={person.id}>
      delete
    </button>
  );
};

export default DeletePerson;
