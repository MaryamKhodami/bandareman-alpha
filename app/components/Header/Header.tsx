"use client";

import { useEffect, useState } from "react";
import styles from "./Header.module.css";

interface User {
  id: number;
  name: string;
  phone: string;
  avatar: string;
}

interface HeaderProps {
  user?: User | null;
}

export default function Header({ user }: HeaderProps) {
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  useEffect(() => {
    setAvatarLoaded(false);
  }, [user?.avatar]);

  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <img src="/icon/logo.svg" className={styles.logo} alt="لوگو" />
      </div>

      <div className={styles.userSection}>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{user?.name || "کاربر"}</span>
          {user?.phone ? <span className={styles.userPhone}>{user.phone}</span> : null}
        </div>

        <div className={styles.avatarWrapper}>
          {!avatarLoaded && <div className={styles.avatarPlaceholder} />}
          <img
            src={user?.avatar || "/icon/user.png"}
            className={`${styles.userAvatar} ${
              avatarLoaded ? styles.imageVisible : styles.imageHidden
            }`}
            alt={user?.name || "کاربر"}
            loading="eager"
            onLoad={() => setAvatarLoaded(true)}
          />
        </div>
      </div>
    </header>
  );
}
