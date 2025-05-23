import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="Nav">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/posts">Posts</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}
export default Navbar;
