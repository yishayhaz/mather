import React from "react";
import { Link, LinkProps } from "react-router-dom";
import styles from "./style.module.scss";

export type ButtonProps = {
  size?: "sm" | "md" | "lg";
  active?: boolean;
} & ButtonTypes;

export type ButtonTypes =
  | React.HTMLAttributes<HTMLButtonElement>
  | LinkProps
  | React.LinkHTMLAttributes<HTMLLinkElement>;

export function Button({
  className,
  size = "md",
  active,
  ...rest
}: ButtonProps) {
  if ("to" in rest)
    return (
      <Link
        {...rest}
        className={`${styles.btn} ${className}`}
        data-size={size}
        data-active={active}
      />
    );

  if ("href" in rest)
    return (
      <a
        {...(rest as React.HTMLAttributes<HTMLAnchorElement>)}
        className={`${styles.btn} ${className}`}
        data-size={size}
        data-active={active}
      />
    );

  return (
    <button
      {...(rest as React.HTMLAttributes<HTMLButtonElement>)}
      className={`${styles.btn} ${className}`}
      data-size={size}
      data-active={active}
    />
  );
}
