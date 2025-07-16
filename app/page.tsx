"use client";

import { useSession } from 'next-auth/react';

export default function HomePage() {
  const { data: session, status } = useSession();
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)",
        fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
      }}
    >
      <h1 style={{ fontSize: 40, fontWeight: 700, marginBottom: 16, letterSpacing: 0.5 }}>
        Welcome to Next App
      </h1>
      <p style={{ fontSize: 20, color: "#555", marginBottom: 32, maxWidth: 480, textAlign: "center" }}>
        Effortlessly upload and manage your images and videos with a modern, intuitive interface.
      </p>
      <button
        style={{
          background: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "14px 36px",
          fontSize: 18,
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,112,243,0.08)",
          transition: "background 0.2s",
        }}
        onMouseOver={e => (e.currentTarget.style.background = "#0059c9")}
        onMouseOut={e => (e.currentTarget.style.background = "#0070f3")}
      >
        Get Started
      </button>
      {/* Session Debug Info */}
      <div style={{ marginTop: 32, background: '#f3f4f6', padding: 16, borderRadius: 8, maxWidth: 600 }}>
        <strong>Session status:</strong> {status}<br />
        <strong>Session data:</strong>
        <pre style={{ fontSize: 14, marginTop: 8, background: '#fff', padding: 8, borderRadius: 4, overflowX: 'auto' }}>
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </main>
  );
}
