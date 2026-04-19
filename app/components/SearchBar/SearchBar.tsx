"use client";

import React from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="جستجوی کالا، خدمات یا فروشگاه ..."
        className={styles.searchInput}
      />
    </div>
  );
}
