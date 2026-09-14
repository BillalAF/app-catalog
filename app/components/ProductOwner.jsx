import styles from "./InfoPanel.module.css";

export default function ProductOwner({ productOwner }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Product Owner</h2>
      {productOwner && (productOwner.name || productOwner.position) ? (
        <div>
          <p className={styles.primaryText}>
            {productOwner.name || "Name not available"}
          </p>
          <p className={styles.secondaryText}>
            {productOwner.position || "Position not available"}
          </p>
        </div>
      ) : (
        <p className={styles.placeholder}>Product owner not available.</p>
      )}
    </section>
  );
}
