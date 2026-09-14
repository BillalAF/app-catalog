import styles from "./catalog.module.css";
import skeleton from "./skeleton.module.css";

export default function CatalogLoading() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Application Catalog</h1>
        <p className={styles.subtitle}>Loading applications...</p>
      </header>

      <div className={skeleton.grid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={skeleton.card}>
            <div className={`${skeleton.line} ${skeleton.short}`} />
            <div className={`${skeleton.line} ${skeleton.medium}`} />
            <div className={skeleton.line} />
            <div className={`${skeleton.line} ${skeleton.short}`} />
          </div>
        ))}
      </div>
    </main>
  );
}
