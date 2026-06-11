"use client";

import Image from 'next/image';

import { useState } from "react";
import styles from "./StoreInfo.module.css";


export default function StoreHeader({ data }: { data: any }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.topRow}>

        <div className={styles.logoWrapper}>
          <Image
            src={data?.image}
            alt={data?.title}
            width={60}
            height={60}
            priority
            onLoad={() => setLoaded(true)}
            className={`${styles.logo} ${loaded ? styles.visible : styles.hidden}`}
          />
        </div>

        <div className={styles.text}>
          <div className={styles.title}>
            {data?.title}
          </div>

          {data?.location && (
            <div className={styles.location}>
              {data.location}
            </div>
          )}

          {data?.slogan && (
            <div className={styles.slogan}>
              {data.slogan}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
