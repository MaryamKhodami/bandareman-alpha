"use client";

import styles from "./BannerSlider.module.css";
import BannerItem from "./BannerItem";

type Banner = {
  id?:number;
  image: string;
};

type Props = {
  items?: Banner[];
  loading?: boolean;
};

export default function BannerSlider({ items, loading = false }: Props) {
  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.slider}>
          {[1, 2, 3].map((item) => (
            <div key={item} className={styles.bannerSkeleton} />
          ))}
        </div>
      </div>
    );
  }

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
