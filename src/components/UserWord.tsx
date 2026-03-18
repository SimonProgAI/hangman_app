import { Button } from "./ui_components/Button";
import ui_text from "../messages/ui_text.json";
import { WordCreationProps } from "./TS Interfaces/WordCreationProps";

export function UserWord({
  onClickFunction,
  isDisabled,
  wordRef,
}: WordCreationProps) {
  return (
    <div className="userWord_div">
      <span>
        <Button
          onClick={onClickFunction}
          disabled={isDisabled}
          className={"userWord_btn button"}
          children={ui_text.userWordBtn}
        />
        <input
          type="password"
          ref={wordRef}
          disabled={isDisabled}
          placeholder={ui_text.userWordPlaceholder}
          className={"userWord_input"}
        ></input>
      </span>
    </div>
  );
}
