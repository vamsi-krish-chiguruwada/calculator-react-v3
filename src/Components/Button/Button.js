import React from "react";
import "./Button.css";

const buttonKeyboard = (props) => {
  return (
    <div
      onClick={() => props.keyboardClicked(props.content)}
      className="num-button"
    >
      <p>{props.content}</p>
    </div>
  );
};
export default buttonKeyboard;
