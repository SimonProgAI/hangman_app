import validation from "../../messages/validation.json"
import styles from "./GameOutput.module.css";

interface WonLossMsgProps {
  wordArr: string[];
  guessedLettersArr: string[];
  hasWon: boolean;
  hasLost: boolean;
}

export function WonLossMsg({hasWon, hasLost, guessedLettersArr, wordArr}: WonLossMsgProps){
    if (hasWon && guessedLettersArr.length !== 0) {
      return (
        <div className={styles.hasWon_msg}>
          {validation.correctMsg} "{wordArr.join("")}".
        </div>
      );
    } else if (hasLost) {
      return (
        <div className={styles.hasLost_msg}>
          {validation.wrongMsg} "{wordArr.join("")}".
        </div>
      );
    }
  };