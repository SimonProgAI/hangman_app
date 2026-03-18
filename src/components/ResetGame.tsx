import { Button } from "./ui_components/Button";
import ui_text from "../messages/ui_text.json";
import { ResetGameProps } from "./TS Interfaces/ResetGameProps";

export function ResetGame({ onClickFunction }: ResetGameProps) {
  return (
    <div className="resetGame_btn_div">
      <Button
        onClick={onClickFunction}
        className={"resetGame_btn button"}
        children={ui_text.resetGameBtn}
      />
    </div>
  );
}
