
const LetterInputDisplay = ({wordArr, handleUserInput, buttonDisabled}) => {
    
    //TO REFACTOR LATER
    /*const letters_1stRow_arr = ['Q','W','E','R','T','Y','U','I','O','P'];
    const letters_2ndRow_arr = ['A','S','D','F','G','H','J','K','L'];
    const letters_3rdRow_arr = ['Z','X','C','V','B','N','M'];*/
    
    const btnRows= [
        [//ROW_1
            {letter:'Q', disabled: false},
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
            {letter:'D', disabled: false},
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
            {letter:'B', disabled: false},
            {letter:'N', disabled: false},
            {letter:'M', disabled: false}
        ]

    ];
    //I must map over the arrays inside the big array. This is currently not working.
    const buttonRows = btnRows.map((btn, index)=>{
        console.log(btn.length)
        return(
            <div>
                <span>
                    <button onClick={()=>handleUserInput(btn[index.length].letter)}  disabled={btn[index.length].disabled}>{btn[index.length].letter}</button>
                </span>
            </div>
        )
        
    });

    
    return(
        <div>
            {buttonRows}
        </div>
    );
}
 
export default LetterInputDisplay;

