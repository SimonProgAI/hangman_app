import styles from "./ErrMsgDisplay.module.css";

type ErrMsg = React.ReactNode;
export interface ErrMsgDisplayProps {
  errMsg: ErrMsg;
}

export function ErrMsgDisplay({ errMsg }: ErrMsgDisplayProps) {

    
  return (
    <div className={styles.errMsg}>
      <span>{errMsg}</span>
    </div>
  );
}
