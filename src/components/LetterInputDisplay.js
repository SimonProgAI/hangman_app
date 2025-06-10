
const LetterInputDisplay = ({wordArr, handleUserInput, buttonDisabled}) => {
    
    //TO REFACTOR LATER
    const letters_1stRow_arr = ['Q','W','E','R','T','Y','U','I','O','P'];
    const letters_2ndRow_arr = ['A','S','D','F','G','H','J','K','L'];
    const letters_3rdRow_arr = ['Z','X','C','V','B','N','M'];
    
    const ButtonRow_1 = letters_1stRow_arr.map((letter, index)=>{
        return(
            <button onClick={()=>handleUserInput(letter)}  disabled={buttonDisabled}>{letter}</button>
        )
    });

    const ButtonRow_2 = letters_2ndRow_arr.map((letter, index)=>{
        return(
            <button onClick={()=>handleUserInput(letter)}>{letter}</button>
        )
    });

    const ButtonRow_3 = letters_3rdRow_arr.map((letter, index)=>{
        return(
            <button onClick={()=>handleUserInput(letter)}>{letter}</button>
        )
    });

    
    return(
        <div>
            <div>
                <span>
                    {ButtonRow_1}
                </span>
            </div>
            <div>
                <span>
                    {ButtonRow_2}
                </span>
            </div>
            <div>
                <span>
                    {ButtonRow_3}
                </span>
            </div>
        </div>
    );
}
 
export default LetterInputDisplay;