"use client";

import { useState } from "react";
import styles from "./Product.module.css";
import { useCart } from "@/app/Context/CartContext";

export interface ProductType {
  id: number;
  title: string;
  image: string;
  price: number;
  final_price?: number;
  discount: number;
}

export default function Product({ data }: { data: ProductType }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    addToCart,
    removeFromCart,
    getItemCount,
    loading,
  } = useCart();

  const count = getItemCount(data.id);

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {!imageLoaded && <div className={styles.imagePlaceholder} />}

        <img
          src={data.image}
          alt={data.title}
          className={`${styles.image} ${
            imageLoaded ? styles.imageVisible : styles.imageHidden
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />

        {count === 0 ? (
          <button
            className={styles.addBtn}
            onClick={() => addToCart(data)}
            disabled={loading}
          >
            +
          </button>
        ) : (
          <div className={styles.counter}>
            <button
              onClick={() => removeFromCart(data.id)}
              disabled={loading}
            >
              −
            </button>

            <span>{count.toLocaleString("fa-IR")}</span>

            <button
              onClick={() => addToCart(data)}
              disabled={loading}
            >
              +
            </button>
          </div>
        )}

        {data.discount > 0 && (
          <div className={styles.discount}>
            <span className={styles.discountPercent}>
              %{data.discount.toLocaleString("fa-IR")}
            </span>

            <span className={styles.discountPrice}>
              {(data.final_price ?? data.price).toLocaleString("fa-IR")}
            </span>
          </div>
        )}
      </div>

      <div className={styles.info}>
        <p className={styles.name}>{data.title}</p>

        <p className={styles.price}>
          {data.price.toLocaleString("fa-IR")} تومان
        </p>
      </div>
    </div>
  );
}


