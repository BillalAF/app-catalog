import styles from "./InfoPanel.module.css";

export default function ModuleList({ modules }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Modules</h2>
      {modules && modules.length > 0 ? (
        <ul className={styles.moduleList}>
          {modules.map((module, index) => (
            <li key={index} className={styles.moduleItem}>
              {module}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.placeholder}>No modules listed.</p>
      )}
    </section>
  );
}
