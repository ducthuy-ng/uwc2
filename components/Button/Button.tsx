import * as React from "react";
import { ReactNode } from "react";
import classNames from "classnames";
import styles from "./Button.module.css";

type Props = {
  id?: string;
  name?: string;
  className?: string;
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export function Button(props: Props) {
  return (
    <button
      id={props.id}
      name={props.name}
      type={props.type}
      className={classNames(props.className, styles.button)}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
