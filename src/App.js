
import {GameplayLoop} from './components/GameplayLoop';
import { Footer } from './components/Footer/Footer';
import { PageTitle } from './components/PageTitle/PageTitle';
import "./components/components.css";
function App() {

  return(
    <div>
      <PageTitle/>
      <GameplayLoop/>
      <Footer/>
    </div>
  );

}

export default App;
