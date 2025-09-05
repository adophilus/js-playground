import type { Picture } from '../../types';
import LikeButton from './like-button';

export type ImageCardProps = {
  picture: Picture;
};

export default function ImageCard(props: ImageCardProps) {
  const { picture } = props;
  return (
    <view className="picture-wrapper">
      <image
        className="image"
        style={{ width: '100%', aspectRatio: picture.width / picture.height }}
        src={picture.src}
      />
      <LikeButton />
    </view>
  );
}
