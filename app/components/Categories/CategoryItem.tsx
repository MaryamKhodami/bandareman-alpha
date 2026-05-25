"use client";
import styles from "./CategoryItem.module.css";

export interface CategoryItemProps {
  title: string;
  image: string;
}

export default function CategoryItem({ title, image }: CategoryItemProps) {
  return (
    <div className={styles.item}>
      <div className={styles.iconWrapper}>
        <img src={image} alt={title} className={styles.icon} />
      </div>
      <span className={styles.title}>{title}</span>
    </div>
  );
}
