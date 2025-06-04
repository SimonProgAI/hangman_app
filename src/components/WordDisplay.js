import './components.css';
//If user input === one of the letters --> letter reveals
//array.find -- Returns the first element that satisfies the provided testing function. Undefined if not.
//array.findIndex -- Returns the index of the first element that satisfies testing functions. Returns -1 if not
//array.indexOf -- Returns the first index at which a given element can be found, or -1
////array.includes -- If contains a certain value, returns true or false.
//map.has --
//map.delete
const WordDisplay = ({wordArr}) => {

    const userInput = "l";
    //let test = wordArr.findIndex((letter) => letter===userInput );
    
    for(const [index, value] of wordArr.entries()){
        //console.log(`index: ${index}, value: ${value}`);
        if(value===userInput){
            console.log(`Letter revealed; index ${index}, value: ${value}, user input: ${userInput}.`)
            //the letter is seen
        }else {
            console.log(`Letter hidden; index: ${index}, value: ${value}.`)
            //the letter is hidden
        }
    }                      
    

    /*const processedWordArr = wordArr.map((letter)=>{
        return(
            <span className="individual_letters">{letter}</span>
        );
    });*/ 

    return(
        <div>
            WordDisplay
            <div>{}</div>
        </div>
    );
}

export default WordDisplay;