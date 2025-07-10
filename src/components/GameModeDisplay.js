import { useRef, useState, useEffect, useMemo } from "react";
import SoundEngine from "./SoundEngine";
import LetterInputDisplay from "./LetterInputDisplay";
import HangmanStickfigure from "./HangmanStickFigure";
import wrongInputSound1 from "C:/Workspace/hangman_app/src/components/audio/wrong-47985.mp3";
import correctInputSound1 from "C:/Workspace/hangman_app/src/components/audio/soft-subtle-ui-pop-sfx-348820.mp3";
import githubLogo from 'C:/Workspace/hangman_app/src/components/images/github-mark.svg';
import linkedinLogo from 'C:/Workspace/hangman_app/src/components/images/LinkedIn_icon.svg';
import emailLogo from 'C:/Workspace/hangman_app/src/components/images/envelope-svgrepo-com.svg';
import './components.css';

function GameModeDisplay(){
//VARIABLES
    const pageTitleString = "HANGMAN";
    const pageTitleArr = pageTitleString.split(''); 
    const randomWordLengthRef = useRef();
    const userWordRef = useRef();
    const errMsgRef1 = useRef();
    const errMsgRef2 = useRef();
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
    const {loadSoundFx, playSoundFx} = SoundEngine();
    const wrongInputSound = loadSoundFx(wrongInputSound1);
    const correctInputSound = loadSoundFx(correctInputSound1);

    
//TITLE
    const processedPageTitleArr = pageTitleArr.map((letter, index)=>{
        return(
            <span className="title" key={index}>{letter}</span>
        )
    })

//USER_WORD 
    const createUserWord = ()=>{ 
        const userWord = userWordRef.current.value;
        function hasOnlyLettersAndHyphen(word){
            return /^[a-zA-Z-]+$/.test(word)
        }
        if(userWord.length<2||userWord.length>17){
            setErrMsg2("User Word must be between 2 and 17 characters.")
        }else if(userWord.includes("--")){
            setErrMsg2("User Word cannot contain two consecutive hyphens.")
        }else if (userWord.includes(" ")){
            setErrMsg2("User Word cannot contain spaces.")
        }else if(userWord.startsWith("-")||userWord.endsWith("-")){
            setErrMsg2("User Word cannot begin or end with an hyphen.")
        }else if(!hasOnlyLettersAndHyphen(userWord)){
            setErrMsg2("User Word must contain letters and no more than one hyphen.")
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
        if(randomWordLength<2||randomWordLength>9){
            setErrMsg1(" Random Word must be between 2 and 9 characters.")
        }else if (randomWordLength>1&&randomWordLength<17){
            setIsDisabled(true);
            //const url = `https://random-word-api.herokuapp.com/word?length=${randomWordLength}`;
            const url2 = `https://random-word-api.vercel.app/api?words=1&length=${randomWordLength}`;
            fetch(url2)
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
            playSoundFx(wrongInputSound);

        }else if(wordArr.includes(upperCaseLetters)){
            setGuessedLettersArr([...guessedLettersArr, upperCaseLetters])
           playSoundFx(correctInputSound); 
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
                <div className="hasWon_msg">Correct! The word was "{wordArr.join("")}".</div>
            )
        }else if (hasLost===true){
            return(
                <div className="hasLost_msg" >Wrong! The word was "{wordArr.join("")}".</div>
            )
        }
    }

//PROCESSED_WORD_DISPLAY
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
            //console.log('Error, visibilityArr.length and wordArr.length do not match')
        }
        if (visibilityArr[index]||letter==='-'){
            //console.log(`${letter} should be revealed`)
            return <span key={index} className="letter_display">{letter}</span> 
        }
        if (!visibilityArr[index]){
            //console.log(`${letter} should be hidden`)
            return <span key={index} className="letter_display" id="hidden_letter">{letter}</span>
        }
    });
//MESSAGE_TO_DISPLAY
    const messageToDisplay = () => {
        if(hasWon||hasLost){
            return won_lossMsg();
        }else{
            return processedWordArr;
        }
    }
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
        setErrMsg1("");
        setErrMsg2("");
        //setErrMsg3("");
        randomWordLengthRef.current.value = "";
        //console.log(sessionStorage)
    }

//FINAL_RENDERER
    return(
        <div className="pageRenderer_div">
            
            <div className="top_container">
                {/*<div className="errMsg3">{errMsg3}</div>*/}
                <h1>{processedPageTitleArr}</h1>
                <div className="button_container">
                    <div className="randomWord_div">  
                        <button onClick={handleRandomWord} disabled={isDisabled} className="randomWord_btn button">Random Word</button>
                        <input ref={randomWordLengthRef} placeholder="2-9 letters" type="number" min="2" max="9" 
                            disabled={isDisabled} className="numOfLetters_input"/>
                        <br/>
                        
                    </div> 
                    <div className="userWord_div">
                        <span>
                        <button onClick={createUserWord} disabled={isDisabled} className="userWord_btn button">User Word</button>
                        <input type="text" ref={userWordRef} disabled={isDisabled} placeholder="enter a word..."className="userWord_input"></input>
                        </span>
                    </div>
                    <div className="resetGame_btn_div">
                        <button onClick={handleRestart} className="resetGame_btn button">Reset Game</button>
                    </div>
                    <div className="errMsg">
                        <span ref={errMsgRef2}>{errMsg2}</span>
                        <span ref={errMsgRef1}>{errMsg1}</span>
                    </div>
                </div>
            </div>
            <div className="middle_container"> 
                <div className="processedWordArr_div">
                    {messageToDisplay()}
                </div>
            </div>
            <div className="bottom_container">
                <div className="letterInputDisplay_div">
                    <LetterInputDisplay word={word} handleUserInput={handleUserInput} wrongGuessesArr={wrongGuessesArr} 
                    guessedLettersArr={guessedLettersArr} userInput={userInput} 
                    hasWon={hasWon} hasLost={hasLost} />
                </div>
                <div className="hangmanStickFigure_div">
                    <HangmanStickfigure count={count}/>
                </div>
            </div>
            <div>
                <footer id="footer"> 
                    <a href="https://github.com/SimonProgAI/hangman_app" target="_blank"><img src={githubLogo} className="footer_icon"></img></a>
                    <a href="https://linkedin.com/in/simon-lupien-22594235a" target="_blank"><img src={linkedinLogo} className="footer_icon"></img></a>
                    <a href="mailto:lupiensimon@hotmail.com"><img src={emailLogo} className="footer_icon"></img></a>
                    <h3>©2025 Simon Lupien</h3>
                </footer>
            </div>
        </div>
    )
};

export default GameModeDisplay;