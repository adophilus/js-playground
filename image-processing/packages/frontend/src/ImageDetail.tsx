import { useState } from "react";
import type { GalleryItem } from "backend";

export function ImageDetail({
  item,
  onClose,
}: {
  item: GalleryItem;
  onClose: () => void;
}) {
  const [showRaw, setShowRaw] = useState(false);
  const fileId = showRaw
    ? item.rawFileId
    : (item.processedFileId ?? item.rawFileId);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {item.processedFileId && (
            <div className="toggle">
              <button
                className={!showRaw ? "active" : ""}
                onClick={() => setShowRaw(false)}
              >
                Watermark Removed
              </button>
              <button
                className={showRaw ? "active" : ""}
                onClick={() => setShowRaw(true)}
              >
                Original
              </button>
            </div>
          )}
          <button className="close" onClick={onClose}>
            ✕
          </button>
        </div>
        <img src={`/files/${fileId}`} alt="" />
      </div>
    </div>
  );
}
