import "server-only";
import { neon } from "@neondatabase/serverless";

let sqlClient;

/**
 * Tagged-template query function ke NeonDB.
 * Lazy-init supaya build tidak gagal sebelum DATABASE_URL diisi,
 * dan koneksi baru dibuat saat benar-benar dibutuhkan (bukan saat import).
 */
export function getSql() {
  if (!sqlClient) {
    const uri = process.env.DATABASE_URL;
    if (!uri) {
      throw new Error(
        "DATABASE_URL belum diset. Salin .env.example menjadi .env.local dan isi connection string NeonDB."
      );
    }
    sqlClient = neon(uri);
  }
  return sqlClient;
}
