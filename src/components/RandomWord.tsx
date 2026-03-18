import { Button } from "./ui_components/Button";
import ui_text from "../messages/ui_text.json";

interface WordCreationProps{
    handleRandomWord: ()=> void;
    isDisabled: boolean;
    randomWordLengthRef: React.RefObject<HTMLInputElement>;
}
export function RandomWord({handleRandomWord,isDisabled,randomWordLengthRef}: WordCreationProps){
    return(
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
    )
}