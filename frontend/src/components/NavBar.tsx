import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/NavBar.css";

// Import du logo
import logo from '../static/Yu-Gu-Oh_-logo-FA1A029B70-seeklogo.com.png';
import profilePic from '../static/image1.jpeg'; 

interface Props {
  wallet: any;
}

const NavBar: React.FC<Props> = ({ wallet }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      {/* Utilisation de container-fluid pour occuper toute la largeur de l'écran mais avec un padding */}
      <div className="container-fluid px-5"> {/* `px-5` ajoute un padding à gauche et à droite */}
        
        {/* Logo à gauche */}
        <NavLink to="/" className="navbar-brand">
          <img src={logo} alt="Logo" width="100" height="30"  />
        </NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Ajout d'espace entre le logo et les liens de navigation */}
          <ul className="navbar-nav ms-auto"> {/* Utilisation de `ms-auto` pour pousser la nav à droite */}
            {/* <li className="nav-item me-4"> 
              <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                All Collections
              </NavLink>
            </li> */}
            <li className="nav-item me-4">
              <NavLink to="/marketplace" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                Marketplace
              </NavLink>
            </li>
            <li className="nav-item me-4">
              <NavLink to="/my-collections" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                My Collections
              </NavLink>
            </li>
          </ul>

          {/* Dropdown for account */}
          <div className="nav-item dropdown">
            <a 
              className="nav-link dropdown-toggle" 
              href="#" 
              id="navbarDropdown" 
              role="button" 
              onClick={toggleDropdown} 
              aria-expanded={isDropdownOpen}
            >
              <img src={profilePic} alt="Profile" className="profilePic" /> 
            </a>
            {isDropdownOpen && (
              <div className="dropdown-menu dropdown-menu-end show" style={{ display: 'block' }}>
                <div className="dropdown-item">
                  {wallet?.details.account ? `Account: ${wallet.details.account}` : "Metamask KO"}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
