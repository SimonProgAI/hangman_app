
const LetterInputDisplay = ({wordArr, visibilityArr, handleUserInput}) => {
    //1st, reorganize where letterInput, userInput, count should go.
    
    //useRef for letter input
    //userInput
    //onClick: userInput vaue is iterated over wordArr, 
    // if letter matches {
    //  -button grays out and no longer pushable
    //  -  
    //}
    // 
    // else {
    //  returns false-count++
    //}

    
    return(
        <div>
            <span>
                <button value='Q' onClick={handleUserInput()}>Q</button>
            </span>
        </div>
    );
}
 
export default LetterInputDisplay;