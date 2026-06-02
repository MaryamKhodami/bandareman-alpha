"use client";

import { useEffect, useRef, useState } from "react";
import SpecialItem from "./SpecialItem";
import styles from "./SpecialScroller.module.css";

interface SpecialStore {
  title: string;
  location: string;
}

interface SpecialData {
  id: string | number;
  title: string;
  image: string;
  discount: number;
  original_price: number;
  discounted_price: number;
  expires_at: number;
  store: SpecialStore;
}

interface SpecialScrollerProps {
  items?: SpecialData[];
  title?: string;
}

function slice(arr: SpecialData[], size: number) {
  const result: SpecialData[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export default function SpecialScroller({ items, title }: SpecialScrollerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "300px", threshold: 0.01 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || !items || items.length <= 2) return;

    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      const slideWidth = container.clientWidth;
      const maxScroll = container.scrollWidth - slideWidth;
      const nextScroll = container.scrollLeft + slideWidth;

      if (nextScroll > maxScroll - 5) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollTo({ left: nextScroll, behavior: "smooth" });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [items, isInView]);

  if (!items || items.length === 0) return null;

  const group = slice(items, 2);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {title ? <h2 className={styles.title}>{title}</h2> : null}

      <div className={styles.scroller} ref={scrollRef}>
        {group.map((groupItems, index) => (
          <div className={styles.slide} key={index}>
            {groupItems.map((item) => (
              <SpecialItem key={item.id} {...item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

