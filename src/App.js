import Instructions from './components/instructions.js';
import GameStart from './components/GameStart';
import { Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Route path="/" exact component={Instructions} />
        <Route path="/gamestart/:id" exact component={GameStart} />
      </BrowserRouter>
    </div>
  );
}

export default App;
