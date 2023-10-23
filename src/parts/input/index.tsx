import React from "react";
import styles from "./style.module.scss";

export type InputProps = React.HTMLAttributes<HTMLInputElement>;

export function Input({ className, ...rest }: InputProps) {
  return <input className={`${styles.input} ${className}`} {...rest} />;
}
