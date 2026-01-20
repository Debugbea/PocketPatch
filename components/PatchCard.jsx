export default function PatchCard({ title, description, buttonText }) {
  return (
    <div style={styles.card}>
  <h3 style={styles.title}>{title}</h3>

  <p style={styles.description}>{description}</p>

  <button style={styles.button}>
    {buttonText}
  </button>
</div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "16px",
    maxWidth: "300px",
    backgroundColor: "#f9f9f9",
  },
  title: {
    marginBottom: "8px",
  },
  description: {
    marginBottom: "12px",
    color: "#555",
  },
  button: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
  },
};
