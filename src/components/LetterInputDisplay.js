import './components.css';

const LetterInputDisplay = ({word, handleUserInput, wrongGuessesArr, guessedLettersArr, hasWon, hasLost}) => {
    
    const btnRows= [
        [//rowArr_1
            {letter:'Q', disabled: false, id: 1},
            {letter:'W', disabled: false, id: 2},
            {letter:'E', disabled: false, id: 3},
            {letter:'R', disabled: false, id: 4},
            {letter:'T', disabled: false, id: 5},
            {letter:'Y', disabled: false, id: 6},
            {letter:'U', disabled: false, id: 7},
            {letter:'I', disabled: false, id: 8},
            {letter:'O', disabled: false, id: 9},
            {letter:'P', disabled: false, id: 10}
        ],
        [//rowArr_2
            {letter:'A', disabled: false, id: 11},
            {letter:'S', disabled: false, id: 12},
            {letter:'D', disabled: false, id: 13},
            {letter:'F', disabled: false, id: 14},
            {letter:'G', disabled: false, id: 15},
            {letter:'H', disabled: false, id: 16},
            {letter:'J', disabled: false, id: 17},
            {letter:'K', disabled: false, id: 18},
            {letter:'L', disabled: false, id: 19}
        ],
        [//rowArr_3
            {letter:'Z', disabled: false, id: 20},
            {letter:'X', disabled: false, id: 21},
            {letter:'C', disabled: false, id: 22},
            {letter:'V', disabled: false, id: 23},
            {letter:'B', disabled: false, id: 24},
            {letter:'N', disabled: false, id: 25},
            {letter:'M', disabled: false, id: 26}
        ]

    ];
    
    let letterColor;
    
    const btnInput = btnRows.map((rowArr, index)=>{
        
        const btnRows1_3 = rowArr.map((btn, index)=>{
    
            function keyboardStatus(){
                if (word===""||hasLost===true||hasWon===true){
                    return true;
                }else if (wrongGuessesArr.includes(btn.letter)){
                    letterColor = {color: 'red'};
                    return true;
                }else if(guessedLettersArr.includes(btn.letter)){
                    letterColor = {color: 'green'};
                    return true;
                }else{
                    letterColor = {color: 'black'};
                    return guessedLettersArr.includes(btn.letter);
                }
            }
            return(
                <span key={btn.id}>
                    <button onClick={()=>handleUserInput(btn.letter)} disabled={keyboardStatus()}  style={letterColor} className='indv_btns'>{btn.letter}</button>
                </span>
            )
            })
        
        return(
            <div key={index} className='btnRows_div'>
                {btnRows1_3}
            </div>
        )
    });
    
    return(
            <div className="btnInput_div">
                {btnInput}
            </div>
    );
}

export default LetterInputDisplay;

