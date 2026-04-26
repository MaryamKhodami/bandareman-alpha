"use client";
import { useRef } from "react";
import styles from "./CategoryScroller.module.css";
import { categoriesData } from "@/data/categories";
import Categories from "./Categories";

export default function CategoryScroller() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollRef.current) return;
    e.preventDefault();
    scrollRef.current.scrollLeft += e.deltaY;
  };

  return (
    <div
      className={styles.wrapper}
      ref={scrollRef}
      onWheel={handleWheel}
    >
      <div className={styles.scroller}>
        {categoriesData.map((cat) => (
          <Categories
            key={cat.id}
            title={cat.title}
            icon={cat.icon}
          />
        ))}
      </div>
    </div>
  );
}

