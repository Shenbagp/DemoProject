import React from "react";
import "./Button.css";

interface Props {
  label: string;
  clickHandler: (id: string) => void;
  id: string;
  disabled?: boolean;
}
const Button: React.FC<Props> = (props: Props) => {
  console.log("inside Button COmponent -", props.id);

  const clickHandler = (id: string) => {
    props.clickHandler(id);
  };

  return (
    <button
      id={props.id}
      onClick={() => clickHandler(props.id)}
      className="buttonclass"
      disabled = { props.disabled }
    >
      {props.label}
    </button>
  );
};

export default Button;
