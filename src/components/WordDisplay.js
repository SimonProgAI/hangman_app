import './components.css';
//import react from 'react';
import {useState, useEffect} from 'react';
//If user input === one of the letters --> letter reveals
    //array.find -- Returns the first element that satisfies the provided testing function. Undefined if not.
    //array.findIndex -- Returns the index of the first element that satisfies testing functions. Returns -1 if not
    //array.indexOf -- Returns the first index at which a given element can be found, or -1
    //array.includes -- If contains a certain value, returns true or false.
    //map.has --
    //map.delete
const WordDisplay = ({wordArr}) => {

    const userInput = "l";
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
            WordDisplay
            <div>{processedWordArr}</div>
        </div>
    );
}

export default WordDisplay;