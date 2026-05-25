"use client";

import { useEffect, useState } from "react";
import List from "@/app/components/List/List";
import styles from "./Stories.module.css";

interface StoriesProps {
  items?: any[];
}

interface Slide {
  id: number;
  type: string;
  viewed: boolean;
  payload: {
    url: string;
    duration?: number;
    thumbnail?: string;
  };
}

interface StoryDetail {
  story_id: number;
  store: {
    id: number;
    title: string;
    location: string;
    slug: string;
    image: string;
    discount: number;
  };
  slides: Slide[];
}

const SLIDE_DURATION = 15000;

export default function Stories({ items = [] }: StoriesProps) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [activeStory, setActiveStory] = useState<StoryDetail | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [seenStories, setSeenStories] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const fetchStoryByIndex = async (index: number) => {
    const storyItem = items[index];
    if (!storyItem) {
      closeViewer();
      return;
    }

    const id = storyItem.story_id || storyItem.id;
    try {
      const res = await fetch(`https://api1.renn.ir/story/${id}`);
      const json = await res.json();
      if (json.ok && json.data) {
        setActiveStory(json.data);
        setCurrentSlide(0);
        setCurrentIndex(index);
        setViewerOpen(true);
        setSeenStories(prev => prev.includes(id) ? prev : [...prev, id]);
      }
    } catch (err) {
      console.error("Error fetching story:", err);
      closeViewer();
    }
  };

  const openViewer = (index: number) => {
    fetchStoryByIndex(index);
  };

  const closeViewer = () => {
    setViewerOpen(false);
    setActiveStory(null);
    setCurrentSlide(0);
  };

  const nextSlide = () => {
    if (!activeStory) return;
    if (currentSlide < activeStory.slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      if (currentIndex < items.length - 1) {
        fetchStoryByIndex(currentIndex + 1);
      } else {
        closeViewer();
      }
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    } else {
      if (currentIndex > 0) {
        fetchStoryByIndex(currentIndex - 1);
      }
    }
  };

  useEffect(() => {
    if (!viewerOpen || !activeStory) return;
    const timer = window.setTimeout(() => nextSlide(), SLIDE_DURATION);
    return () => window.clearTimeout(timer);
  }, [viewerOpen, activeStory, currentSlide]);

  if (items.length === 0) return null;

  return (
    <>
      <List
        items={items}
        itemWidth={70}
        gap={8}
        renderItem={(story, index) => {
          const id = story.story_id || story.id;
          const image = story.image || story.store?.image;
          const title = story.title || story.store?.title;
          const seen = seenStories.includes(id);

          return (
            <div className={styles.item} key={id} onClick={() => openViewer(index)}>
              <div
                className={`${styles.ring} ${styles.activeRing} ${seen ? styles.openRing : ""}`}
              >
                <img src={image} alt={title} className={styles.avatar} />
              </div>
              <span className={styles.title}>{title}</span>
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
                  key={slide.id}
                  className={`${styles.progressBar} ${
                    index === currentSlide ? styles.activeProgress : ""
                  } ${index < currentSlide ? styles.doneProgress : ""}`}
                />
              ))}
            </div>

            <div className={styles.viewerHeader}>
              <div className={styles.storeInfo}>
                <img
                  src={activeStory.store.image}
                  alt={activeStory.store.title}
                  className={styles.headerAvatar}
                />
                <span className={styles.headerTitle}>{activeStory.store.title}</span>
              </div>
              <button className={styles.closeBtn} onClick={closeViewer}>
                ×
              </button>
            </div>

            <div className={styles.viewerContent}>
              {activeStory.slides[currentSlide]?.type === "image" && (
                <img
                  src={activeStory.slides[currentSlide].payload.url}
                  alt={activeStory.store.title}
                  className={styles.viewerImage}
                />
              )}
              {activeStory.slides[currentSlide]?.type === "video" && (
                <video
                  src={activeStory.slides[currentSlide].payload.url}
                  className={styles.viewerImage}
                  autoPlay
                  playsInline
                />
              )}
            </div>

            <button className={styles.leftTap} onClick={nextSlide} />
            <button className={styles.rightTap} onClick={prevSlide} />
          </div>
        </div>
      )}
    </>
  );
}

