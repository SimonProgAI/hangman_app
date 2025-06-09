
const CounterDisplay = ()=> {
    let count = 0;
    
    const counter = (userInput)=>{
        if (userInput === false){
            count++
        }
    }
    counter(false);
    counter(false);
    counter(false);
    
    console.log(`Count is${count}`)

    return (
        <div>counter component</div>
    );
}

export default CounterDisplay;