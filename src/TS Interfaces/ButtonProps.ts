export interface ButtonProps {
  className: string;
  disabled?: boolean;
  onClick: () => void;
  children:React.ReactNode;
  style?: string;
}