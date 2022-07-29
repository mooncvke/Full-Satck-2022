import React from "react";
import personService from "./../services/persons";

const DeletePerson = ({ person, persons }) => {
  const click = (event) => {
    event.preventDefault();
    console.log("clicked", event.target.value);
    if (window.confirm(`Delete ${person.name} ?`) === true) {
      personService.deleteId(event.target.value).then((response) => {
        persons.splice(event.target.value - 1, 1);
        console.log(persons);
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
