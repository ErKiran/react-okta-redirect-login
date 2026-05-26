import { Routes, Route, Navigate } from "react-router-dom";
import { LoginCallback, useOktaAuth } from "@okta/okta-react";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login/callback" element={<LoginCallback />} />
      <Route path="/dashboard" element={<ProtectedDashboard />} />
    </Routes>
  );
}

function Home() {
  const { oktaAuth, authState } = useOktaAuth();

  const login = async () => {
    await oktaAuth.signInWithRedirect({
      originalUri: "/dashboard",
    });
  };

  const logout = async () => {
    await oktaAuth.signOut({
      postLogoutRedirectUri: window.location.origin,
    });
  };

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <p style={styles.badge}>Okta Redirect Authentication Demo</p>

        <h1 style={styles.title}>MiniBank Portal</h1>

        <p style={styles.description}>
          This demo shows how a React app redirects users to the Okta-hosted
          sign-in page instead of collecting passwords inside the app.
        </p>

        {authState?.isAuthenticated ? (
          <>
            <p style={styles.success}>You are already signed in.</p>

            <div style={styles.actions}>
              <a href="/dashboard" style={styles.linkButton}>
                Go to Dashboard
              </a>

              <button onClick={logout} style={styles.secondaryButton}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <button onClick={login} style={styles.button}>
            Login with Okta
          </button>
        )}

        <p style={styles.note}>
          The React app does not collect your password. Okta handles login.
        </p>
      </section>
    </main>
  );
}

function ProtectedDashboard() {
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) {
    return (
      <main style={styles.page}>
        <section style={styles.card}>
          <p>Loading authentication state...</p>
        </section>
      </main>
    );
  }

  if (!authState.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const claims = authState.idToken?.claims;

  const logout = async () => {
    await oktaAuth.signOut({
      postLogoutRedirectUri: window.location.origin,
    });
  };

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <p style={styles.badge}>Protected Dashboard</p>

        <h1 style={styles.title}>Welcome to MiniBank</h1>

        <p style={styles.description}>
          You reached this page only after authenticating with Okta.
        </p>

        <div style={styles.infoBox}>
          <p>
            <strong>Name:</strong> {claims?.name || "Not provided"}
          </p>
          <p>
            <strong>Email:</strong> {claims?.email || "Not provided"}
          </p>
          <p>
            <strong>Subject ID:</strong> {claims?.sub}
          </p>
        </div>

        <button onClick={logout} style={styles.secondaryButton}>
          Logout
        </button>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f4f7fb",
    fontFamily: "Inter, system-ui, Arial, sans-serif",
    padding: "24px",
  },
  card: {
    width: "100%",
    maxWidth: "620px",
    background: "#ffffff",
    borderRadius: "24px",
    padding: "40px",
    boxShadow: "0 20px 60px rgba(15, 23, 42, 0.12)",
    textAlign: "center",
  },
  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "#e8f1ff",
    color: "#075ec8",
    fontWeight: 700,
    fontSize: "14px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "42px",
    margin: "0 0 16px",
    color: "#0f172a",
  },
  description: {
    fontSize: "18px",
    lineHeight: 1.6,
    color: "#475569",
    marginBottom: "28px",
  },
  button: {
    border: "none",
    borderRadius: "14px",
    padding: "14px 22px",
    background: "#00297a",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
  },
  secondaryButton: {
    border: "1px solid #cbd5e1",
    borderRadius: "14px",
    padding: "14px 22px",
    background: "#ffffff",
    color: "#0f172a",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
  },
  linkButton: {
    display: "inline-block",
    textDecoration: "none",
    borderRadius: "14px",
    padding: "14px 22px",
    background: "#00297a",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: 700,
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  note: {
    marginTop: "18px",
    color: "#64748b",
    fontSize: "14px",
  },
  success: {
    color: "#15803d",
    fontWeight: 700,
    marginBottom: "18px",
  },
  infoBox: {
    textAlign: "left",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "24px",
    color: "#334155",
    wordBreak: "break-word",
  },
};

export default App;