
import { useEffect, useState } from "react";
import { WonLossMsg } from "./WonLossMsg";
import styles from "./GameOutput.module.css";

interface WonLossMsgProps {
  wordArr: string[];
  guessedLettersArr: string[];
  count: number;
  userInput: string;
  hasWon: boolean;
  hasLost: boolean;
}

export function GameOutput({
  wordArr,
  guessedLettersArr,
  userInput,
  hasWon,
  hasLost,
}: WonLossMsgProps) {
  const [visibilityArr, setVisibilityArr] = useState<boolean[]>([]);

  //PROCESSED_WORD_DISPLAY
  useEffect(() => {
    const tempArr: boolean[] = [];
    wordArr.forEach((letter) => {
      if (guessedLettersArr.includes(letter)) {
        //console.log(`Letter ${letter} at index ${index} is revealed`);
        tempArr.push(true);
      } else {
        //console.log(`Letter ${letter} at index ${index} is hidden`);
        tempArr.push(false);
      }
    });
    setVisibilityArr(tempArr);
  }, [wordArr, userInput]);
  //console.log('visibilityArr:', visibilityArr);

  const processedWordArr = wordArr.map((letter, index) => {
    if (wordArr.length !== visibilityArr.length) {
    //   console.log(
    //     "Error, visibilityArr.length and wordArr.length do not match",
    //   );
      return;
    }
    if (visibilityArr[index] || letter === "-") {
      //console.log(`${letter} should be revealed`)
      return (
        <span key={index} className={styles.letter_display}>
          {letter}
        </span>
      );
    }
    if (!visibilityArr[index]) {
      //console.log(`${letter} should be hidden`)
      return (
        <span key={index} className={styles.letter_display} id={styles.hidden_letter}>
          {letter}
        </span>
      );
    }
  });
  //MESSAGE_TO_DISPLAY
  const messageToDisplay = () => {
    if (hasWon || hasLost) {
      return (
        <WonLossMsg
          hasLost={hasLost}
          hasWon={hasWon}
          guessedLettersArr={guessedLettersArr}
          wordArr={wordArr}
        />
      );
    } else {
      return processedWordArr;
    }
  };

  return <div className={styles.processedWordArr_div}>{messageToDisplay()}</div>;
}
