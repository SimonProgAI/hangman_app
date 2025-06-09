//import react from "react";
import { useRef, useState, useEffect } from "react";
import LetterInputDisplay from "./LetterInputDisplay";
import WordDisplay from "./WordDisplay";

function GameModeDisplay(){
//USER_CREATED_WORD 
    const userWordRef = useRef();
    const [userWord, setUserWord] = useState("");
    
    const createUserWord = (e)=>{ 
        e.preventDefault();
        const userWord = userWordRef.current.value;
        setUserWord(userWord);
        //console.log(`function createUserWord called`);
        return userWord;
    }
    
    //console.log(`userWord set to ${userWord}`);

    let wordArr = userWord.split('');
    //console.log(wordArr);
//USER_INPUT    
    const [userInput, setUserInput] = useState("");

    function handleUserInput(){
        console.log(`function handleUserInput called`)
    }
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
    },[wordArr]);
    
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
                <LetterInputDisplay wordArr={wordArr} visibilityArr={visibilityArr} handleUserInput={handleUserInput}/>
            </div>
        </div>
    );
}

export default GameModeDisplay;