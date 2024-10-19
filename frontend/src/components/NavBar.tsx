import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/NavBar.css';

interface Props {
  wallet: any;
}

const NavBar: React.FC<Props> = ({ wallet }) => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <NavLink to="/" className={(navData) => navData.isActive ? "active" : ""}>All Collections</NavLink>
        </li>
        <li>
          <NavLink to="/marketplace" className={(navData) => navData.isActive ? "active" : ""}>Marketplace</NavLink>
        </li>
        <li>
          <NavLink to="/my-collections" className={(navData) => navData.isActive ? "active" : ""}>My Collections</NavLink>
        </li>
        <li>
          <NavLink to="/boosters" className={(navData) => navData.isActive ? "active" : ""}>My Boosters</NavLink>
        </li>
        <div>{wallet?.details.account ? "Account : " + wallet?.details.account : "Metamask KO"}</div>
      </ul>
    </nav>
  );
};

export default NavBar;
