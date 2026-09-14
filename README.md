# Application Catalog

Katalog aplikasi internal dibangun dengan Next.js (App Router), React, CSS native (CSS Modules), dan NeonDB (Postgres serverless).

## Menjalankan project

```bash
npm install
cp .env.example .env.local        # isi DATABASE_URL dengan connection string Neon
```

1. Buka Neon SQL Editor (atau `psql`), jalankan isi `schema.sql` untuk membuat tabel `applications`.
2. (Opsional) isi data contoh: `npm run seed`
3. Jalankan: `npm run dev`

Buka http://localhost:3000

## Struktur

```
app/
├── page.jsx                          # Halaman katalog (Server Component)
├── loading.jsx                       # Loading state katalog
├── error.jsx                         # Error boundary global
├── not-found.jsx                     # 404 global
├── catalog.module.css
├── skeleton.module.css
├── applications/[id]/
│   ├── page.jsx                      # Halaman detail (Server Component)
│   ├── loading.jsx
│   └── application-detail.module.css
├── api/applications/
│   ├── route.js                      # GET /api/applications
│   └── [id]/route.js                 # GET /api/applications/:id
└── components/
    ├── ApplicationCard.jsx
    ├── ApplicationGrid.jsx
    ├── CatalogView.jsx                # client: search + filter state
    ├── SearchBar.jsx                  # client
    ├── FilterBar.jsx                  # client
    ├── StatusBadge.jsx
    ├── Breadcrumb.jsx
    ├── ProductOwner.jsx
    ├── EmployeeList.jsx
    ├── ModuleList.jsx
    └── DiagramViewer.jsx

lib/
├── db.js            # koneksi NeonDB (server-only, lazy init)
└── applications.js  # query + normalisasi data (server-only)

scripts/
└── seed.js          # data contoh untuk development

schema.sql            # jalankan sekali di Neon sebelum start
```

## Skema database

Lihat `schema.sql` untuk struktur tabel lengkap. Field lama dari database sebelumnya (`po_number`, `programmer_name`) dipertahankan sebagai kolom tersendiri, ditampilkan sebagai `_legacy` pada response API, belum dipetakan ke UI karena maknanya masih perlu dikonfirmasi.
