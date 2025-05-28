import './App.css';
import HangmanDisplay from './components/HangmanDisplay';
import GameMode from './components/GameMode';
import WordDisplay from './components/WordDisplay';
import LetterInput from './components/LetterInput';
function App() {

  return(
    <div>
        <GameMode/>
        <WordDisplay/>
        <LetterInput/>
        <HangmanDisplay/>
    </div>
  );

}

export default App;
