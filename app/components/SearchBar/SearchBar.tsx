"use client";

import styles from "./SearchBar.module.css";

interface SearchBarProps {
  placeholder?: string;
}

export default function SearchBar({ placeholder }: SearchBarProps) {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder={placeholder}
        className={styles.searchInput}
      />
    </div>
  );
}
