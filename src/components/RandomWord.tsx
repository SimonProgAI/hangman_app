import { Button } from "./ui_components/Button";
import ui_text from "../messages/ui_text.json";
import { WordCreationProps } from "./TS Interfaces/WordCreationProps";

export function RandomWord({onClickFunction,isDisabled,wordRef}: WordCreationProps){
    return(
        <div className="randomWord_div">
        <Button
          className={"randomWord_btn button"}
          onClick={onClickFunction}
          disabled={isDisabled}
          children={ui_text.randomWordBtn}
        />
        <input
          ref={wordRef}
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