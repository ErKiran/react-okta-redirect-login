function App() {
  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <p style={styles.badge}>Okta Redirect Authentication Demo</p>

        <h1 style={styles.title}>MiniBank Portal</h1>

        <p style={styles.description}>
          This demo shows how a React app redirects users to the Okta-hosted
          sign-in page instead of collecting passwords inside the app.
        </p>

        <button style={styles.button}>
          Login with Okta Redirect
        </button>

        <p style={styles.note}>
          In this first step, the button does not do anything yet.
        </p>
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
    maxWidth: "560px",
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
  note: {
    marginTop: "18px",
    color: "#64748b",
    fontSize: "14px",
  },
};

export default App;