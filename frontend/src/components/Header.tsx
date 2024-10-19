import React from 'react';
import '../css/Header.css';
import NavBar from '@/components/NavBar';

interface HeaderProps {
  wallet: any;
}

const Header: React.FC<HeaderProps> = ({ wallet }) => {
  return (
    <header className="page-header">
      <div className="header-overlay">
        <div className="header-content">
          <div className="logo">
            <h1>Yu-Gi-Oh! Duelist Kingdom</h1>
            <p className="tagline">Unleash your cards and duel like a champion!</p>
          </div>
        </div>
      </div>
      <NavBar wallet={wallet} />
    </header>
  );
};

export default Header;
