import Counter from "./Counter";
import Hangman from "./Hangman";
const HangmanDisplay = () => {
    return(
        <div>
            HangmanDisplay box here.
            <div id="counter_container">
                <Counter/>
                <Hangman/>
            </div>
        </div>
    );
}

export default HangmanDisplay;