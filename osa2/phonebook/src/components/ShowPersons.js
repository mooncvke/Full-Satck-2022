import React from "react";
import Person from "./Person";

const ShowPersons = ({ persons, newFilter, setMessage }) => {
  const peopleToShow = () =>
    persons.filter((person) =>
      person.name.toLowerCase().includes(newFilter.toLowerCase())
    );

  return (
    <div>
      {peopleToShow().map((person) => (
        <Person
          key={person.id}
          person={person}
          persons={persons}
          setMessage={setMessage}
        />
      ))}
    </div>
  );
};

export default ShowPersons;
