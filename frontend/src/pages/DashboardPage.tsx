import React, { useState } from "react";
import { api } from "../services/api";

interface HealthResponse {
  status: string;
  service: string;
  version: string;
  checks: {
    backend: string;
    database: string;
    mqtt: string;
  };
}

export const DashboardPage: React.FC = () => {
  const [healthStatus, setHealthStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [healthData, setHealthData] = useState<HealthResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [responseTime, setResponseTime] = useState<number | null>(null);

  const testBackendConnection = async () => {
    setHealthStatus("loading");
    setErrorMessage("");
    setHealthData(null);
    setResponseTime(null);

    const startTime = Date.now();
    try {
      const response = await api.get<HealthResponse>("/health");
      const duration = Date.now() - startTime;
      setResponseTime(duration);
      setHealthData(response.data);
      setHealthStatus("success");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Gagal menghubungkan ke backend server.");
      setHealthStatus("error");
    }
  };

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Welcome banner */}
      <div
        className="glass-panel"
        style={{
          padding: "24px 32px",
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ zIndex: 1 }}>
          <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 700 }}>Halo, Admin!</h2>
          <p style={{ margin: "4px 0 0 0", color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>
            Semua sistem berjalan normal dari server lokal Raspberry Pi Anda.
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            right: "-30px",
            top: "-30px",
            fontSize: "8rem",
            opacity: 0.08,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          🏡
        </div>
      </div>

      {/* Grid Status Ringkas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        <div className="glass-card" style={{ padding: "20px", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ fontSize: "2.2rem" }}>💡</div>
          <div>
            <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>Lampu Aktif</span>
            <h3 style={{ margin: "4px 0 0 0", fontSize: "1.6rem", fontWeight: 700 }}>2 / 5</h3>
          </div>
        </div>

        <div className="glass-card" style={{ padding: "20px", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ fontSize: "2.2rem" }}>🌡️</div>
          <div>
            <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>Suhu Ruangan</span>
            <h3 style={{ margin: "4px 0 0 0", fontSize: "1.6rem", fontWeight: 700 }}>26.5 °C</h3>
          </div>
        </div>

        <div className="glass-card" style={{ padding: "20px", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ fontSize: "2.2rem" }}>💧</div>
          <div>
            <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>Kelembapan</span>
            <h3 style={{ margin: "4px 0 0 0", fontSize: "1.6rem", fontWeight: 700 }}>62 %</h3>
          </div>
        </div>

        <div className="glass-card" style={{ padding: "20px", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ fontSize: "2.2rem" }}>⚡</div>
          <div>
            <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>Status MQTT Broker</span>
            <h3 style={{ margin: "4px 0 0 0", fontSize: "1.1rem", fontWeight: 700, color: "#10b981" }}>ONLINE</h3>
          </div>
        </div>
      </div>

      {/* API Connection & Health Check Panel */}
      <div
        className="glass-panel"
        style={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>Pengujian Integrasi Backend API</h3>
            <p style={{ margin: "4px 0 0 0", color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
              Uji koneksi secara langsung dari React frontend ke API Health Check FastAPI.
            </p>
          </div>
          <button
            onClick={testBackendConnection}
            className="btn-primary"
            style={{ padding: "10px 20px", display: "flex", alignItems: "center", gap: "8px" }}
            disabled={healthStatus === "loading"}
          >
            {healthStatus === "loading" ? "Menghubungkan..." : "🔌 Test Koneksi"}
          </button>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.08)", margin: "8px 0" }} />

        {/* Status Output */}
        <div style={{ minHeight: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {healthStatus === "idle" && (
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", textAlign: "center" }}>
              Klik tombol di atas untuk memulai uji koneksi API.
            </div>
          )}

          {healthStatus === "loading" && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  border: "3px solid rgba(255,255,255,0.1)",
                  borderTopColor: "#6366f1",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              ></div>
              <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>Sedang mengirim request HTTP ke FastAPI...</span>
              <style>{`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          )}

          {healthStatus === "success" && healthData && (
            <div
              className="fade-in"
              style={{
                width: "100%",
                background: "rgba(16, 185, 129, 0.08)",
                border: "1px solid rgba(16, 185, 129, 0.2)",
                borderRadius: "12px",
                padding: "16px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span className="status-badge status-online">🟢 API Connected</span>
                <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                  Waktu Respon: <strong>{responseTime} ms</strong>
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginTop: "4px" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>Status</span>
                  <p style={{ margin: "2px 0 0 0", fontSize: "0.9rem", fontWeight: 600, color: healthData.status === "ok" ? "#10b981" : "#ef4444" }}>
                    {healthData.status.toUpperCase()}
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>Nama Service</span>
                  <p style={{ margin: "2px 0 0 0", fontSize: "0.9rem", fontWeight: 600 }}>{healthData.service}</p>
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>Versi</span>
                  <p style={{ margin: "2px 0 0 0", fontSize: "0.9rem", fontWeight: 600 }}>v{healthData.version}</p>
                </div>
              </div>
              
              <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", margin: "6px 0" }} />
              
              <div>
                <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>Detail Pemeriksaan:</span>
                <div style={{ display: "flex", gap: "20px", marginTop: "6px", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem" }}>
                    <span>🖥️ Backend:</span>
                    <span style={{ color: healthData.checks.backend === "ok" ? "#10b981" : "#ef4444", fontWeight: 600 }}>
                      {healthData.checks.backend.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem" }}>
                    <span>💾 Database:</span>
                    <span style={{ color: healthData.checks.database === "ok" ? "#10b981" : "#ef4444", fontWeight: 600 }}>
                      {healthData.checks.database.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem" }}>
                    <span>🔌 MQTT Broker:</span>
                    <span style={{ color: healthData.checks.mqtt === "ok" ? "#10b981" : "#9ca3af", fontWeight: 600 }}>
                      {healthData.checks.mqtt.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {healthStatus === "error" && (
            <div
              className="fade-in"
              style={{
                width: "100%",
                background: "rgba(239, 68, 68, 0.08)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                borderRadius: "12px",
                padding: "16px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <span className="status-badge status-offline">🔴 API Connection Failed</span>
              <p style={{ margin: "4px 0 0 0", fontSize: "0.85rem", color: "rgba(255,255,255,0.8)" }}>
                Detail Error: <code>{errorMessage}</code>
              </p>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>
                Pastikan server backend FastAPI Anda sudah dinyalakan (berjalan pada port 8000) dan CORS telah dikonfigurasi.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
