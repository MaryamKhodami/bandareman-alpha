"use client";
import { useState } from "react";
import styles from "./CategoryItem.module.css";

export interface CategoryItemProps {
  title: string;
  image: string;
}

export default function CategoryItem({ title, image }: CategoryItemProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={styles.item}>
      <div className={styles.iconWrapper}>
        {!imageLoaded && <div className={styles.imagePlaceholder} />}
        <img
          src={image}
          alt={title}
          className={`${styles.icon} ${imageLoaded ? styles.imageVisible : styles.imageHidden}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <span className={styles.title}>{title}</span>
    </div>
  );
}
