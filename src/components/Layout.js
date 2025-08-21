// src/components/Layout.js
import React from "react";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();

  // Apply a background color for the entire layout
  const layoutStyle = {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa", // Light background for desktop
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  // No header in main page
  const isMainPage = location.pathname === "/";

  return (
    <div style={layoutStyle}>
      {!isMainPage && (
        <header style={{ padding: "1rem", background: "#333", color: "#fff" }}>
          <nav>
            {/* You can add links here for non-main pages if needed */}
            <span>Navigation Placeholder</span>
          </nav>
        </header>
      )}
      <main style={{ width: "100%", flex: 1 }}>{children}</main>
    </div>
  );
};

export default Layout;
