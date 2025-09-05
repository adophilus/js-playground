import type { Picture } from '../../types';

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
    </view>
  );
}
