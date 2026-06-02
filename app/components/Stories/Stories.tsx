"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import List from "@/app/components/List/List";
import styles from "./Stories.module.css";

interface StoriesProps {
  items?: StoryListItem[];
}

interface StoryListItem {
  id?: number;
  story_id?: number;
  image?: string;
  title?: string;
  store?: {
    title?: string;
    image?: string;
  };
}

interface Slide {
  id: number;
  type: "image" | "video" | string;
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

const DEFAULT_IMAGE_DURATION = 15000;

export default function Stories({ items = [] }: StoriesProps) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [activeStory, setActiveStory] = useState<StoryDetail | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [seenStories, setSeenStories] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [thumbLoaded, setThumbLoaded] = useState<Record<number, boolean>>({});
  const [headerAvatarLoaded, setHeaderAvatarLoaded] = useState(false);
  const [slideImageLoaded, setSlideImageLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [slideDuration, setSlideDuration] = useState(DEFAULT_IMAGE_DURATION);
  const [progressKey, setProgressKey] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const current = useMemo(() => {
    return activeStory?.slides?.[currentSlide] ?? null;
  }, [activeStory, currentSlide]);

  const currentStoryId = useMemo(() => {
    return activeStory?.story_id ?? 0;
  }, [activeStory]);

  const resetSlideStates = () => {
    setSlideImageLoaded(false);
    setVideoReady(false);
    setSlideDuration(DEFAULT_IMAGE_DURATION);
    setProgressKey((prev) => prev + 1);
  };

  const fetchStoryByIndex = async (index: number) => {
    const storyItem = items[index];
    if (!storyItem) {
      closeViewer();
      return;
    }

    const id = storyItem.story_id || storyItem.id;
    if (!id) {
      closeViewer();
      return;
    }

    try {
      const res = await fetch(`https://api1.renn.ir/story/${id}`);
      const json = await res.json();

      if (json.ok && json.data) {
        setActiveStory(json.data);
        setCurrentSlide(0);
        setCurrentIndex(index);
        setViewerOpen(true);
        setSeenStories((prev) => (prev.includes(id) ? prev : [...prev, id]));
        setHeaderAvatarLoaded(false);
        resetSlideStates();
      } else {
        closeViewer();
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
    setHeaderAvatarLoaded(false);
    setSlideImageLoaded(false);
    setVideoReady(false);
    setSlideDuration(DEFAULT_IMAGE_DURATION);
    setProgressKey(0);
  };

  const nextSlide = () => {
    if (!activeStory) return;

    if (currentSlide < activeStory.slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
      resetSlideStates();
      return;
    }

    if (currentIndex < items.length - 1) {
      fetchStoryByIndex(currentIndex + 1);
      return;
    }

    closeViewer();
  };

  const prevSlide = () => {
    if (!activeStory) return;

    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
      resetSlideStates();
      return;
    }

    if (currentIndex > 0) {
      fetchStoryByIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    if (!viewerOpen || !activeStory || !current) return;

    const shouldStartTimer =
      (current.type === "image" && slideImageLoaded) ||
      (current.type === "video" && videoReady);

    if (!shouldStartTimer) return;

    const timer = window.setTimeout(() => {
      nextSlide();
    }, slideDuration);

    return () => window.clearTimeout(timer);
  }, [
    viewerOpen,
    activeStory,
    current,
    currentSlide,
    slideImageLoaded,
    videoReady,
    slideDuration,
  ]);

  useEffect(() => {
    if (!current) return;

    if (current.type === "image") {
      setVideoReady(false);
      setSlideDuration(DEFAULT_IMAGE_DURATION);
      return;
    }

    if (current.type === "video") {
      setSlideImageLoaded(false);
    }
  }, [current]);

  if (items.length === 0) return null;

  return (
    <>
      <List
        items={items}
        itemWidth={70}
        gap={8}
        renderItem={(story, index) => {
          const id = story.story_id || story.id || index;
          const image = story.image || story.store?.image || "";
          const title = story.title || story.store?.title || "";
          const seen = !!(story.story_id || story.id) && seenStories.includes((story.story_id || story.id) as number);
          const loaded = !!thumbLoaded[id];

          return (
            <div className={styles.item} key={id} onClick={() => openViewer(index)}>
              <div className={`${styles.ring} ${seen ? styles.openRing : styles.activeRing}`}>
                {!loaded && <div className={styles.avatarPlaceholder} />}
                <img
                  src={image}
                  alt={title}
                  className={`${styles.avatar} ${loaded ? styles.imageVisible : styles.imageHidden}`}
                  loading="lazy"
                  onLoad={() =>
                    setThumbLoaded((prev) => ({
                      ...prev,
                      [id]: true,
                    }))
                  }
                />
              </div>
              <span className={styles.title}>{title}</span>
            </div>
          );
        }}
      />

      {viewerOpen && activeStory && current && (
        <div className={styles.viewer} onClick={closeViewer}>
          <div className={styles.storyBox} onClick={(e) => e.stopPropagation()}>
            <div className={styles.progressWrapper}>
              {activeStory.slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`${styles.progressBar} ${
                    index < currentSlide ? styles.doneProgress : ""
                  }`}
                >
                  {index === currentSlide && (
                    <div
                      key={`${currentStoryId}-${currentSlide}-${progressKey}`}
                      className={`${styles.progressFill} ${
                        (current.type === "image" && slideImageLoaded) ||
                        (current.type === "video" && videoReady)
                          ? styles.progressRunning
                          : ""
                      }`}
                      style={{ animationDuration: `${slideDuration}ms` }}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className={styles.viewerHeader}>
              <div className={styles.storeInfo}>
                <div className={styles.headerAvatarBox}>
                  {!headerAvatarLoaded && <div className={styles.headerAvatarPlaceholder} />}
                  <img
                    src={activeStory.store.image}
                    alt={activeStory.store.title}
                    className={`${styles.headerAvatar} ${
                      headerAvatarLoaded ? styles.imageVisible : styles.imageHidden
                    }`}
                    loading="lazy"
                    onLoad={() => setHeaderAvatarLoaded(true)}
                  />
                </div>
                <span className={styles.headerTitle}>{activeStory.store.title}</span>
              </div>

              <button className={styles.closeBtn} onClick={closeViewer}>
                ×
              </button>
            </div>

            <div className={styles.viewerContent}>
              {current.type === "image" && (
                <div className={styles.viewerMediaBox}>
                  {!slideImageLoaded && <div className={styles.viewerMediaPlaceholder} />}
                  <img
                    key={current.payload.url}
                    src={current.payload.url}
                    alt={activeStory.store.title}
                    className={`${styles.viewerImage} ${
                      slideImageLoaded ? styles.imageVisible : styles.imageHidden
                    }`}
                    onLoad={() => setSlideImageLoaded(true)}
                  />
                </div>
              )}

              {current.type === "video" && (
                <div className={styles.viewerMediaBox}>
                  {!videoReady && (
                    <div className={styles.viewerMediaPlaceholder}>
                      {current.payload.thumbnail && (
                        <img
                          src={current.payload.thumbnail}
                          alt={activeStory.store.title}
                          className={`${styles.viewerImage} ${styles.imageVisible}`}
                        />
                      )}
                    </div>
                  )}

                  <video
                    key={current.payload.url}
                    ref={videoRef}
                    src={current.payload.url}
                    className={`${styles.viewerImage} ${
                      videoReady ? styles.imageVisible : styles.imageHidden
                    }`}
                    autoPlay
                    playsInline
                    preload="metadata"
                    onLoadedMetadata={(e) => {
                      const duration = e.currentTarget.duration;
                      if (Number.isFinite(duration) && duration > 0) {
                        setSlideDuration(duration * 1000);
                      } else {
                        setSlideDuration(DEFAULT_IMAGE_DURATION);
                      }
                    }}
                    onCanPlay={() => {
                      setVideoReady(true);
                      setProgressKey((prev) => prev + 1);
                    }}
                  />
                </div>
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
