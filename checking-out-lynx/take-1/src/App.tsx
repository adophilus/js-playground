import './index.scss';
import { furniturePictures } from './features/furniture/data';
import ImageGallery from './features/image-gallery/image-gallery';

export function App(props: { onRender?: () => void }) {
  props.onRender?.();

  return <ImageGallery pictures={furniturePictures} />;
}
