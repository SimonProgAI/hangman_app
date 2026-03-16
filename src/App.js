
import GameModeDisplay from './components/GameModeDisplay';
import { Footer } from './components/Footer';
import { PageTitle } from './components/PageTitle';
import "./components/components.css"
function App() {

  return(
    <div>
      <PageTitle/>
      <GameModeDisplay/>
      <Footer/>
    </div>
  );

}

export default App;
