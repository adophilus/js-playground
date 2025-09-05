import {
  forwardRef,
  useImperativeHandle,
  useState,
  type RefObject,
} from '@lynx-js/react';
import type { MainThread } from '@lynx-js/types';

export type NiceScrollbarRef = {
  adjustScrollbar: (scrollTop: number, scrollHeight: number) => void;
};

export const NiceScrollbar = forwardRef((_, ref) => {
  const [scrollbarHeight, setScrollbarHeight] = useState(0);
  const [scrollbarTop, setScrollbarTop] = useState(0);

  const adjustScrollbar = (scrollTop: number, scrollHeight: number) => {
    const listHeight = SystemInfo.pixelHeight / SystemInfo.pixelRatio - 48;
    const scrollbarHeight = listHeight * (listHeight / scrollHeight);
    const scrollbarTop = listHeight * (scrollTop / scrollHeight);

    setScrollbarHeight(scrollbarHeight);
    setScrollbarTop(scrollbarTop);
  };

  useImperativeHandle(
    ref,
    () => ({
      adjustScrollbar,
    }),
    [adjustScrollbar],
  );

  return (
    <view
      className="scrollbar"
      style={{ height: `${scrollbarHeight}px`, top: `${scrollbarTop}px` }}
    >
      <view className="scrollbar-effect glow" />
    </view>
  );
});

export const adjustScrollbarMTS = (
  scrollTop: number,
  scrollHeight: number,
  ref: RefObject<MainThread.Element>,
) => {
  'main thread';
  const listHeight = SystemInfo.pixelHeight / SystemInfo.pixelRatio;
  const scrollbarHeight = listHeight * (listHeight / scrollHeight);
  const scrollbarTop = listHeight * (scrollTop / scrollHeight);

  ref.current?.setStyleProperties({
    height: `${scrollbarHeight}px`,
    top: `${scrollbarTop}px`,
  });
};

export const NiceScrollbarMTS = (props: {
  'main-thread:ref': RefObject<MainThread.Element>;
}) => {
  return (
    <view
      main-thread:ref={props['main-thread:ref']}
      className="scrollbar"
      style={{ right: '14px', backgroundColor: 'darkkhaki' }}
    >
      <view className="scrollbar-effect glow" />
    </view>
  );
};
