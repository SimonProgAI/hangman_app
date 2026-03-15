import "./components.css";
import { keyboardArr} from "./utils/keyboardArr";


const LetterInputDisplay = ({
  word,
  handleUserInput,
  wrongGuessesArr,
  guessedLettersArr,
  hasWon,
  hasLost,
}) => {
  

  let letterColor;

  const btnInput = keyboardArr.map((rowArr, index) => {
    const btnRows1_3 = rowArr.map((btn, index) => {
      function keyboardStatus() {
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
          <button
            onClick={() => handleUserInput(btn.letter)}
            disabled={keyboardStatus()}
            style={letterColor}
            className="indv_btns"
          >
            {btn.letter}
          </button>
        </span>
      );
    });

    return (
      <div key={index} className="btnRows_div">
        {btnRows1_3}
      </div>
    );
  });

  return <div className="btnInput_div">{btnInput}</div>;
};

export default LetterInputDisplay;
