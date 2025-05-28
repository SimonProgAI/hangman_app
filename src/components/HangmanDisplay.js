import Counter from "./Counter";
import HangmanStickfigure from "./HangmanStickFigure";
const HangmanDisplay = () => {
    return(
        <div>
            Hangman Display Box
            <div id="counter_container">
                <Counter/>
                <HangmanStickfigure/>
            </div>
        </div>
    );
}

export default HangmanDisplay;