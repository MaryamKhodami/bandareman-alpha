"use client";

import { useMemo, useState } from "react";
import styles from "./ReelItem.module.css";

type Props = {
  title: string;
  thumbnail: string;
  duration?: number;
  published_at?: number;
};

function toFaNumber(value: string | number) {
  return value.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

function formatDuration(secondsTotal: number) {
  const total = Math.max(0, secondsTotal || 0);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  const result =
    hours > 0
      ? `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      : `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return toFaNumber(result);
}

function formatTimeAgoFa(timestamp?: number) {
  if (!timestamp) return "";

  const now = Date.now();
  const publishedMs = timestamp * 1000;
  const diff = Math.max(0, now - publishedMs);

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (diff < 45 * 1000) return "لحظاتی پیش";

  if (diff < hour) {
    const value = Math.floor(diff / minute) || 1;
    return `${toFaNumber(value)} دقیقه پیش`;
  }

  if (diff < day) {
    const value = Math.floor(diff / hour) || 1;
    return `${toFaNumber(value)} ساعت پیش`;
  }

  if (diff < week) {
    const value = Math.floor(diff / day) || 1;
    return `${toFaNumber(value)} روز پیش`;
  }

  if (diff < month) {
    const value = Math.floor(diff / week) || 1;
    return `${toFaNumber(value)} هفته پیش`;
  }

  if (diff < year) {
    const value = Math.floor(diff / month) || 1;
    return `${toFaNumber(value)} ماه پیش`;
  }

  const value = Math.floor(diff / year) || 1;
  return `${toFaNumber(value)} سال پیش`;
}

export default function ReelItem({
  title,
  thumbnail,
  duration = 0,
  published_at,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  const displayTime = formatDuration(duration);
  const displayPublishedAgo = useMemo(
    () => formatTimeAgoFa(published_at),
    [published_at]
  );

  return (
    <div className={styles.card}>
      <img
        src={thumbnail}
        alt={title}
        className={`${styles.image} ${
          loaded ? styles.imageVisible : styles.imageHidden
        }`}
        onLoad={() => setLoaded(true)}
      />

      <div className={styles.play}>▶</div>
      <div className={styles.duration}>{displayTime}</div>
      {displayPublishedAgo && (
        <div className={styles.date}>{displayPublishedAgo}</div>
      )}
      <div className={styles.title}>{title}</div>
    </div>
  );
}
