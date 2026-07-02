import { Hono } from "hono";

export type GalleryItem = {
  id: string;
  rawFileId: string;
  processedFileId: string | null;
  createdAt: number;
};

/** DB adapter interface — keeps node:sqlite out of this file so the frontend
 *  can import AppType without resolving native modules. */
export interface DbAdapter {
  gallery(): GalleryItem[];
  file(id: string): Uint8Array | null;
}

export function createApp(db: DbAdapter) {
  return new Hono()
    .get("/api/gallery", (c) => c.json(db.gallery()))
    .get("/files/:id", (c) => {
      const data = db.file(c.req.param("id"));
      if (!data) return c.notFound();
      return c.body(data.buffer as ArrayBuffer, 200, {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      });
    });
}

export type AppType = ReturnType<typeof createApp>;
