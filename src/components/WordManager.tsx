import { Button } from "./ui_components/Button";
import ui_text from "../messages/ui_text.json";

interface WordManagerProps {
  handleRandomWord: ()=> void;
  isDisabled: boolean;
  randomWordLengthRef: React.RefObject<HTMLInputElement>|undefined,
  createUserWord: ()=> void,
  userWordRef: React.RefObject<HTMLInputElement>,
  handleRestart: () => void,
  errMsgRef2: React.RefObject<HTMLInputElement>,
  errMsg2: string,
  errMsgRef1: React.RefObject<HTMLInputElement>,
  errMsg1: string,
}

export const WordManager: React.FC<WordManagerProps> =({
  handleRandomWord,
  isDisabled,
  randomWordLengthRef,
  createUserWord,
  userWordRef,
  handleRestart,
  errMsgRef2,
  errMsg2,
  errMsgRef1,
  errMsg1,
}) =>{
  return (
    <div className="button_container">
      <div className="randomWord_div">
        <Button
          className={"randomWord_btn button"}
          onClick={handleRandomWord}
          disabled={isDisabled}
          children={ui_text.randomWordBtn}
        />
        <input
          ref={randomWordLengthRef}
          placeholder={ui_text.randomWordPlaceholder}
          type="number"
          min="3"
          max="9"
          disabled={isDisabled}
          className="numOfLetters_input"
        />
        <br />
      </div>
      <div className="userWord_div">
        <span>
          <Button
            onClick={createUserWord}
            disabled={isDisabled}
            className="userWord_btn button"
            children={ui_text.userWordBtn}
          />
          <input
            type="text"
            ref={userWordRef}
            disabled={isDisabled}
            placeholder="enter a word..."
            className="userWord_input"
          ></input>
        </span>
      </div>
      <div className="resetGame_btn_div">
        <Button
          onClick={handleRestart}
          className="resetGame_btn button"
          children={ui_text.resetGameBtn}
        />
      </div>
      <div className="errMsg">
        <span ref={errMsgRef2}>{errMsg2}</span>
        <span ref={errMsgRef1}>{errMsg1}</span>
      </div>
    </div>
  );
}
