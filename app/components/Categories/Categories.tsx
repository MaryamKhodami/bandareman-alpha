"use client";
import styles from "./Categories.module.css";

interface Props {
  title: string;
  icon: string;
}

export default function CategoryItem({ title, icon }: Props) {
  return (
    <div className={styles.item}>
      <div className={styles.iconWrapper}>
        <img src={icon} alt={title} className={styles.icon} />
      </div>
      <span className={styles.title}>{title}</span>
    </div>
  );
}
