import Game from './components/game';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Navbar} from './components/navbar';
import {Simulation} from './Simulation';

function App() {
    return(
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path="/" element={<Game />} />
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
    );
}
export default App;