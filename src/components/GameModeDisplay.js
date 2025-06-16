//import react from "react";
import { useRef, useState, useEffect, useMemo } from "react";
import LetterInputDisplay from "./LetterInputDisplay";
import HangmanStickfigure from "./HangmanStickFigure";
//**no empty strings
//**no digits in userWord
//**no space in userWord
//**no consecutive hyphens in userWords
//hyphens may not begin or end the word
//hyphens are always visible
//**userWord disapears from input box when created
//**no userInput before userWord is created
//**no userInput after word is fully guessed
//**no userInput after 6 wrong guesses
//HangmanStickfigure should not show traces of white limbs over black limbs 
//GameWon Screen if word fully guessed in less than 6 guesses
//GameOver Screen after 6 wrong guesses
//GameOver Screen displays the Word
//Return to initial state after GameOver/GameWon screen
//Persistence before GameWon/GameOver screen

function GameModeDisplay(){
//USER_CREATED_WORD 
    const userWordRef = useRef();
    const errMsgRef = useRef();
    const [userWord, setUserWord] = useState("");
    const [errMsg, setErrMsg] = useState("");
    
    
    const createUserWord = ()=>{ 
        const userWord = userWordRef.current.value;
        function hasOnlyLetters(word){
            return /^[a-zA-Z]+$/.test(word)
        }
        function hasOnlyLettersAndHyphen(word){
            return /^[a-zA-Z-]+$/.test(word)
        }
        if(userWord.length<1){
            setErrMsg("Word must contain at least one letter.")
        }else if(userWord.includes("--")){
            setErrMsg("Word cannot contain two consecutive hyphens.")
        }else if (hasOnlyLetters(userWord)||hasOnlyLettersAndHyphen(userWord)){
            setUserWord(userWord.toUpperCase());
        }else{
            setErrMsg("Word must contain letters and can contain one hyphen.")
        }
        
        userWordRef.current.value= "";
        //console.log(`function createUserWord called`);
        return userWord;
    }
    //console.log(`userWord set to ${userWord}`);

    let wordArr = useMemo(()=>userWord.split(''),[userWord]);
    console.log(wordArr);
    
//USER_INPUT    
    const [userInput, setUserInput] = useState("");
    const [count, setCount] = useState(0);
    const [guessedLetters, setGuessedLetters] = useState([]);
    
    const handleUserInput = (letter, index) => {
        
        setUserInput(letter);
       
        if(wordArr.includes(letter)===false){
            setCount(count+1);
        }else if(wordArr.includes(letter)===true){
            setGuessedLetters([...guessedLetters, letter])
        }
        console.log(`guessedLetters: ${guessedLetters}`)
        //console.log(`count is ${count+1}`); //count+1 is a workaround solution, maybe rework later
        //console.log(`function handleUserInput called`);
        //console.log(`userInput: ${letter}`);
    }

    const hasWon = wordArr.every(letter => guessedLetters.includes(letter)) ? true: false;

    
  
//WORD_DISPLAY
    
    const [visibilityArr, setVisibilityArr] = useState([]);

    useEffect(()=>{
        let tempVisibilityArr = [];
        wordArr.forEach((letter, index) => {
            if(guessedLetters.includes(letter)){
                //console.log(`Letter ${letter} at index ${index} is revealed`);
                tempVisibilityArr.push(true)
            }else{
                //console.log(`Letter ${letter} at index ${index} is hidden`);
                tempVisibilityArr.push(false)
            }
        });
        setVisibilityArr(tempVisibilityArr);
    },[wordArr, userInput]);
    
    //console.log(`visibilityArr:${visibilityArr}`);
    
    let processedWordArr = wordArr.map((letter,index)=>{
        
        if(wordArr.length!==visibilityArr.length){
            //console.log('Error, visibilityArr.length and wordArr.length do not match')
        }
        if (visibilityArr[index]===true){
            //console.log(`${letter} should be revealed`)
            return <span style={{visibility: 'visible'}}>{letter}</span> 
        }
        if (visibilityArr[index]===false){
            //console.log(`${letter} should be hidden`)
            return <span style={{visibility: 'hidden'}}>{letter}</span>
        }
    });

    return(
        <div>
            <div>
                <span>
                    <button onClick={createUserWord}>User Selected</button>
                    <input type="text" ref={userWordRef}></input><span ref={errMsgRef}>{errMsg}</span>
                </span>
            </div>
            <div>
                {processedWordArr}
            </div>
            <div>
                <LetterInputDisplay userWord={userWord} handleUserInput={handleUserInput} guessedLetters={guessedLetters} count={count} userInput={userInput} hasWon={hasWon} />
            </div>
            <div>
                <HangmanStickfigure count={count}/>
            </div>
        </div>
    )
};


export default GameModeDisplay;