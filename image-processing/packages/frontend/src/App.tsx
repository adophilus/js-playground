import { useState } from "react";
import { useGallery } from "./api";
import { ImageDetail } from "./ImageDetail";

export function App() {
  const { data: gallery, isLoading } = useGallery();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (isLoading) return <div className="loading">Loading…</div>;

  const selected = gallery?.find((item) => item.id === selectedId);

  return (
    <>
      <header>
        <h1>Image Gallery</h1>
        <span className="count">{gallery?.length ?? 0} images</span>
      </header>
      <div className="gallery">
        {gallery?.map((item) => (
          <button
            key={item.id}
            className="thumb"
            onClick={() => setSelectedId(item.id)}
          >
            <img
              src={`/files/${item.processedFileId ?? item.rawFileId}`}
              loading="lazy"
              alt=""
            />
          </button>
        ))}
      </div>
      {selected && (
        <ImageDetail item={selected} onClose={() => setSelectedId(null)} />
      )}
    </>
  );
}
