import {
  getAllApplications,
  getDistinctDepartments,
  getDistinctStatuses,
} from "@/lib/applications";
import CatalogView from "./components/CatalogView";
import styles from "./catalog.module.css";

export const dynamic = "force-dynamic";

export default async function CatalogPage() {
  let applications = [];
  let departmentOptions = [];
  let statusOptions = [];
  let loadError = null;

  try {
    [applications, departmentOptions, statusOptions] = await Promise.all([
      getAllApplications(),
      getDistinctDepartments(),
      getDistinctStatuses(),
    ]);
  } catch (error) {
    console.error("[CatalogPage]", error);
    loadError = "Unable to load applications.";
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Application Catalog</h1>
        <p className={styles.subtitle}>
          Browse internal applications by name, status, or department.
        </p>
      </header>

      {loadError ? (
        <div className={styles.errorState}>
          <p className={styles.errorTitle}>{loadError}</p>
          <p className={styles.errorHint}>
            Check the database connection and try again.
          </p>
        </div>
      ) : (
        <CatalogView
          applications={applications}
          departmentOptions={departmentOptions}
          statusOptions={statusOptions}
        />
      )}
    </main>
  );
}
