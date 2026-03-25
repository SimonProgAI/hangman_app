import { useState } from "react";
import { Button } from "../reusable ui_components/Button";
import ui_text from "../../messages/ui_text.json";
import { WordCreationProps } from "../../TS Interfaces/WordCreationProps";
import styles from "./WordCreationStyle.module.css";

export function UserWord({
  onClickFunction,
  isDisabled,
  wordRef,
}: WordCreationProps) {
  const {
    showWord,
    passwordType,
    textType,
    hideWord,
    userWordBtn,
    userWordPlaceholder,
  } = ui_text;
  const [type, setType] = useState<string>(passwordType);
  const [showHideBtn, setShowHideBtn] = useState<string>(showWord);

  function handleToggle(): void {
    if (type === passwordType) {
      setType(textType);
      setShowHideBtn(hideWord);
    } else if (type === textType) {
      setType(passwordType);
      setShowHideBtn(showWord);
    }
  }

  return (
    <div className={styles.userWord_div}>
      <span>
        <Button
          onClick={onClickFunction}
          disabled={isDisabled}
          className={`${styles.userWord_btn} ${styles.button}`}
          children={userWordBtn}
        />
        <input
          type={type}
          ref={wordRef}
          disabled={isDisabled}
          placeholder={userWordPlaceholder}
          className={styles.userWord_input}
        ></input>
        <Button
          onClick={handleToggle}
          disabled={isDisabled}
          className={styles.revealWord_btn}
          children={showHideBtn}
        />
      </span>
    </div>
  );
}

