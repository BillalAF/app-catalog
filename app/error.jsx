"use client";

import { useEffect } from "react";
import styles from "./catalog.module.css";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.page}>
      <div className={styles.errorState}>
        <p className={styles.errorTitle}>Unable to load applications.</p>
        <p className={styles.errorHint}>Something went wrong. Please try again.</p>
        <button
          onClick={() => reset()}
          style={{
            marginTop: 16,
            padding: "8px 16px",
            border: "1px solid var(--color-border-strong)",
            borderRadius: "var(--radius-sm)",
            background: "var(--color-surface)",
            cursor: "pointer",
            fontSize: 13.5,
          }}
        >
          Try again
        </button>
      </div>
    </main>
  );
}
