"use client";

import React from "react";
import styles from "./CategoryScroller.module.css";

import CategoryItem from "./Categories";
import { categoriesData } from "@/data/categories";

export default function CategoryScroller() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.scroller}>
        {categoriesData.map((cat) => (
          <CategoryItem
            key={cat.id}
            title={cat.title}
            icon={cat.icon}
          />
        ))}
      </div>
    </div>
  );
}
