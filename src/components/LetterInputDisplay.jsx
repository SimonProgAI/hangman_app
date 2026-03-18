import { keyboardArr } from "./utils/keyboardArr";
import { Button } from "./ui_components/Button";
import "./components.css";
import styles from "./LetterInputDisplay.module.css";

export const LetterInputDisplay = ({
  word,
  handleUserInput,
  wrongGuessesArr,
  guessedLettersArr,
  hasWon,
  hasLost,
}) => {
  
let letterColor;
  const btnInput = keyboardArr.map((rowArr, index) => {
    const btnRows1_3 = rowArr.map((btn) => {
      function keyState() {
        
        if (word === "" || hasLost === true || hasWon === true) {
          return true;
        } else if (wrongGuessesArr.includes(btn.letter)) {
          letterColor = { color: "red" };
          return true;
        } else if (guessedLettersArr.includes(btn.letter)) {
          letterColor = { color: "green" };
          return true;
        } else {
          letterColor = { color: "black" };
          return guessedLettersArr.includes(btn.letter);
        }
      }
      return (
        <span key={btn.id}>
          <Button
            onClick={() => handleUserInput(btn.letter)}
            disabled={keyState()}
            style={letterColor}
            className={styles.indv_btns}
            children={btn.letter}
          />
        </span>
      );
    });

    return (
      <div key={index} className={styles.btnRows_div}>
        {btnRows1_3}
      </div>
    );
  });

  return <div className={styles.btnInput_div}>{btnInput}</div>;
};
