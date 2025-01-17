import { Link } from "react-router";
import barSyncLogo from "../../assets/barSync_logo.png";
import NavigationLink from "./NavigationLink";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="hero">
          <img src={barSyncLogo} className="logo"></img>
          <h1 className="title">barSync</h1>
        </div>
        <nav className="nav-buttons">
          <NavigationLink route="/" text="Home" />
          <NavigationLink route="/ingredientsearch" text="Add Ingredient" />
          <NavigationLink route="/recipes" text="Make something?" />
        </nav>
      </div>
    </>
  );
}

export default Navbar;
