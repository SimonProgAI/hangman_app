import { Button } from "../reusable ui_components/Button";
import ui_text from "../../messages/ui_text.json";
import { WordCreationProps } from "../../TS Interfaces/WordCreationProps";
import styles from "./WordCreationStyle.module.css";

export function RandomWord({onClickFunction,isDisabled,wordRef}: WordCreationProps){
    return(
        <div className={styles.randomWord_div}>
        <Button
          className={`${styles.randomWord_btn} ${styles. button}`}
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
          className={styles.numOfLetters_input}
        />
        <br />
      </div>
    )
}