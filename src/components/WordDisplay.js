import './components.css';

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