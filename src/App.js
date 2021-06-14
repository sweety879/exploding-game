import Instructions from "./components/instructions.js";
import GamePage from "./pages/gamePage.js";
import { Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Route path="/" exact component={Instructions} />
        <Route path="/gameStart/:id" exact component={GamePage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
