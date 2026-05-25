"use client";

import styles from "./BannerSlider.module.css";
import BannerItem from "./BannerItem";

export default function BannerSlider({ items }: { items?: any[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.slider}>
        {items.map((banner, index) => (
          <BannerItem key={banner.id || index} image={banner.image} />
        ))}
      </div>
    </div>
  );
}
