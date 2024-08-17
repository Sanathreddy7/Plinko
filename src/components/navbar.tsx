import { Link} from "react-router-dom";
import "../styles/navbar.css";

export const Navbar = () => {
  return (
    <nav className = "navbar">
        <span>PLINKO</span>
        <ul>
            <Link to="/game">Game</Link>
            <Link to="/simulation">Simulation</Link>
        </ul>
    </nav>
  );
};
