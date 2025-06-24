import React, { useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import WishlistSidebar from "./wishList";

export default function Header({ onSearch, searchValue }) {
  const [showWishlist, setShowWishlist] = useState(false);
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    navigate("/login");
  };

  return (
    <header style={styles.header}>
      <h1>Product Manager</h1>
      <div style={styles.right}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
          style={styles.input}
        />
        {token && (
          <FaHeart onClick={() => setShowWishlist(true)} style={styles.icon} />
        )}
        {token ? (
          <>
            <span>{user?.name}</span>
            <button onClick={handleLogoutClick} style={styles.authButton}>
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => navigate("/login")} style={styles.authButton}>
            Sign In
          </button>
        )}
        <FaShoppingCart style={styles.icon} />
      </div>
      <WishlistSidebar
        isOpen={showWishlist}
        onClose={() => setShowWishlist(false)}
      />
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#1e3a8a",
    color: "#fff",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "250px",
  },
  authButton: {
    background: "#facc15",
    color: "#000",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  icon: {
    cursor: "pointer",
  },
};
