import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ userName, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoText}>Safe Heaven Paw</Link>
      </div>
      
      <div style={styles.links}>
        <Link to="/event" style={styles.link}>Event</Link>
        <Link to="/vet" style={styles.link}>Vet</Link>
        <Link to="/pet-rescue" style={styles.link}>PetRescue</Link>
        <Link to="/lost-found" style={styles.link}>Lost&Found</Link>
        <Link to="/blog" style={styles.link}>Blog</Link>
        
        <div style={styles.profileSection}>
          <Link to="/profile" style={styles.link}>
            {userName || 'User'}
          </Link>
          <div 
            style={styles.dropdownArrow}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            ▼
          </div>
          
          {showDropdown && (
            <div style={styles.dropdown}>
              <Link to="/settings" style={styles.dropdownItem}>Settings</Link>
              <Link to="/favorites" style={styles.dropdownItem}>Favorites</Link>
              <div 
                style={styles.dropdownItem}
                onClick={onLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#75C9D6',
    color: 'black',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  logoText: {
    color: 'black',
    textDecoration: 'none',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  link: {
    color: 'black',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#34495e',
    },
  },
  profileSection: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '0.1rem',
  },
  profileButton: {
    cursor: 'pointer',
    padding: '0.5rem 1rem',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: 'white',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    borderRadius: '4px',
    width: '150px',
  },
  dropdownItem: {
    display: 'block',
    padding: '0.8rem 1rem',
    color: '#333',
    textDecoration: 'none',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  dropdownArrow: {
    cursor: 'pointer',
    padding: '0.5rem 0.3rem',
    fontSize: '12px',
    color: 'black',
    transition: 'transform 0.3s',
    marginLeft: '-5px',
    '&:hover': {
      opacity: 0.8,
    },
  },
};

export default Navbar; 