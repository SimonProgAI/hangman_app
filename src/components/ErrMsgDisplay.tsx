import { ErrMsgDisplayProps } from "./TS Interfaces/ErrMsgDisplay";

export function ErrMsgDisplay({errMsg1, errMsg2}: ErrMsgDisplayProps){
    return(
        <div className="errMsg">
            <span >{errMsg2}</span>
            <span >{errMsg1}</span>
          </div>
    )
}