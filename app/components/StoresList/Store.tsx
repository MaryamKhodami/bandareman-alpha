"use client";
import { useState } from "react";
import styles from "./Store.module.css";

export interface StoreType {
  id: number;
  title: string;
  location: string;
  discount: number;
  image: string;
}

export default function Store({ data }: { data: StoreType }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {!imageLoaded && <div className={styles.imagePlaceholder} />}
        <img
          src={data.image}
          alt={data.title}
          className={`${styles.image} ${imageLoaded ? styles.imageVisible : styles.imageHidden}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />

        {data.discount > 0 && (
          <div className={styles.discount}>
            تا <span className={styles.discountNumber}>{data.discount}%</span> تخفیف
          </div>
        )}
      </div>

      <div className={styles.info}>
        <p className={styles.name}>{data.title}</p>
        <p className={styles.location}>{data.location}</p>
      </div>
    </div>
  );
}
