"use client";

import styles from "./FilterBar.module.css";

export default function FilterBar({
  statusOptions,
  departmentOptions,
  status,
  department,
  onStatusChange,
  onDepartmentChange,
}) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.field}>
        <span className={styles.label}>Status</span>
        <select
          className={styles.select}
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="all">All</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Department</span>
        <select
          className={styles.select}
          value={department}
          onChange={(e) => onDepartmentChange(e.target.value)}
        >
          <option value="all">All</option>
          {departmentOptions.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
