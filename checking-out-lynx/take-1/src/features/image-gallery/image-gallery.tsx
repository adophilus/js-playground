import { useEffect, useMainThreadRef, useRef } from '@lynx-js/react';
import type { MainThread, NodesRef, ScrollEvent } from '@lynx-js/types';
import type { Picture } from '../../types';
import LikeImageCard from '../image-card/like-image-card';
import { calculateEstimatedSize } from '../image-card/utils';
import {
  NiceScrollbar,
  type NiceScrollbarRef,
} from '../nice-scrollbar/nice-scrollbar';
import {
  adjustScrollbarMTS,
  NiceScrollbarMTS,
} from '../nice-scrollbar/nice-scrollbar-mts';

export type ImageGalleryProps = {
  pictures: Picture[];
};

export default function ImageGallery(props: ImageGalleryProps) {
  const galleryRef = useRef<NodesRef>(null);

  useEffect(() => {
    galleryRef.current
      ?.invoke({
        method: 'autoScroll',
        params: {
          rate: '60',
          start: true,
        },
      })
      .exec();
  }, []);

  const scrollbarRef = useRef<NiceScrollbarRef>(null);
  const scrollbarMTSRef = useMainThreadRef<MainThread.Element>(null);

  const onScroll = (event: ScrollEvent) => {
    scrollbarRef.current?.adjustScrollbar(
      event.detail.scrollTop,
      event.detail.scrollHeight,
    );
  };

  const onScrollMTS = (event: ScrollEvent) => {
    'main thread';
    adjustScrollbarMTS(
      event.detail.scrollTop,
      event.detail.scrollHeight,
      scrollbarMTSRef,
    );
  };

  return (
    <view className="gallery-wrapper">
      {/*<NiceScrollbar ref={scrollbarRef} />*/}
      <NiceScrollbarMTS main-thread:ref={scrollbarMTSRef} />
      <list
        ref={galleryRef}
        className="list"
        list-type="waterfall"
        column-count={2}
        scroll-orientation="vertical"
        custom-list-name="list-container"
        bindscroll={onScroll}
        main-thread:bindscroll={onScrollMTS}
      >
        {props.pictures.map((picture, index) => (
          <list-item
            item-key={index.toString()}
            key={index.toString()}
            estimated-main-axis-size-px={calculateEstimatedSize(picture)}
          >
            <LikeImageCard picture={picture} />
          </list-item>
        ))}
      </list>
    </view>
  );
}
