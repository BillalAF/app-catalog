"use client";

import { useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import ApplicationGrid from "./ApplicationGrid";
import styles from "./CatalogView.module.css";

export default function CatalogView({ applications, departmentOptions, statusOptions }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [department, setDepartment] = useState("all");

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    return applications.filter((app) => {
      const matchesSearch =
        !term ||
        (app.app_name || "").toLowerCase().includes(term) ||
        (app.id || "").toLowerCase().includes(term);

      const matchesStatus = status === "all" || app.status === status;
      const matchesDepartment =
        department === "all" || app.department === department;

      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [applications, search, status, department]);

  const isFiltered = search.trim() !== "" || status !== "all" || department !== "all";

  return (
    <div>
      <div className={styles.toolbar}>
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar
          statusOptions={statusOptions}
          departmentOptions={departmentOptions}
          status={status}
          department={department}
          onStatusChange={setStatus}
          onDepartmentChange={setDepartment}
        />
      </div>

      <p className={styles.resultCount}>
        {filtered.length} {filtered.length === 1 ? "RESULT" : "RESULTS"}
      </p>

      <ApplicationGrid applications={filtered} isFiltered={isFiltered} />
    </div>
  );
}
