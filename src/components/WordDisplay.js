import './components.css';
import react from 'react';
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
    const [visibilityStyle, setVisibilityStyle] = useState({visibility: 'visible'})
    
    useEffect(()=>{
        wordArr.forEach((letter, index) => {
            if(letter === userInput){
                //console.log(`Letter ${letter} at index ${index} is revealed`);
                visibilityArr.push(true)
            }else{
                //console.log(`Letter ${letter} at index ${index} is hidden`);
                visibilityArr.push(false)
            }
        }
        );
        setVisibilityArr(visibilityArr);
    },[wordArr,visibilityArr])
    console.log(`visibilityArr:${visibilityArr}`);
    
    let processedWordArr = wordArr.map( (letter,index)=>{
        
        if(wordArr.length!==visibilityArr.length){
            console.log('Error, visibilityArr.length and wordArr.length do not match')
        }
        if (visibilityArr[index]===true){
            //console.log(`${letter} should be revealed`)
            
        }else{
            //console.log(`${letter} should be hidden`)
        }
        //if the index of visibilityArr has a value of true --> index in wordArr <style = visibility: 'visible'>
            //else --> <style = visibility: 'visible'>
        
        return (
            <span style={visibilityStyle}>{letter}{index}</span>
        )
    })

    return(
        <div>
            WordDisplay
            <div>{processedWordArr}</div>
        </div>
    );
}

export default WordDisplay;