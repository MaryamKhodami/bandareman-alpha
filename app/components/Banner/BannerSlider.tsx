"use client";

import styles from "./BannerSlider.module.css";
import BannerItem from "./BannerItem";
import { Banner } from "@/data/Banners";

export default function BannerSlider() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.slider}>
        {Banner.map((banner) => (
          <BannerItem key={banner.id} image={banner.image} />
        ))}
      </div>
    </div>
  );
}
