import React from "react";
import DeletePerson from "./DeletePerson";

const Person = ({ person, persons }) => {
  return (
    <div>
      {" "}
      {person.name} {person.number}
      <DeletePerson person={person} persons={persons} />
    </div>
  );
};

export default Person;
