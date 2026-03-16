interface Props {
  buttonText: string,
  className: string,
  disabled: boolean,
  onClick: () => void
}

export const Button:React.FC<Props> = ({ buttonText, className, disabled, onClick }) => {
  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {buttonText}
    </button>
  );
}
