"use client";

import Image from "next/image";
import styles from "./Loading.module.css";

type Props = {
  title?: string;
  subtitle?: string;
};

export default function FullScreenLoading({
  title = "لطفاً منتظر بمانید",
  subtitle = "درحال دریافت اطلاعات",
}: Props) {
  return (
    <div className={styles.screen} dir="rtl" aria-busy="true" aria-live="polite">
      <div className={styles.backdrop} />

      <div className={styles.card}>
        <div className={styles.logoWrap}>
          <Image
            src="/icon/logo.svg"
            alt="Logo"
            width={56}
            height={56}
            priority
            className={styles.logo}
          />
        </div>

        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>

        <div className={styles.dots} aria-label="Loading">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
      </div>
    </div>
  );
}
