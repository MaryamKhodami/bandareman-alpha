"use client";

import { useEffect, useRef } from "react";
import SpecialItem from "./SpecialItem";
import styles from "./SpecialScroller.module.css";
import { special } from "@/data/Special";

function slice (arr: any[], size: number) {
  const slice = [];
  for (let i = 0; i < arr.length; i += size) {
    slice.push(arr.slice(i, i + size));
  }
  return slice;
}

export default function SpecialScroller() {
  const group = slice(special, 2);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      const slideWidth = container.clientWidth;  
      const nextScroll = container.scrollLeft - slideWidth;

      if (nextScroll >= container.scrollWidth - slideWidth) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollTo({ left: nextScroll, behavior: "smooth" });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>پیشنهاد ویژه</h2>

      <div className={styles.scroller} ref={scrollRef}>
        {group.map((group, index) => (
          <div className={styles.slide} key={index}>
            {group.map((item: any) => (
              <SpecialItem key={item.id} {...item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
