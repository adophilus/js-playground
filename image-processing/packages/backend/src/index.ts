import { DatabaseSync } from "node:sqlite";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { serve } from "@hono/node-server";
import { createApp, type DbAdapter, type GalleryItem } from "./app";

const dbPath =
  process.env.DB_PATH ??
  fileURLToPath(new URL("../../image-processor/images.db", import.meta.url));

if (!existsSync(dbPath)) {
  console.error(`Database not found: ${dbPath}`);
  console.error(
    "Run the pipeline first:\n  cd packages/image-processor && nix-shell --run \"python process.py ingest && python process.py watermark\"",
  );
  process.exit(1);
}

const db = new DatabaseSync(dbPath);

const adapter: DbAdapter = {
  gallery(): GalleryItem[] {
    const rows = db.prepare(`
      SELECT r.id, r.file_id AS raw_file_id, r.created_at,
             w.file_id AS processed_file_id
      FROM images r
      LEFT JOIN images w ON w.source_image_id = r.id AND w.type = 'without_watermark'
      WHERE r.type = 'raw'
      ORDER BY r.created_at
    `).all() as {
      id: string;
      raw_file_id: string;
      created_at: number;
      processed_file_id: string | null;
    }[];
    return rows.map((r) => ({
      id: r.id,
      rawFileId: r.raw_file_id,
      processedFileId: r.processed_file_id,
      createdAt: r.created_at,
    }));
  },
  file(id: string) {
    const row = db.prepare("SELECT data FROM files WHERE id = ?").get(id) as
      | { data: Uint8Array }
      | undefined;
    return row?.data ?? null;
  },
};

const app = createApp(adapter);

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`✓ Backend on http://localhost:${info.port}`);
});
