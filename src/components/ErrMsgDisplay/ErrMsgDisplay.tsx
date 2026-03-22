import styles from "./ErrMsgDisplay.module.css";

type ErrMsg = React.ReactNode;
export interface ErrMsgDisplayProps {
    errMsg1:  ErrMsg;
    errMsg2: ErrMsg;
}

export function ErrMsgDisplay({errMsg1, errMsg2}: ErrMsgDisplayProps){
    return(
        <div className={styles.errMsg}>
            <span >{errMsg2}</span>
            <span >{errMsg1}</span>
          </div>
    )
}