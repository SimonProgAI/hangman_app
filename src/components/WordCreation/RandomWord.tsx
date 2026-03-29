import { Button } from "../reusable ui_components/Button";
import ui_text from "../../messages/ui_text.json";
import { WordCreationProps } from "../../TS Interfaces/WordCreationProps";
import styles from "./WordCreationStyle.module.css";

export function RandomWord({
  onClickFunction,
  isDisabled,
  wordRef,
}: WordCreationProps) {
  const { randomWordBtn, randomWordPlaceholder } = ui_text;

  return (
    <div className={styles.randomWord_div}>
      <Button
        className={`${styles.randomWord_btn} ${styles.button}`}
        onClick={onClickFunction}
        disabled={isDisabled}
        children={randomWordBtn}
      />
      <input
        ref={wordRef}
        placeholder={randomWordPlaceholder}
        type="number"
        min="3"
        max="9"
        disabled={isDisabled}
        className={styles.numOfLetters_input}
      />
      {/* <br /> */}
    </div>
  );
}
