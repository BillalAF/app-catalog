import styles from "./StatusBadge.module.css";

const STATUS_KEY = {
  available: "available",
  "request access": "request",
  retiring: "retiring",
  pilot: "pilot",
};

export default function StatusBadge({ status }) {
  if (!status) {
    return <span className={`${styles.badge} ${styles.default}`}>Status unknown</span>;
  }

  const key = STATUS_KEY[status.toLowerCase()] || "default";

  return <span className={`${styles.badge} ${styles[key]}`}>{status}</span>;
}
