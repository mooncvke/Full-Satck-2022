import React from "react";
import DeletePerson from "./DeletePerson";

const Person = ({ person, persons, setMessage, setPersons }) => {
  return (
    <div>
      {person.name} {person.number}
      <DeletePerson
        person={person}
        persons={persons}
        setMessage={setMessage}
        setPersons={setPersons}
      />
    </div>
  );
};

export default Person;
