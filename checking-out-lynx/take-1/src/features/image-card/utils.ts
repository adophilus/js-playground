import type { Picture } from '../../types';

export const calculateEstimatedSize = (picture: Picture) => {
  // Fixed styles of the gallery
  const galleryPadding = 20;
  const galleryMainAxisGap = 10;
  const gallerySpanCount = 2;
  const galleryWidth = SystemInfo.pixelWidth / SystemInfo.pixelRatio;
  // Calculate the width of each ImageCard and return the relative height of the it.
  const itemWidth =
    (galleryWidth - galleryPadding * 2 - galleryMainAxisGap) / gallerySpanCount;
  return (itemWidth / picture.width) * picture.height;
};
