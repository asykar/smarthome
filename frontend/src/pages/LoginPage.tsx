import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!username || !password) {
      setErrorMessage("Username dan password wajib diisi!");
      return;
    }

    setIsLoading(true);

    // Simulate login request delay
    setTimeout(() => {
      setIsLoading(false);
      // Simulating simple credentials check for demo purposes
      if (username === "admin" && password === "admin123") {
        navigate("/dashboard");
      } else {
        setErrorMessage("Username atau password salah! (Gunakan: admin / admin123)");
      }
    }, 1000);
  };

  return (
    <div
      className="fade-in"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100vw",
        boxSizing: "border-box",
        padding: "20px",
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "40px 32px",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* Glow Element */}
        <div
          style={{
            position: "absolute",
            top: "-20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "140px",
            height: "140px",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0) 70%)",
            zIndex: -1,
            pointerEvents: "none",
          }}
        ></div>

        {/* Logo and title */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.8rem",
              marginBottom: "16px",
              boxShadow: "0 8px 24px rgba(99, 102, 241, 0.4)",
            }}
          >
            🏠
          </div>
          <h2 style={{ margin: 0, fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.5px" }}>Selamat Datang</h2>
          <p style={{ margin: "6px 0 0 0", color: "rgba(255, 255, 255, 0.5)", fontSize: "0.9rem" }}>
            Aplikasi Smarthome Lokal Raspberry Pi
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {errorMessage && (
            <div
              className="status-badge status-offline"
              style={{
                width: "100%",
                boxSizing: "border-box",
                borderRadius: "10px",
                padding: "10px 14px",
                display: "block",
                textAlign: "center",
              }}
            >
              ⚠️ {errorMessage}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Username</label>
            <input
              type="text"
              className="custom-input"
              placeholder="Masukkan username (e.g. admin)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Password</label>
            <input
              type="password"
              className="custom-input"
              placeholder="Masukkan password (e.g. admin123)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: "10px" }} disabled={isLoading}>
            {isLoading ? "Memuat..." : "Masuk"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>
            Tip: Gunakan user default <strong>admin</strong> dan password <strong>admin123</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
