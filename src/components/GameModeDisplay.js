//import react from "react";
import { useRef, useState, useEffect } from "react";
import LetterInputDisplay from "./LetterInputDisplay";
import WordDisplay from "./WordDisplay";

function GameModeDisplay(){
    
    const userWordRef = useRef();
    const [userWord, setUserWord] = useState("");
    
    const createUserWord = (e)=>{ 
        e.preventDefault();
        const userWord = userWordRef.current.value;
        setUserWord(userWord);
        //console.log(`function createUserWord called`);
        return userWord;
    }
    //useEffect(()=>{console.log(`userWord updated to${userWord}`)}, [userWord]);
    console.log(`userWord set to ${userWord}`);

    const wordArr = userWord.split('');
    console.log(wordArr);

    
    return(
        <div>
            GameMode Box
            <div>
                <span>
                    <button onClick={createUserWord}>User Selected</button>
                    <input type="text" ref={userWordRef}></input>
                </span>
            </div>
            <div>
                <WordDisplay userWord={userWord}/>
            </div>
        </div>
        

    );
}

export default GameModeDisplay;