import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Basic logout simulation
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100vw" }}>
      {/* Sidebar - Glassmorphism */}
      <aside
        className="glass-panel"
        style={{
          width: "260px",
          margin: "16px",
          marginRight: "8px",
          display: "flex",
          flexDirection: "column",
          padding: "24px 16px",
          boxSizing: "border-box",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px", padding: "0 8px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "1.2rem",
              boxShadow: "0 4px 10px rgba(99, 102, 241, 0.3)",
            }}
          >
            🏠
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.5px" }}>Smarthome</h2>
            <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>Local Server</span>
          </div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "8px", flexGrow: 1 }}>
          <Link
            to="/dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "12px",
              color: location.pathname === "/dashboard" || location.pathname === "/" ? "#ffffff" : "rgba(255,255,255,0.6)",
              textDecoration: "none",
              fontSize: "0.95rem",
              fontWeight: 500,
              background: location.pathname === "/dashboard" || location.pathname === "/" ? "rgba(99, 102, 241, 0.15)" : "transparent",
              border: location.pathname === "/dashboard" || location.pathname === "/" ? "1px solid rgba(99, 102, 241, 0.25)" : "1px solid transparent",
              transition: "all 0.2s ease",
            }}
          >
            📊 Dashboard
          </Link>
          <Link
            to="/login"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "12px",
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
              fontSize: "0.95rem",
              fontWeight: 500,
              border: "1px solid transparent",
              transition: "all 0.2s ease",
            }}
          >
            🔒 Halaman Login
          </Link>
        </nav>

        {/* User Profile / Logout */}
        <div
          className="glass-card"
          style={{
            padding: "12px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.9rem",
            }}
          >
            👨‍💻
          </div>
          <div style={{ flexGrow: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              Administrator
            </p>
            <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>Role: Admin</span>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: "transparent",
              border: "none",
              color: "#ef4444",
              cursor: "pointer",
              fontSize: "1.1rem",
              padding: "4px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title="Keluar"
          >
            🚪
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          margin: "16px",
          marginLeft: "8px",
          boxSizing: "border-box",
          overflowY: "auto",
        }}
      >
        {/* Top Header */}
        <header
          className="glass-panel"
          style={{
            padding: "16px 24px",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700 }}>
              {location.pathname === "/dashboard" ? "System Dashboard" : "Main Workspace"}
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div className="status-badge status-online">
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10b981", display: "inline-block" }}></span>
              Client Connected
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
