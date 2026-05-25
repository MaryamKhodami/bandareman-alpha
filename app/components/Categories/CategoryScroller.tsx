"use client";
import { useRef } from "react";
import styles from "./CategoryScroller.module.css";
import CategoryItem from "./CategoryItem";
interface CategoryScrollerProps {
  items?: any[]; 
}


export default function CategoryScroller({ items }: CategoryScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollLeft += e.deltaY;
  };
  if (!items || items.length === 0) return null;

  return (
    <div className={styles.wrapper} ref={scrollRef} onWheel={handleWheel}>
      <div className={styles.scroller}>
        {items.map((cat: any) => (
          <CategoryItem
            key={cat.id || cat.slug}
            title={cat.title}
            image={cat.image}
            />
        ))}
      </div>
    </div>
  );
}