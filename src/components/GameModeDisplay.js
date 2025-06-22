import { useRef, useState, useEffect, useMemo } from "react";
import LetterInputDisplay from "./LetterInputDisplay";
import HangmanStickfigure from "./HangmanStickFigure";
import './components.css';
//TO-DO 
    //add a dictionary api to include meaning of the word on either haswon or haslost.
    //Render keyboard input dynamically (.map() or somethine else)
    //a message that tells the user to turn around while inputing user word
function GameModeDisplay(){

//VARIABLES
    const userWordRef = useRef();
    const errMsgRef2 = useRef();
    const [userWord, setUserWord] = useState("");
    const [errMsg2, setErrMsg2] = useState("");
    const [word, setWord] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [randomWord, setRandomWord] = useState("");
    const randomWordLengthRef = useRef();
    const [errMsg1, setErrMsg1] = useState("");
    const errMsgRef1 = useRef();
    const [userInput, setUserInput] = useState("");
    const [count, setCount] = useState(0);
    const [guessedLettersArr, setGuessedLettersArr] = useState([]);
    const [wrongGuessesArr, setWrongGuessesArr] = useState([]);
    const [visibilityArr, setVisibilityArr] = useState([]);

//USER_CREATED_WORD 
    const createUserWord = ()=>{ 
        const userWord = userWordRef.current.value;
        function hasOnlyLettersAndHyphen(word){
            return /^[a-zA-Z-]+$/.test(word)
        }
        if(userWord.length<2||userWord.length>17){
            setErrMsg2("Word must be between two(2) and seventeen(17) characters.")
        }else if(userWord.includes("--")){
            setErrMsg2("Word cannot contain two consecutive hyphens.")
        }else if (userWord.includes(" ")){
            setErrMsg2("Word cannot contain spaces.")
        }else if(userWord.startsWith("-")||userWord.endsWith("-")){
            setErrMsg2("Word cannot begin or end with an hyphen.")
        }else if(!hasOnlyLettersAndHyphen(userWord)){
            setErrMsg2("Word must contain letters and no more than one hyphen.")
        }else if(hasOnlyLettersAndHyphen(userWord)){
            setUserWord(userWord);
            setWord(userWord.toUpperCase());
            setIsDisabled(true)
            setGuessedLettersArr([...guessedLettersArr, "-"]);
            setErrMsg1("");
            setErrMsg2("");
        }
        userWordRef.current.value="";
        return userWord;
    }
    //console.log(`userWord is set to ${userWord}`);
    
//RANDOM_WORD_API
    const handleRandomWord = () => {
        const randomWordLength = Number(randomWordLengthRef.current.value);
        if(randomWordLength<2||randomWordLength>16){
            setErrMsg1("The word must contain between 2 and 16 characters.")
        }else if (randomWordLength>1&&randomWordLength<17){
            setIsDisabled(true);
            const url = `https://random-word-api.herokuapp.com/word?length=${randomWordLength}`;
            fetch(url)
                .then(response => {
                    if(!response.ok){
                        throw new Error(`HTTP error! status: ${response.status}`)
                    }
                    return response.json()
                })
                .then(data => {
                    const randomWord = data[0];
                    setRandomWord(randomWord);
                    setWord(randomWord.toUpperCase());
                    setErrMsg1("");
                    setErrMsg2("");
                })
                .catch((error)=>alert('Error fetching data:', error));
        }
        //console.log('function handleRandomWord called')
    }
    //console.log(`randomWord is set to ${randomWord}`);

//WORDARR
    let wordArr = useMemo(()=>{
        if(!word){
            return [];
        }else if (word){
            return word.split('');
        };
    },[word]);
    //console.log('wordArr is', wordArr);

//USER_INPUT    
    const handleUserInput = (letter, index) => {
        setUserInput(letter);
        const upperCaseLetters = letter.toUpperCase();
        
        if(!wordArr.includes(upperCaseLetters)){
            setCount(count+1);
            setWrongGuessesArr([...wrongGuessesArr, upperCaseLetters]);
        }else if(wordArr.includes(upperCaseLetters)){
            setGuessedLettersArr([...guessedLettersArr, upperCaseLetters]) 
        }
        //console.log('guessedLettersArr:', guessedLettersArr)
        //console.log(`count is ${count+1}`);
        //console.log(`userInput: ${letter}`);
    }

//HASWON/HASLOST
    const hasWon = wordArr.every(letter => guessedLettersArr.includes(letter)) ? true: false;
    const hasLost = count===6 ? true: false;
    const won_lossMsg = () => {
        if (hasWon===true&&guessedLettersArr.length!==0){
            return(
                <div className="hasWon_msg">Success!</div>
            )
        }else if (hasLost===true){
            return(
                <div className="hasLost_msg" >Wrong! The word was "{wordArr.join("")}".</div>
            )
        }
    }

//WORD_DISPLAY
    useEffect(()=>{
        let tempVisibilityArr = [];
        wordArr.forEach((letter, index) => {
            if(guessedLettersArr.includes(letter)){
                //console.log(`Letter ${letter} at index ${index} is revealed`);
                tempVisibilityArr.push(true)
            }else{
                //console.log(`Letter ${letter} at index ${index} is hidden`);
                tempVisibilityArr.push(false)
            }
        });
        setVisibilityArr(tempVisibilityArr);
    },[wordArr, userInput]);
    //console.log('visibilityArr:', visibilityArr);
    
    let processedWordArr = wordArr.map((letter,index)=>{
        
        if(wordArr.length!==visibilityArr.length){
            console.log('Error, visibilityArr.length and wordArr.length do not match')
        }
        if (visibilityArr[index]||letter==='-'){
            //console.log(`${letter} should be revealed`)
            return <span key={index} style={{visibility: 'visible'}}>{letter}</span> 
        }
        if (!visibilityArr[index]){
            //console.log(`${letter} should be hidden`)
            return <span key={index} style={{visibility: 'hidden'}}>{letter}</span>
        }
    });

//SESSION_STORAGE
    useEffect(()=>{
        if(word && word.length>0){
            const gameState = {word, isDisabled, count, guessedLettersArr, wrongGuessesArr, visibilityArr}; 
            sessionStorage.setItem('gameState', JSON.stringify(gameState));
            //console.logs
                /*console.log('sessionStorage on first load:', sessionStorage)
                console.log('gameState.word is', gameState.word);
                console.log('gameState.isDisabled is', gameState.isDisabled);
                console.log('gameState.count is', gameState.count);
                console.log('gameState.guessedLettersArr is', gameState.guessedLettersArr);
                console.log('gameState.wrongGuessesArr is', gameState.wrongGuessesArr);
                console.log('gameState.visibilityArr is', gameState.visibilityArr);*/
            
        }
    },[word, isDisabled, count, guessedLettersArr, wrongGuessesArr])

    useEffect(()=>{
        const storedGameState = sessionStorage.getItem('gameState');
        
        if(storedGameState!==null){
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
    },[])

//RESET_GAME
    const handleRestart = () => {
        sessionStorage.clear();
        setWord("");
        setIsDisabled(false);
        setCount(0);
        setGuessedLettersArr([]);
        setWrongGuessesArr([]);
        setVisibilityArr([]);
        //console.log(sessionStorage)
    }

//FINAL_RENDERER
    return(
        <div className="pageRenderer_div">
            <div className="resetGame_btn_div">
                <button onClick={handleRestart} className="resetGame_btn">Reset Game</button>
            </div>
            <div className="randomWord_div">
                <span>
                    <button onClick={handleRandomWord} disabled={isDisabled} className="gameMode_btn">Random Word</button>
                    <input ref={randomWordLengthRef} placeholder="letters" type="number" min="2" max="16" 
                        disabled={isDisabled} className="numOfLetters_input"/>
                    <span ref={errMsgRef1} className="errMsg">{errMsg1}</span>
                </span>
            </div> 
            <div className="userWord_div">
                <span>
                    <button onClick={createUserWord} disabled={isDisabled} className="gameMode_btn">User Selected</button>
                    <input type="text" ref={userWordRef} disabled={isDisabled} className="userWord_input"></input>
                    <span ref={errMsgRef2} className="errMsg">{errMsg2}</span>
                </span>
            </div>
            <div className="processedWordArr_div">
                {processedWordArr}
            </div>
            <div className="letterInputDisplay_div">
                <LetterInputDisplay word={word} handleUserInput={handleUserInput} wrongGuessesArr={wrongGuessesArr} 
                guessedLettersArr={guessedLettersArr} userInput={userInput} 
                hasWon={hasWon} hasLost={hasLost} />
            </div>
            <div className="won_lossMsg_div">
                {won_lossMsg()}
            </div>
            <div className="hangmanStickFigure_div">
                <HangmanStickfigure count={count}/>
            </div>
        </div>
    )
};

export default GameModeDisplay;