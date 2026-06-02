"use client";

import dynamic from "next/dynamic";
import styles from "./BannerSlider.module.css";

const BannerItem = dynamic(() => import("./BannerItem"), {
  ssr: false,
});

type Banner = {
  id?: number;
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
            <div key={item} className={styles.bannerPlaceholder} />
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
          <BannerItem key={banner.id ?? index} image={banner.image} />
        ))}
      </div>
    </div>
  );
}
