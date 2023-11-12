import React from "react";
import "./Button.scss";

const Button = (props) => {
  const primary = props.primary !== undefined ? props.primary : true;
  const buttonPrimary = primary ? "button button--primary" : "button button--secondary";
  const buttonClasses = props.className ? props.className : ''

  const disabled = props.disabled !== undefined ? props.disabled : false;
  const isDisabled = disabled ? " button--disabled" : "";

  return (
    <button className={buttonPrimary + isDisabled + ' ' + buttonClasses} onClick={props.onClick} disabled={disabled}>
      {props.children}
    </button>
  );
};

export default Button;
