import styles from "./application-detail.module.css";
import skeleton from "@/app/skeleton.module.css";

export default function ApplicationDetailLoading() {
  return (
    <main className={styles.page}>
      <p style={{ padding: "16px 0", fontSize: 13.5, color: "var(--color-text-secondary)" }}>
        Loading application details...
      </p>
      <div className={styles.layout}>
        <div className={skeleton.card}>
          <div className={`${skeleton.line} ${skeleton.medium}`} />
          <div className={`${skeleton.line} ${skeleton.short}`} />
          <div className={skeleton.line} />
          <div className={skeleton.line} />
          <div className={`${skeleton.line} ${skeleton.short}`} />
        </div>
        <div className={skeleton.card} style={{ minHeight: 360 }} />
      </div>
    </main>
  );
}
