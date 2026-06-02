"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./SpecialItem.module.css";

type Props = {
  title: string;
  image: string;
  discount: number;
  original_price: number;
  discounted_price: number;
  expires_at: number;
  store: {
    title: string;
    location: string;
  };
};

export default function SpecialItem(props: Props) {
  const { title, image, discount, original_price, discounted_price, expires_at, store } = props;

  const [remaining, setRemaining] = useState("");
  const [isInView, setIsInView] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { root: null, rootMargin: "200px", threshold: 0.01 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) {
      setRemaining("");
      return;
    }

    let interval: ReturnType<typeof setInterval>;

    const tick = () => {
      const now = Date.now();
      let target = Number(expires_at);

      if (target < 1000000000000) target *= 1000;

      const diff = target - now;

      if (diff <= 0) {
        setRemaining("00:00:00");
        if (interval) clearInterval(interval);
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      const pad = (n: number) => String(n).padStart(2, "0");

      setRemaining(`${pad(h)}:${pad(m)}:${pad(s)}`);
    };

    tick();
    interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [expires_at, isInView]);

  return (
    <div className={styles.card} ref={cardRef}>
      <div className={styles.imageBox}>
        {!imageLoaded && <div className={styles.imagePlaceholder} />}
        <Image
          src={image}
          alt={title}
          fill
          className={`${styles.image} ${imageLoaded ? styles.imageVisible : styles.imageHidden}`}
          loading="lazy"
          sizes="140px"
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.store}>
          {store.title} ({store.location})
        </p>
        <div className={styles.timer}>
          <span className={styles.timerText}>
            {remaining === "00:00:00" ? "تخفیف به اتمام رسیده" : `${remaining} تا اتمام`}
          </span>
        </div>
      </div>

      <div className={styles.discount}>
        <div className={styles.discountTag}>{discount}%</div>
        <div className={styles.oldPrice}>{original_price.toLocaleString()}</div>
        <div className={styles.newPrice}>{discounted_price.toLocaleString()} تومان</div>
      </div>
    </div>
  );
}
