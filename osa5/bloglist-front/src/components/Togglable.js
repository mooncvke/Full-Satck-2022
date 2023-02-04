import React, { useState, useImperativeHandle, forwardRef } from "react";
import ProTypes from "prop-types";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const togglVisibility = () => {
    setVisible(!visible);
  };
  useImperativeHandle(ref, () => {
    return {
      togglVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={togglVisibility} id="newBlogButton">
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={togglVisibility}>Cancel</button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

Togglable.proTypes = {
  buttonLabel: ProTypes.string.isRequired,
};

export default Togglable;
