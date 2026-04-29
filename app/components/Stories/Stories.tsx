"use client";

import { useEffect, useState } from "react";
import List from "@/app/components/List/List";
import styles from "./Stories.module.css";
import { storiesData, storyItem } from "./StoriesData";

const SLIDE_DURATION = 15000;

export default function Stories() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [activeStory, setActiveStory] = useState<storyItem | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [seenStories, setSeenStories] = useState<number[]>([]);

  const openViewer = (story: storyItem) => {
    setActiveStory(story);
    setCurrentSlide(0);
    setViewerOpen(true);
    setSeenStories((prev) => (prev.includes(story.id) ? prev : [...prev, story.id]));
  };

  const closeViewer = () => {
    setViewerOpen(false);
    setActiveStory(null);
    setCurrentSlide(0);
  };

  const nextSlide = () => {
    if (!activeStory) return;

    if (currentSlide < activeStory.slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      closeViewer();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (!viewerOpen || !activeStory) return;

    const timer = window.setTimeout(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => window.clearTimeout(timer);
  }, [viewerOpen, activeStory, currentSlide]);

  return (
    <>
      <List
        items={storiesData}
        itemWidth={70}
        gap={8}
        renderItem={(story: storyItem) => {
          const seen = seenStories.includes(story.id);

          return (
            <div className={styles.item} onClick={() => openViewer(story)}>
              <div
                className={`${styles.ring} ${
                  story.active ? styles.activeRing : styles.inactiveRing
                } ${seen ? styles.openRing : ""}`}
              >
                <img src={story.image} alt={story.title} className={styles.avatar} />
              </div>
              <span className={styles.title}>{story.title}</span>
            </div>
          );
        }}
      />

      {viewerOpen && activeStory && (
        <div className={styles.viewer} onClick={closeViewer}>
          <div className={styles.storyBox} onClick={(e) => e.stopPropagation()}>
            <div className={styles.progressWrapper}>
              {activeStory.slides.map((slide, index) => (
                <div
                  key={slide.id ?? index}
                  className={`${styles.progressBar} ${
                    index === currentSlide ? styles.activeProgress : ""
                  } ${index < currentSlide ? styles.doneProgress : ""}`}
                />
              ))}
            </div>

            <div className={styles.viewerHeader}>
              <div className={styles.storeInfo}>
                <img
                  src={activeStory.image}
                  alt={activeStory.title}
                  className={styles.headerAvatar}
                />
                <span className={styles.headerTitle}>{activeStory.title}</span>
              </div>

              <button className={styles.closeBtn} onClick={closeViewer} aria-label="بستن">
                ×
              </button>
            </div>

            

            <div className={styles.viewerContent}>
              {activeStory.slides[currentSlide]?.type === "image" && (
                <img
                  src={activeStory.slides[currentSlide].url}
                  alt={activeStory.title}
                  className={styles.viewerImage}
                />
              )}
            </div>

            <button className={styles.leftTap} onClick={prevSlide} aria-label="قبلی" />
            <button className={styles.rightTap} onClick={nextSlide} aria-label="بعدی" />
          </div>
        </div>
      )}
    </>
  );
}
