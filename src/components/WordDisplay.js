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
                console.log(`Letter ${letter} at index ${index} is revealed`);
                visibilityArr.push(true)
            }else{
                console.log(`Letter ${letter} at index ${index} is hidden`);
                visibilityArr.push(false)
            }
            setVisibilityArr(visibilityArr);
        }
        );
    },[wordArr,visibilityArr])
    console.log(visibilityArr);
    /*Your thinking is sound. You want to create a function that maps over the wordArr 
    and conditionally renders each letter based on the corresponding value in visibilityArr. 
    If visibilityArr[index] is true, the letter at wordArr[index] should be visible, 
    and if it's false, the letter should be hidden.
    
    You can use the map function to achieve this, and within the callback function, 
    you can use a conditional statement to determine whether to render the letter or a placeholder 
    (like an underscore or a blank space) based on the value of visibilityArr[index].
    Additionally, you might want to consider adding a check to ensure that visibilityArr 
    has the same length as wordArr before trying to access its elements, to avoid any potential errors.
    */
    let processedWordArr = wordArr.map( (letter,index)=>{
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