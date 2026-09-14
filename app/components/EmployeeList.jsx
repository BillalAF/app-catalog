import styles from "./InfoPanel.module.css";

export default function EmployeeList({ employees }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Assigned Employees</h2>
      {employees && employees.length > 0 ? (
        <ul className={styles.employeeList}>
          {employees.map((employee, index) => (
            <li key={index} className={styles.employeeItem}>
              <p className={styles.primaryText}>
                {employee.name || "Name not available"}
              </p>
              <p className={styles.secondaryText}>
                {employee.position || "Position not available"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.placeholder}>No employees assigned yet.</p>
      )}
    </section>
  );
}
