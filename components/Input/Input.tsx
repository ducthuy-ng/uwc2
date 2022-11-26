import * as React from "react";
import { HTMLInputTypeAttribute } from "react";
import classNames from "classnames";
import styles from "./Input.module.css";

type Props = {
  id?: string;
  name?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export function Input(props: Props) {
  return (
    <input
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      type={props.type}
      className={classNames(props.className, styles.input)}
      onChange={props.onChange}
    />
  );
}
