import React from "react";
import "./Button.scss";

const Button = (props) => {
  const primary = props.primary !== undefined ? props.primary : true;
  const buttonClasses = primary ? "button button--primary" : "button button--secondary";

  const disabled = props.disabled !== undefined ? props.disabled : false;
  const isDisabled = disabled ? " button--disabled" : "";

  return (
    <button className={buttonClasses + isDisabled} onClick={props.onClick} disabled={disabled}>
      {props.children}
    </button>
  );
};

export default Button;
