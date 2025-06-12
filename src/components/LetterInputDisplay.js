
const LetterInputDisplay = ({wordArr, handleUserInput, buttonDisabled}) => {
    
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
    
    const btnInput = btnRows.map((rowArr, index)=>{
        
        const btnRows1_3 = rowArr.map((btn, index)=>{
            
            return(
                <span>
                    <button onClick={()=>handleUserInput(btn.letter)}  disabled={btn.disabled}>{btn.letter}</button>
                </span>
            )
            })
        
        return(
            <div>
                {btnRows1_3}
            </div>
        )
    });

    return(
            <div>
                {btnInput}
            </div>
    );
}
 
export default LetterInputDisplay;

