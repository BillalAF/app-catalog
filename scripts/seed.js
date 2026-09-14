/**
 * Script bantu untuk development: mengisi tabel `applications` dengan
 * beberapa baris contoh mengikuti skema yang direkomendasikan.
 *
 * Pastikan sudah menjalankan schema.sql di Neon sebelum ini.
 * Jalankan dengan: npm run seed
 * (memerlukan DATABASE_URL di .env.local)
 */
require("dotenv").config({ path: ".env.local" });
const { neon } = require("@neondatabase/serverless");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error("DATABASE_URL belum diset. Salin .env.example menjadi .env.local.");
  process.exit(1);
}

const sql = neon(uri);

const sampleApplications = [
  {
    app_id: "APP-1042",
    app_name: "Ledger Console",
    description:
      "Review general ledger entries, cost centers, and month-end close activity.",
    status: "Available",
    department: "Finance",
    owner_unit: "Controller's Office",
    po_number: "BRAP",
    programmer_name: "Abdul Azies Kurniawan",
    product_owner: { name: "Dana Whitfield", position: "Director, Finance Systems" },
    assigned_employees: [
      { name: "Marcus Nolan", position: "Process Analyst" },
      { name: "Priya Raman", position: "Integration Engineer" },
    ],
    modules: [
      "General Ledger Entry",
      "Cost Center Allocation",
      "Month-End Close Workflow",
    ],
    diagram: null,
    created_at: "2026-08-03",
  },
  {
    app_id: "APP-1058",
    app_name: "Bill-Coll",
    description: "Layanan mandiri untuk pelanggan mengelola tagihan dan penagihan.",
    status: "Pilot",
    department: "Operations",
    owner_unit: "Collections Unit",
    po_number: "BRAP",
    programmer_name: "Abdul Azies Kurniawan",
    product_owner: null,
    assigned_employees: [],
    modules: "Frontend: Layanan mandiri, Backend: API tagihan, Notifikasi SMS",
    diagram: null,
    created_at: "2026-08-03",
  },
  {
    app_id: "APP-1073",
    app_name: "HR Onboarding Hub",
    description: "Pusat proses onboarding karyawan baru, dari dokumen hingga akses sistem.",
    status: "Request Access",
    department: "Human Resources",
    owner_unit: "People Operations",
    po_number: null,
    programmer_name: null,
    product_owner: { name: "Sofia Bergman", position: "HR Systems Lead" },
    assigned_employees: [{ name: "Sofia Bergman", position: "HR Systems Lead" }],
    modules: ["Document Collection", "Access Provisioning", "Orientation Scheduling"],
    diagram: null,
    created_at: "2026-07-20",
  },
];

async function seed() {
  for (const app of sampleApplications) {
    await sql`
      INSERT INTO applications (
        app_id, app_name, description, status, department, owner_unit,
        po_number, programmer_name, product_owner, assigned_employees,
        modules, diagram, created_at
      ) VALUES (
        ${app.app_id}, ${app.app_name}, ${app.description}, ${app.status},
        ${app.department}, ${app.owner_unit}, ${app.po_number}, ${app.programmer_name},
        ${JSON.stringify(app.product_owner)}, ${JSON.stringify(app.assigned_employees)},
        ${JSON.stringify(
          Array.isArray(app.modules) ? app.modules : app.modules
        )},
        ${app.diagram}, ${app.created_at}
      )
      ON CONFLICT (app_id) DO UPDATE SET
        app_name = EXCLUDED.app_name,
        description = EXCLUDED.description,
        status = EXCLUDED.status,
        department = EXCLUDED.department,
        owner_unit = EXCLUDED.owner_unit,
        po_number = EXCLUDED.po_number,
        programmer_name = EXCLUDED.programmer_name,
        product_owner = EXCLUDED.product_owner,
        assigned_employees = EXCLUDED.assigned_employees,
        modules = EXCLUDED.modules,
        diagram = EXCLUDED.diagram,
        created_at = EXCLUDED.created_at
    `;
  }

  console.log(`Seeded ${sampleApplications.length} applications.`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
