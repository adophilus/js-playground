"""SQLite schema + helpers for the image pipeline.

Schema is the locked, lean version (see PLAN.md §5): files + images only.
"""
from __future__ import annotations

import sqlite3
import time
import uuid

DB_PATH = "images.db"

SCHEMA = """
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS files (
  id          TEXT PRIMARY KEY,
  data        BLOB NOT NULL,
  created_at  INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS images (
  id               TEXT PRIMARY KEY,
  type             TEXT NOT NULL CHECK (type IN ('raw', 'without_watermark')),
  source_image_id  TEXT REFERENCES images(id),
  file_id          TEXT NOT NULL REFERENCES files(id),
  created_at       INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_images_source ON images(source_image_id);
CREATE INDEX IF NOT EXISTS idx_images_type   ON images(type);
"""


def connect(path=DB_PATH) -> sqlite3.Connection:
    conn = sqlite3.connect(path)
    conn.execute("PRAGMA foreign_keys = ON")
    conn.executescript(SCHEMA)
    return conn


def _now() -> int:
    return int(time.time())


def insert_file(conn: sqlite3.Connection, data: bytes) -> str:
    fid = str(uuid.uuid4())
    conn.execute(
        "INSERT INTO files(id, data, created_at) VALUES (?, ?, ?)",
        (fid, sqlite3.Binary(data), _now()),
    )
    return fid


def insert_image(
    conn: sqlite3.Connection,
    type: str,
    file_id: str,
    source_image_id: str | None = None,
) -> str:
    iid = str(uuid.uuid4())
    conn.execute(
        "INSERT INTO images(id, type, source_image_id, file_id, created_at)"
        " VALUES (?, ?, ?, ?, ?)",
        (iid, type, source_image_id, file_id, _now()),
    )
    return iid


def raw_images(conn: sqlite3.Connection):
    """Yield (image_id, file_bytes) for every raw image, oldest first."""
    cur = conn.execute(
        "SELECT i.id, f.data FROM images i"
        " JOIN files f ON i.file_id = f.id"
        " WHERE i.type = 'raw' ORDER BY i.created_at, i.id"
    )
    for image_id, data in cur:
        yield image_id, bytes(data)


def has_watermark_child(conn: sqlite3.Connection, source_image_id: str) -> bool:
    row = conn.execute(
        "SELECT 1 FROM images"
        " WHERE source_image_id = ? AND type = 'without_watermark' LIMIT 1",
        (source_image_id,),
    ).fetchone()
    return row is not None


def counts(conn: sqlite3.Connection) -> dict[str, int]:
    rows = conn.execute(
        "SELECT type, COUNT(*) FROM images GROUP BY type"
    ).fetchall()
    return {t: c for t, c in rows}
