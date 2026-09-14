import "server-only";
import { getSql } from "./db";

/**
 * Ubah field `modules` yang bisa berupa array (JSONB) ATAU string lama
 * ("Frontend, Backend, Authentication" / dipisah newline) menjadi array bersih.
 * Tidak pernah melempar error dan tidak mengubah data asli di database.
 */
function normalizeModules(modules) {
  if (!modules) return [];
  if (Array.isArray(modules)) {
    return modules.map((m) => String(m).trim()).filter(Boolean);
  }
  if (typeof modules === "string") {
    return modules
      .split(/\r?\n|,/)
      .map((m) => m.trim())
      .filter(Boolean);
  }
  return [];
}

/**
 * Map 1 row Postgres mentah -> bentuk yang dipakai UI.
 * Field yang belum ada/NULL di database akan bernilai null, BUKAN data karangan.
 */
function toApplicationView(row) {
  return {
    id: typeof row.app_id === "string" ? row.app_id.trim() : row.app_id,
    app_name: row.app_name ?? null,
    description: row.description ?? null,
    status: row.status ?? null,
    department: row.department ?? null,
    owner_unit: row.owner_unit ?? null,
    product_owner: row.product_owner
      ? {
          name: row.product_owner.name ?? null,
          position: row.product_owner.position ?? null,
        }
      : null,
    assigned_employees: Array.isArray(row.assigned_employees)
      ? row.assigned_employees.map((e) => ({
          name: e?.name ?? null,
          position: e?.position ?? null,
        }))
      : [],
    modules: normalizeModules(row.modules),
    diagram: row.diagram ?? null,
    created_at: row.created_at ?? null,
    // Field legacy yang sudah ada di database saat ini, dipertahankan apa adanya
    // agar tidak ada data yang hilang, meski belum dipetakan ke UI.
    _legacy: {
      po_number: row.po_number ?? null,
      programmer_name: row.programmer_name ?? null,
    },
  };
}

export async function getAllApplications() {
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM applications
    ORDER BY created_at DESC NULLS LAST
  `;
  return rows.map(toApplicationView);
}

export async function getApplicationById(id) {
  const sql = getSql();
  const trimmedId = String(id).trim();

  // Cocokkan berdasarkan app_id (teks, misal "APP-1042" atau hash lama)
  // ATAU id serial (angka primary key), supaya tetap bekerja terlepas dari
  // mana yang dipakai sebagai URL param. TRIM() menjaga dari whitespace
  // tersembunyi yang kadang ikut ter-copy saat input manual.
  const rows = await sql`
    SELECT * FROM applications
    WHERE TRIM(app_id) = ${trimmedId}
       OR id::text = ${trimmedId}
    LIMIT 1
  `;
  if (rows.length === 0) return null;
  return toApplicationView(rows[0]);
}

export async function getDistinctDepartments() {
  const sql = getSql();
  const rows = await sql`
    SELECT DISTINCT department FROM applications
    WHERE department IS NOT NULL
    ORDER BY department
  `;
  return rows.map((r) => r.department).filter(Boolean);
}

export async function getDistinctStatuses() {
  const sql = getSql();
  const rows = await sql`
    SELECT DISTINCT status FROM applications
    WHERE status IS NOT NULL
    ORDER BY status
  `;
  return rows.map((r) => r.status).filter(Boolean);
}
