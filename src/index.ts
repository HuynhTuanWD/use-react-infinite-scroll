import { RefObject, useEffect, useRef } from "react";

export const useInfiniteScroll = (
  listRef: RefObject<HTMLElement> | null,
  callback: () => any
) => {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  useEffect(() => {
    const checkMatchBottomInterval = setInterval(() => {
      if (listRef && listRef.current) {
        if (
          window.scrollY + window.innerHeight >
          listRef.current.clientHeight + listRef.current.offsetTop - 1
        ) {
          callbackRef.current();
        }
      }
    }, 150);
    return () => {
      clearInterval(checkMatchBottomInterval);
    };
  }, [listRef]);
  return;
};
