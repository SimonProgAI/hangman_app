interface Props {
  className: string;
  disabled?: boolean;
  onClick: () => void;
  children:React.ReactNode;
  style?: string;
}

export const Button: React.FC<Props> = ({ className, disabled, onClick, children }) => {
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
    >{children}</button>
  );
};
