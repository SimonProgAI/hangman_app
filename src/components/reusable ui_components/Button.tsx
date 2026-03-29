import { ButtonProps } from "../../TS Interfaces/ButtonProps";

export function Button({
  className,
  disabled,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
