import { useRef, useState, useEffect, useMemo } from "react";
import { WordManager } from "./WordManager";
import { Button } from "./ui_components/Button";
import validMsg from "../messages/validation.json";
import SoundEngine from "./utils/SoundEngine";
import { LetterInputDisplay } from "./LetterInputDisplay";
import { HangmanStickfigure } from "./HangmanStickFigure";
import wrongInputSound1 from "../audio/wrong-47985.mp3";
import correctInputSound1 from "../audio/soft-subtle-ui-pop-sfx-348820.mp3";
import { hasOnlyLettersAndHyphen } from "./utils/hasOnlyLettersAndHyphens";
import { RandomWord } from "./RandomWord";

/* import "./components.css"; */

export function GameplayLoop() {
  //VARIABLES

  const randomWordLengthRef = useRef(0);
  const userWordRef = useRef("");
  const errMsgRef1 = useRef("");
  const errMsgRef2 = useRef("");
  const [randomWord, setRandomWord] = useState("");
  const [userWord, setUserWord] = useState("");
  const [errMsg1, setErrMsg1] = useState("");
  const [errMsg2, setErrMsg2] = useState("");
  //const [errMsg3, setErrMsg3] = useState("");
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
  const createUserWord = () => {
    const userWord = userWordRef.current.value;
    if (userWord.length < 2 || userWord.length > 17) {
      setErrMsg2(validMsg.tooShortUser);
    } else if (userWord.includes("--")) {
      setErrMsg2(validMsg.doubleHyphen);
    } else if (userWord.includes(" ")) {
      setErrMsg2(validMsg.noSpaces);
    } else if (userWord.startsWith("-") || userWord.endsWith("-")) {
      setErrMsg2(validMsg.hyphenEdges);
    } else if (!hasOnlyLettersAndHyphen(userWord)) {
      setErrMsg2(validMsg.invalidChars);
    } else if (hasOnlyLettersAndHyphen(userWord)) {
      setUserWord(userWord);
      setWord(userWord.toUpperCase());
      setIsDisabled(true);
      setGuessedLettersArr([...guessedLettersArr, "-"]);
      setErrMsg1("");
      setErrMsg2("");
    }
    userWordRef.current.value = "";
    return userWord;
  };
  //console.log(`userWord is set to ${userWord}`);

  //RANDOM_WORD_API
  const handleRandomWord = () => {
    const randomWordLength = Number(randomWordLengthRef.current.value);
    if (randomWordLength < 3 || randomWordLength > 9) {
      setErrMsg1(validMsg.tooShortRandom);
    } else if (randomWordLength > 1 && randomWordLength < 17) {
      setIsDisabled(true);
      const url = `https://random-word-api.herokuapp.com/word?length=${randomWordLength}`;
      const url2 = `https://random-word-api.vercel.app/api?words=1&length=${randomWordLength}`;
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const randomWord = data[0];
          setRandomWord(randomWord);
          setWord(randomWord.toUpperCase());
          setErrMsg1("");
          setErrMsg2("");
        })
        .catch((error) => alert("Error fetching data:", error));
    }
    //console.log('function handleRandomWord called')
  };
  //console.log(`randomWord is set to ${randomWord}`);

  //WORDARR
  let wordArr = useMemo(() => {
    if (!word) {
      return [];
    } else if (word) {
      return word.split("");
    }
  }, [word]);
  //console.log('wordArr is', wordArr);

  //USER_INPUT
  const handleUserInput = (letter, index) => {
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
  };

  //HASWON/HASLOST
  const hasWon = wordArr.every((letter) => guessedLettersArr.includes(letter))
    ? true
    : false;
  const hasLost = count === 6 ? true : false;
  const won_lossMsg = () => {
    if (hasWon === true && guessedLettersArr.length !== 0) {
      return (
        <div className="hasWon_msg">
          Correct! The word was "{wordArr.join("")}".
        </div>
      );
    } else if (hasLost === true) {
      return (
        <div className="hasLost_msg">
          Wrong! The word was "{wordArr.join("")}".
        </div>
      );
    }
  };

  //PROCESSED_WORD_DISPLAY
  useEffect(() => {
    let tempVisibilityArr = [];
    wordArr.forEach((letter, index) => {
      if (guessedLettersArr.includes(letter)) {
        //console.log(`Letter ${letter} at index ${index} is revealed`);
        tempVisibilityArr.push(true);
      } else {
        //console.log(`Letter ${letter} at index ${index} is hidden`);
        tempVisibilityArr.push(false);
      }
    });
    setVisibilityArr(tempVisibilityArr);
  }, [wordArr, userInput]);
  //console.log('visibilityArr:', visibilityArr);

  let processedWordArr = wordArr.map((letter, index) => {
    if (wordArr.length !== visibilityArr.length) {
      //console.log('Error, visibilityArr.length and wordArr.length do not match')
    }
    if (visibilityArr[index] || letter === "-") {
      //console.log(`${letter} should be revealed`)
      return (
        <span key={index} className="letter_display">
          {letter}
        </span>
      );
    }
    if (!visibilityArr[index]) {
      //console.log(`${letter} should be hidden`)
      return (
        <span key={index} className="letter_display" id="hidden_letter">
          {letter}
        </span>
      );
    }
  });
  //MESSAGE_TO_DISPLAY
  const messageToDisplay = () => {
    if (hasWon || hasLost) {
      return won_lossMsg();
    } else {
      return processedWordArr;
    }
  };
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
  const handleRestart = () => {
    sessionStorage.clear();
    setWord("");
    setIsDisabled(false);
    setCount(0);
    setGuessedLettersArr([]);
    setWrongGuessesArr([]);
    setVisibilityArr([]);
    setErrMsg1("");
    setErrMsg2("");
    //setErrMsg3("");
    randomWordLengthRef.current.value = "";
    //console.log(sessionStorage)
  };

  //FINAL_RENDERER
  return (
    <div className="pageRenderer_div">
      <div className="top_container">
        {/*<div className="errMsg3">{errMsg3}</div>*/}

        <div className="button_container">
          <RandomWord
            handleRandomWord={handleRandomWord}
            isDisabled={isDisabled}
            randomWordLengthRef={randomWordLengthRef}
          />
          <div className="userWord_div">
            <span>
              <button
                onClick={createUserWord}
                disabled={isDisabled}
                className="userWord_btn button"
              >
                User Word
              </button>
              <input
                type="text"
                ref={userWordRef}
                disabled={isDisabled}
                placeholder="enter a word..."
                className="userWord_input"
              ></input>
            </span>
          </div>
          <div className="resetGame_btn_div">
            <button onClick={handleRestart} className="resetGame_btn button">
              Reset Game
            </button>
          </div>
          <div className="errMsg">
            <span ref={errMsgRef2}>{errMsg2}</span>
            <span ref={errMsgRef1}>{errMsg1}</span>
          </div>
        </div>
      </div>
      <div className="middle_container">
        <div className="processedWordArr_div">{messageToDisplay()}</div>
      </div>
      <div className="bottom_container">
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
