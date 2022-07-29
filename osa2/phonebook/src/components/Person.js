import React from "react";
import DeletePerson from "./DeletePerson";

const Person = ({ person, persons, setMessage }) => {
  return (
    <div>
      {person.name} {person.number}
      <DeletePerson person={person} persons={persons} setMessage={setMessage} />
    </div>
  );
};

export default Person;
