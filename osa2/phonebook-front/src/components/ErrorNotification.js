import React from "react";

const ErrorNotification = ({ error, setError }) => {
  if (error === null) {
    return null;
  }

  return <div className="error">{error}</div>;
};

export default ErrorNotification;
