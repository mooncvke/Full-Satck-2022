import React from "react";

const Notification = ({ message, setMessage }) => {
  if (message === null) {
    return null;
  }

  return <div className="message">{message}</div>;
};

export default Notification;
