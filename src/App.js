import './App.css';
import HangmanDisplay from './components/HangmanDisplay';
import GameModeDisplay from './components/GameModeDisplay';
import WordDisplay from './components/WordDisplay';
import LetterInputDisplay from './components/LetterInputDisplay';
function App() {

  return(
    <div>
        <GameModeDisplay/>
        <HangmanDisplay/>
    </div>
  );

}

export default App;
