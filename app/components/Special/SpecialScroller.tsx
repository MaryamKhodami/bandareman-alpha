"use client";

import { useEffect, useRef } from "react";
import SpecialItem from "./SpecialItem";
import styles from "./SpecialScroller.module.css";

function slice(arr: any[], size: number) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export default function SpecialScroller({ items, title }: { items?: any[], title?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !items || items.length === 0) return;

    const interval = setInterval(() => {
      const slideWidth = container.clientWidth;
      const nextScroll = container.scrollLeft - slideWidth;

      if (Math.abs(nextScroll) >= container.scrollWidth - slideWidth) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollTo({ left: nextScroll, behavior: "smooth" });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [items]);

  if (!items || items.length === 0) return null;

  const group = slice(items, 2);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.scroller} ref={scrollRef}>
        {group.map((groupItems, index) => (
          <div className={styles.slide} key={index}>
            {groupItems.map((item: any) => (
              <SpecialItem key={item.id} {...item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
