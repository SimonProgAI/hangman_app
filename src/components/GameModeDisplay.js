import { useRef, useState, useEffect, useMemo } from "react";
import LetterInputDisplay from "./LetterInputDisplay";
import HangmanStickfigure from "./HangmanStickFigure";
//TO-DO 
    //Return to initial state after GameOver/GameWon screen
    //Persistence before GameWon/GameOver screen (userWord, wordArr, count, guessedLetters, visibilityArr)
    //Restart button to replace the refresh button that clears out the sessionStorage.
    //HangmanStickfigure should not show traces of white limbs over black limbs

function GameModeDisplay(){
//USER_CREATED_WORD 
    const userWordRef = useRef();
    const errMsgRef2 = useRef();
    const [userWord, setUserWord] = useState("");
    const [errMsg2, setErrMsg2] = useState("");
    const [word, setWord] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    
    const createUserWord = ()=>{ 
        //console.log(`function createUserWord called`);
        const userWord = userWordRef.current.value;
        
        function hasOnlyLetters(word){
            return /^[a-zA-Z]+$/.test(word)
        }
        function hasOnlyLettersAndHyphen(word){
            return /^[a-zA-Z-]+$/.test(word)
        }
        if(userWord.length<1){
            setErrMsg2("Word must contain at least one letter.")
        }else if(userWord.includes("--")){
            setErrMsg2("Word cannot contain two consecutive hyphens.")
        }else if (userWord.startsWith("-")||userWord.endsWith("-")){
            setErrMsg2("Word cannot begin or end with an hyphen.")
        }else if (hasOnlyLetters(userWord)||hasOnlyLettersAndHyphen(userWord)){
            setUserWord(userWord);
            setIsDisabled(true)
        }else{
            setErrMsg2("Word must contain letters and can contain one hyphen.")
        }
        userWordRef.current.value="";
        setWord(userWord.toUpperCase());
        return userWord;
    }
    //console.log(`userWord is set to ${userWord}`);
    
//RANDOM_WORD_API
    const [randomWord, setRandomWord] = useState("");
    const randomWordLengthRef = useRef();
    const [errMsg1, setErrMsg1] = useState("");
    const errMsgRef1 = useRef();

    const handleRandomWord = () => {
        const randomWordLength = Number(randomWordLengthRef.current.value);
        if(randomWordLength<2||randomWordLength>16){
            setErrMsg1("The word must contain between 2 and 16 characters.")
        }else if (randomWordLength>1&&randomWordLength<17){
            setIsDisabled(true);
            const url = `https://random-word-api.herokuapp.com/word?length=${randomWordLength}`;
            const errorAlert = 'Something went wrong while fetching your request. Please try again.';
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const randomWord = data[0];
                    setRandomWord(randomWord);
                    setWord(randomWord.toUpperCase());
                })
                .catch((error)=>alert(errorAlert));
        }
        //console.log('function handleRandomWord called')
    }
    //console.log(`randomWord is set to ${randomWord}`);

//WORDARR
    let wordArr = useMemo(()=>word.split(''),[word]);
    //console.log(`word set to ${word}`)
    //console.log(wordArr);
//USER_INPUT    
    const [userInput, setUserInput] = useState("");
    const [count, setCount] = useState(0);
    const [guessedLetters, setGuessedLetters] = useState([]);
    
    const handleUserInput = (letter, index) => {
        
        setUserInput(letter);
        const upperCaseLetters = letter.toUpperCase()
       
        if(wordArr.includes(upperCaseLetters)===false){
            setCount(count+1);
        }else if(wordArr.includes(upperCaseLetters)===true){
             setGuessedLetters([...guessedLetters, upperCaseLetters]) 
        } 
        //console.log(`guessedLetters: ${guessedLetters}`)
        //console.log(`count is ${count+1}`); //count+1 is a workaround solution, maybe rework later
        //console.log(`function handleUserInput called`);
        //console.log(`userInput: ${letter}`);
    }
 

//SUCCESS/FAILURE
    const hasWon = wordArr.every(letter => guessedLetters.includes(letter)) ? true: false;
    const hasLost = count===6 ? true: false;
    const won_lossMsg = () => {
        if (hasWon===true&&guessedLetters.length!==0){
            return(
                <div>Success!</div>
            )
        }else if (hasLost===true){
            return(
                <div>Wrong! The word was "{wordArr.join("")}"</div>
            )
        }
    }
  
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
                <button onClick={handleRandomWord} disabled={isDisabled}>Random Word</button>
                <input ref={randomWordLengthRef} placeholder="letters" type="number" min="2" max="16" disabled={isDisabled}/><span ref={errMsgRef1}>{errMsg1}</span>
                </span>
            </div> 
            <div>
                <span>
                    <button onClick={createUserWord} disabled={isDisabled}>User Selected</button>
                    <input type="text" ref={userWordRef} disabled={isDisabled}></input><span ref={errMsgRef2}>{errMsg2}</span>
                </span>
            </div>
            <div>
                {processedWordArr}
            </div>
            <div>
                <LetterInputDisplay word={word} handleUserInput={handleUserInput} 
                guessedLetters={guessedLetters} userInput={userInput} 
                hasWon={hasWon} hasLost={hasLost} />
            </div>
            <div>
                {won_lossMsg()}
            </div>
            <div>
                <HangmanStickfigure count={count}/>
            </div>
        </div>
    )
};


export default GameModeDisplay;