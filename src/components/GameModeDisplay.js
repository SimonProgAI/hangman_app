//import react from "react";
import { useRef, useState, useEffect, useMemo } from "react";
import LetterInputDisplay from "./LetterInputDisplay";
import WordDisplay from "./WordDisplay";
import HangmanStickfigure from "./HangmanStickFigure";

function GameModeDisplay(){
//USER_CREATED_WORD 
    const userWordRef = useRef();
    const [userWord, setUserWord] = useState("");
    
    const createUserWord = (e)=>{ 
        e.preventDefault();
        const userWord = userWordRef.current.value;
        setUserWord(userWord.toUpperCase());
        //console.log(`function createUserWord called`);
        return userWord;
    }
    //console.log(`userWord set to ${userWord}`);

    let wordArr = useMemo(()=>userWord.split(''),[userWord]);
    //console.log(wordArr);
    
    
            
   

//USER_INPUT    
    const [userInput, setUserInput] = useState("");
    const [count, setCount] = useState(0);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleUserInput = (letter, index) => {
        setUserInput(letter);
        if(wordArr.includes(letter)===false){
            setCount(count+1)
        }else if(wordArr.includes(letter)===true){
            setButtonDisabled(true);
            console.log(`buttonDisabled = ${buttonDisabled}`)
        }
        console.log(`count is ${count+1}`); //count+1 is a workaround solution, maybe rework later
        //console.log(`function handleUserInput called`);
        //console.log(`userInput: ${letter}`);
    }
    /*
        Keep track of the guessed letters and disable the buttons based on whether the letter has been guessed or not.
        Think about how you can modify your handleUserInput function 
        and LetterInputDisplay component to track and disable individual buttons. 
        You might want to consider using an array or object to keep track of the guessed letters.
    */
//WORD_DISPLAY
    
    const [visibilityArr, setVisibilityArr] = useState([]);
    //const [visibilityStyle, setVisibilityStyle] = useState({visibility: 'visible'})
    
    useEffect(()=>{
        let tempVisibilityArr = [];
        wordArr.forEach((letter, index) => {
            if(letter === userInput){
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
    
    let processedWordArr = wordArr.map( (letter,index)=>{
        
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
                    <input type="text" ref={userWordRef}></input>
                </span>
            </div>
            <div>
                {processedWordArr}
            </div>
            <div>
                <LetterInputDisplay wordArr={wordArr} handleUserInput={handleUserInput} 
                buttonDisabled={buttonDisabled} setButtonDisabled={setButtonDisabled}/>
            </div>
            <div>
                <HangmanStickfigure count={count}/>
            </div>
        </div>
    );
}

export default GameModeDisplay;