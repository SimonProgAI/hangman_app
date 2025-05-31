import './components.css';
//If user input === one of the letters
//array.find 
//array.findIndex 
//array.includes 
//array.indexOf -- find the index of the user input, if found, then reveal that letter
//array.some
//map.has
//map.delete
const WordDisplay = ({wordArr}) => {
    
    const processedWordArr = wordArr.map((letter)=>{
        return(
            <span className="individual_letters">{letter}</span>
        );
    });

    return(
        <div>
            WordDisplay
            <div>{processedWordArr}</div>
        </div>
    );
}

export default WordDisplay;