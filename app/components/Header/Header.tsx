"use client";
import styles from "./Header.module.css";
export default function Header() {
 
  return (
    <header className={styles.header}>
      <img src="/icon/logo.svg" className={styles.logo} alt="لوگو" />
      <img src="/icon/user.png" className={styles.user} alt="کاربر" />
    </header>
  );
}
