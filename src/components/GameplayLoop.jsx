// 1. React
import { useRef, useState, useEffect, useMemo } from "react";
// 2. Project logic / utils
import { randomWordApiCall } from "../utils/randomWordApiCall";
import SoundEngine from "../utils/SoundEngine";
import { hasOnlyLettersAndHyphen } from "../utils/hasOnlyLettersAndHyphens";
// 3. Components
import { LetterInputDisplay } from "./LetterInputDisplay/LetterInputDisplay";
import { HangmanStickfigure } from "./HangmanStickFigure/HangmanStickFigure";
import { RandomWord } from "./WordCreation/RandomWord";
import { UserWord } from "./WordCreation/UserWord";
import { ResetGame } from "./WordCreation/ResetGame";
import { ErrMsgDisplay } from "./ErrMsgDisplay/ErrMsgDisplay";
import { GameOutput } from "./GameOutput/GameOutput";
// 4. Messages / content
import validMsg from "../messages/validation.json";
// 5. Assets
import wrongInputSound1 from "../audio/wrong-47985.mp3";
import correctInputSound1 from "../audio/soft-subtle-ui-pop-sfx-348820.mp3";
// 6. Styles
import styles from "./GameplayLoop.module.css";

export function GameplayLoop() {
  const {
    tooShortUser,
    doubleHyphen,
    noSpaces,
    hyphenEdges,
    invalidChars,
    failedFetch,
    tooShortRandom,
  } = validMsg;

  const randomWordLengthRef = useRef(0);
  const userWordRef = useRef(null);
  const [errMsg, setErrMsg] = useState("");
  const [word, setWord] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [count, setCount] = useState(0);
  const [guessedLettersArr, setGuessedLettersArr] = useState([]);
  const [wrongGuessesArr, setWrongGuessesArr] = useState([]);
  const [visibilityArr, setVisibilityArr] = useState([]);
  const { loadSoundFx, playSoundFx } = SoundEngine();
  const wrongInputSound = loadSoundFx(wrongInputSound1);
  const correctInputSound = loadSoundFx(correctInputSound1);

  //USER_WORD
  function createUserWord() {
    const userWord = userWordRef.current.value;
    if (userWord.length < 3 || userWord.length > 17) {
      setErrMsg(tooShortUser);
    } else if (userWord.includes("--")) {
      setErrMsg(doubleHyphen);
    } else if (userWord.includes(" ")) {
      setErrMsg(noSpaces);
    } else if (userWord.startsWith("-") || userWord.endsWith("-")) {
      setErrMsg(hyphenEdges);
    } else if (!hasOnlyLettersAndHyphen(userWord)) {
      setErrMsg(invalidChars);
    } else if (hasOnlyLettersAndHyphen(userWord)) {
      setWord(userWord.toUpperCase());
      setIsDisabled(true);
      setGuessedLettersArr([...guessedLettersArr, "-"]);
      setErrMsg("");
    }
    userWordRef.current.value = null;
  }
  //console.log(`userWord is set to ${userWord}`);
  // console.log("userWordRef: ", userWordRef);

  //RANDOM_WORD
  async function handleRandomWord() {
    const randomWordLength = Number(randomWordLengthRef.current.value);
    if (randomWordLength < 3 || randomWordLength > 9) {
      setErrMsg(tooShortRandom);
      return;
    }
    setIsDisabled(true);
    const fetchedWord = await randomWordApiCall(randomWordLength);
    if (!fetchedWord) {
      setErrMsg(failedFetch);
    }
    setWord(fetchedWord.toUpperCase());
    setErrMsg("");
    //console.log('function handleRandomWord called')
  }
  //console.log(`randomWord is set to ${randomWord}`);

  //WORDARR
  let wordArr = useMemo(() => {
    if (!word) {
      return [];
    } else if (word) {
      return word.split("");
    }
  }, [word]);
  // console.log("wordArr is", wordArr);

  //USER_INPUT
  function handleUserInput(letter) {
    setUserInput(letter);
    const upperCaseLetters = letter.toUpperCase();
    if (!wordArr.includes(upperCaseLetters)) {
      setCount(count + 1);
      setWrongGuessesArr([...wrongGuessesArr, upperCaseLetters]);
      playSoundFx(wrongInputSound);
    } else if (wordArr.includes(upperCaseLetters)) {
      setGuessedLettersArr([...guessedLettersArr, upperCaseLetters]);
      playSoundFx(correctInputSound);
    }
    //console.log('guessedLettersArr:', guessedLettersArr)
    //console.log(`count is ${count+1}`);
    //console.log(`userInput: ${letter}`);
  }

  //HASWON/HASLOST
  const hasWon = wordArr.every((letter) => guessedLettersArr.includes(letter))
    ? true
    : false;
  const hasLost = count === 6 ? true : false;

  //SESSION_STORAGE
  useEffect(() => {
    if (word && word.length > 0) {
      const gameState = {
        word,
        isDisabled,
        count,
        guessedLettersArr,
        wrongGuessesArr,
        visibilityArr,
      };
      sessionStorage.setItem("gameState", JSON.stringify(gameState));
      //console.logs
      /*console.log('sessionStorage on first load:', sessionStorage)
                console.log('gameState.word is', gameState.word);
                console.log('gameState.isDisabled is', gameState.isDisabled);
                console.log('gameState.count is', gameState.count);
                console.log('gameState.guessedLettersArr is', gameState.guessedLettersArr);
                console.log('gameState.wrongGuessesArr is', gameState.wrongGuessesArr);
                console.log('gameState.visibilityArr is', gameState.visibilityArr);*/
    }
  }, [word, isDisabled, count, guessedLettersArr, wrongGuessesArr]);

  useEffect(() => {
    const storedGameState = sessionStorage.getItem("gameState");
    if (storedGameState !== null) {
      const gameState = JSON.parse(storedGameState);
      setWord(gameState.word);
      setIsDisabled(gameState.isDisabled);
      setCount(gameState.count);
      setGuessedLettersArr(gameState.guessedLettersArr);
      setWrongGuessesArr(gameState.wrongGuessesArr);
      setVisibilityArr(gameState.visibilityArr);
      //console.logs
      /*console.log('retrieved word is', gameState.word);
                console.log('retrieved isDisabled is', gameState.isDisabled);
                console.log('retrieved count is', gameState.count);
                console.log('retrieved guessedLettersArr is', gameState.guessedLettersArr);
                console.log('retrieved wrongGuessesArr is', gameState.wrongGuessesArr);
                console.log('retrieved visibilityArr is', gameState.visibilityArr);
                console.log('sessionStorage on page reload:', sessionStorage);
                console.log('storedGameState on page reload:',storedGameState);
                */
    }
  }, []);

  //RESET_GAME
  function handleRestart() {
    sessionStorage.clear();
    setWord("");
    setIsDisabled(false);
    setCount(0);
    setGuessedLettersArr([]);
    setWrongGuessesArr([]);
    setVisibilityArr([]);
    setErrMsg("");
    randomWordLengthRef.current.value = "";
    //console.log(sessionStorage)
  }

  //FINAL_RENDERER
  return (
    <div className={styles.pageRenderer_div}>
      <div className={styles.top_container}>
        <div className={styles.button_container}>
          <RandomWord
            onClickFunction={handleRandomWord}
            isDisabled={isDisabled}
            wordRef={randomWordLengthRef}
          />
          <UserWord
            onClickFunction={createUserWord}
            isDisabled={isDisabled}
            wordRef={userWordRef}
          />
          <ResetGame onClickFunction={handleRestart} />
          <ErrMsgDisplay errMsg={errMsg} />
        </div>
      </div>
      <div className={styles.middle_container}>
        <GameOutput
          wordArr={wordArr}
          guessedLettersArr={guessedLettersArr}
          count={count}
          userInput={userInput}
          hasWon={hasWon}
          hasLost={hasLost}
        />
      </div>
      <div className={styles.bottom_container}>
        <LetterInputDisplay
          word={word}
          handleUserInput={handleUserInput}
          wrongGuessesArr={wrongGuessesArr}
          guessedLettersArr={guessedLettersArr}
          userInput={userInput}
          hasWon={hasWon}
          hasLost={hasLost}
        />
        <HangmanStickfigure count={count} />
      </div>
    </div>
  );
}
