
const LetterInputDisplay = ({wordArr, handleUserInput, buttonDisabled}) => {
    
    //TO REFACTOR LATER
    /*const letters_1stRow_arr = ['Q','W','E','R','T','Y','U','I','O','P'];
    const letters_2ndRow_arr = ['A','S','D','F','G','H','J','K','L'];
    const letters_3rdRow_arr = ['Z','X','C','V','B','N','M'];*/
    
    const btnRows= [
        [//ROW_1
            {letter:'Q', disabled: true},
            {letter:'W', disabled: false},
            {letter:'E', disabled: false},
            {letter:'R', disabled: false},
            {letter:'T', disabled: false},
            {letter:'Y', disabled: false},
            {letter:'U', disabled: false},
            {letter:'I', disabled: false},
            {letter:'O', disabled: false},
            {letter:'P', disabled: false}
        ],
        [//ROW_2
            {letter:'A', disabled: false},
            {letter:'S', disabled: false},
            {letter:'D', disabled: true},
            {letter:'F', disabled: false},
            {letter:'G', disabled: false},
            {letter:'H', disabled: false},
            {letter:'J', disabled: false},
            {letter:'K', disabled: false},
            {letter:'L', disabled: false}
        ],
        [//ROW_3
            {letter:'Z', disabled: false},
            {letter:'X', disabled: false},
            {letter:'C', disabled: false},
            {letter:'V', disabled: false},
            {letter:'B', disabled: true},
            {letter:'N', disabled: false},
            {letter:'M', disabled: false}
        ]

    ];
    //I must map over the arrays inside the big array. This is currently not working.
    const btnRow1 = btnRows[0].map((btn, index)=>{
        console.log(btn.length)
        return(
            <span>
                <button onClick={()=>handleUserInput(btn.letter)}  disabled={btn.disabled}>{btn.letter}</button>
            </span>
        )
        
    });
    const btnRow2 = btnRows[1].map((btn, index)=>{
        console.log(btn.length)
        return(
            <span>
                <button onClick={()=>handleUserInput(btn.letter)}  disabled={btn.disabled}>{btn.letter}</button>
            </span>
        )
        
    });
    const btnRow3 = btnRows[2].map((btn, index)=>{
        console.log(btn.length)
        return(
            <span>
                <button onClick={()=>handleUserInput(btn.letter)}  disabled={btn.disabled}>{btn.letter}</button>
            </span>
        )
        
    });

    
    return(
        <div>
            <div>
                {btnRow1}
            </div>
            <div>
                {btnRow2}
            </div>
            <div>
                {btnRow3}
            </div>
        </div>
    );
}
 
export default LetterInputDisplay;

