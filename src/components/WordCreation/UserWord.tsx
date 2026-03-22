import { Button } from "../reusable ui_components/Button";
import ui_text from "../../messages/ui_text.json";
import { WordCreationProps } from "../../TS Interfaces/WordCreationProps";
import styles from "./WordCreationStyle.module.css";
// import "./components.css";
export function UserWord({
  onClickFunction,
  isDisabled,
  wordRef,
}: WordCreationProps) {
  return (
    <div className={styles.userWord_div}>
      <span>
        <Button
          onClick={onClickFunction}
          disabled={isDisabled}
          className={`${styles.userWord_btn} ${styles.button}`}
          children={ui_text.userWordBtn}
        />
        <input
          type="password"
          ref={wordRef}
          disabled={isDisabled}
          placeholder={ui_text.userWordPlaceholder}
          className={styles.userWord_input}
        ></input>
      </span>
    </div>
  );
}
