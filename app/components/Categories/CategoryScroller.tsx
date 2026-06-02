"use client";
import { useRef } from "react";
import styles from "./CategoryScroller.module.css";
import CategoryItem from "./CategoryItem";

interface CategoryData {
  id?: string | number;
  slug?: string;
  title: string;
  image: string;
}

interface CategoryScrollerProps {
  items?: CategoryData[];
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
        {items.map((cat) => (
          <CategoryItem
            key={cat.id || cat.slug || cat.title}
            title={cat.title}
            image={cat.image}
          />
        ))}
      </div>
    </div>
  );
}
