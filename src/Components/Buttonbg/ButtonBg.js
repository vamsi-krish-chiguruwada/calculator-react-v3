import React from "react";
import "./ButtonBg.css";

const buttonBgKeyboard = (props) => {
  return (
    <div
      onClick={() => props.keyboardClicked(props.content)}
      className="num-buttonBg"
    >
      <p>{props.content}</p>
    </div>
  );
};
export default buttonBgKeyboard;
