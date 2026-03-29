import { Button } from "../reusable ui_components/Button";
import ui_text from "../../messages/ui_text.json";
import styles from "./WordCreationStyle.module.css";

export interface ResetGameProps{
    onClickFunction: () => void;
}

export function ResetGame({ onClickFunction }: ResetGameProps) {
  const {resetGameBtn} = ui_text;
  return (
    <div className={styles.resetGame_btn_div}>
      <Button
        onClick={onClickFunction}
        className={`${styles.resetGame_btn} ${styles.button}`}
        children={resetGameBtn}
      />
    </div>
  );
}
