import React from "react";
import "../styles/Input.css";

export const Input = function(props) {
  const handleOnChange = evt => {
    props.onChange(evt.target.value);
  };

  return (
    <div className="input-wrapper">
      <span>{props.leftLabel}</span>
      <input
        value={props.value}
        onChange={handleOnChange}
        type="number"
      ></input>
      <span>{props.rightLabel}</span>
    </div>
  );
};
