import { useState } from 'react';
import { RedHeartIcon, WhiteHeartIcon } from '../icon';

export default function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);
  const onTap = () => setIsLiked((isLiked) => !isLiked);

  return (
    <view className="like-icon" bindtap={onTap}>
      {isLiked && (
        <>
          <view className="circle" />
          <view className="circle circleAfter" />
        </>
      )}
      {isLiked ? <RedHeartIcon /> : <WhiteHeartIcon />}
    </view>
  );
}
