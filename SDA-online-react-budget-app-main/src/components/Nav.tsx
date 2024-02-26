import { Link } from "react-router-dom";
import "../App.css";
const Nav = () => {
  return (
    <div>
      <nav id="Nav-bar">
        <Link to="/">Home</Link>
        <Link to="/income">Inome</Link>
        <Link to="/expenses">Expense</Link>
        <Link to="/target">Traget</Link>
        <Link to="/transfer">Transfer</Link>
      </nav>
    </div>
  );
};

export default Nav;