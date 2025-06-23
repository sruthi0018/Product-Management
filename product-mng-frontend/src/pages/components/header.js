import React from 'react';
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

export default function Header() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/login');
  };

  return (
    <header
      style={{
        backgroundColor: '#1e3a8a',
        color: '#fff',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <h1>Product Manager</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <input
          type="text"
          placeholder="Search products..."
          style={{
            padding: '8px',
            borderRadius: '6px',
            border: 'none',
            width: '250px',
          }}
        />

        {/* Show heart icon only if logged in */}
        {token && <FaHeart title="Favorites" style={{ cursor: 'pointer' }} />}

        {/* If logged in, show user's name & logout; else Sign In */}
        {token ? (
          <>
            <span style={{ fontSize: '14px' }}>{user?.name}</span>
            <button onClick={handleLogoutClick} style={styles.authButton}>
              Logout
            </button>
          </>
        ) : (
          <button onClick={handleSignInClick} style={styles.authButton}>
            Sign In
          </button>
        )}

        <FaShoppingCart title="Cart" style={{ cursor: 'pointer' }} />
      </div>
    </header>
  );
}

const styles = {
  authButton: {
    background: '#facc15',
    color: '#000',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};
