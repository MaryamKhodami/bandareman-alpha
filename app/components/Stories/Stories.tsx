"use client";

import { useState, useEffect } from "react";
import styles from "./Stories.module.css";
import { storiesData, storyItem } from "./StoriesData";

export default function Stories() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [activeStory, setActiveStory] = useState<storyItem | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [seenStories, setSeenStories] = useState<number[]>([]);

  useEffect(() => {
    if (!viewerOpen || !activeStory) return;

    const slideDuration = 15000;

    const timer = setTimeout(() => {
      if (currentSlide < activeStory.slides.length - 1) {
        setCurrentSlide((s) => s + 1);
      } else {
        closeViewer();
      }
    }, slideDuration);

    return () => clearTimeout(timer);
  }, [currentSlide, viewerOpen]);

  const openViewer = (story: storyItem) => {
    setActiveStory(story);
    setCurrentSlide(0);
    setViewerOpen(true);

    setSeenStories((prev) =>
      prev.includes(story.id) ? prev : [...prev, story.id]
    );
  };

  const closeViewer = () => {
    setViewerOpen(false);
    setActiveStory(null);
    setCurrentSlide(0);
  };

  const nextSlide = () => {
    if (!activeStory) return;
    if (currentSlide < activeStory.slides.length - 1) {
      setCurrentSlide((s) => s + 1);
    } else {
      closeViewer();
    }
  };

  const prevSlide = () => {
    if (!activeStory) return;
    if (currentSlide > 0) {
      setCurrentSlide((s) => s - 1);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.scrollWrapper}>
          {storiesData.map((story) => (
            <div
              key={story.id}
              className={styles.item}
              onClick={() => openViewer(story)}
            >
              <div
                className={`
                  ${styles.ring}
                  ${story.active ? styles.activeRing : styles.inactiveRing}
                  ${seenStories.includes(story.id) ? styles.openRing : ""}
                `}
              >
                <img
                  src={story.image}
                  alt={story.title}
                  className={styles.avatar}
                />
              </div>

              <span className={styles.title}>{story.title}</span>
            </div>
          ))}
        </div>
      </div>

      {viewerOpen && activeStory && (
        <div className={styles.viewer}>
          <div className={styles.viewerHeader}>
            <div className={styles.closeBtn} onClick={closeViewer}>✕</div>

            <div className={styles.storeInfo}>
              <img src={activeStory.image} className={styles.headerAvatar} />
              <span className={styles.headerTitle}>{activeStory.title}</span>
            </div>
          </div>

          <div className={styles.progressWrapper}>
            {activeStory.slides.map((s, idx) => (
              <div
                key={s.id}
                className={`${styles.progressBar} ${
                  idx === currentSlide ? styles.activeProgress : ""
                }`}
              />
            ))}
          </div>

          <div className={styles.viewerContent}>
            {activeStory.slides[currentSlide].type === "image" && (
              <img
                src={activeStory.slides[currentSlide].url}
                className={styles.viewerImage}
              />
            )}
          </div>

          <div className={styles.leftTap} onClick={prevSlide}></div>
          <div className={styles.rightTap} onClick={nextSlide}></div>
        </div>
      )}
    </>
  );
}
