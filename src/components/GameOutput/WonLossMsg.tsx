import validation from "../../messages/validation.json";
import styles from "./GameOutput.module.css";

interface WonLossMsgProps {
  wordArr: string[];
  guessedLettersArr: string[];
  hasWon: boolean;
  hasLost: boolean;
}

export function WonLossMsg({
  hasWon,
  hasLost,
  guessedLettersArr,
  wordArr,
}: WonLossMsgProps) {
  const { correctMsg, wrongMsg } = validation;

  if (hasWon && guessedLettersArr.length !== 0) {
    return (
      <div className={styles.hasWon_msg}>
        {correctMsg} "{wordArr.join("")}".
      </div>
    );
  } else if (hasLost) {
    return (
      <div className={styles.hasLost_msg}>
        {wrongMsg} "{wordArr.join("")}".
      </div>
    );
  }
}
