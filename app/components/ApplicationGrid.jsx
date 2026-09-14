import ApplicationCard from "./ApplicationCard";
import styles from "./ApplicationGrid.module.css";

export default function ApplicationGrid({ applications, isFiltered = false }) {
  if (!applications || applications.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>
          {isFiltered
            ? "No applications match your search."
            : "No applications available."}
        </p>
        <p className={styles.emptyHint}>
          {isFiltered
            ? "Try a different search term or clear the current filters."
            : "Applications added to the catalog will appear here."}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {applications.map((app) => (
        <ApplicationCard key={app.id} application={app} />
      ))}
    </div>
  );
}
