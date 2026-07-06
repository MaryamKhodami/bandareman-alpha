"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  height: number;
  priority?: boolean;
};

export default function HomeSection({
  children,
  height,
  priority = false,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(priority);

  useEffect(() => {
    if (priority || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "-50px 0px",
         threshold: 0.15,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [priority, visible]);

  return (
    <section ref={ref} style={{ minHeight: `${height}px` }}>
      {visible ? (
        children
      ) : (
        <div
          style={{
            width: "100%",
            height: `${height}px`,
            display: "block",
            backgroundColor: "var(--gray-dark)",
            borderRadius: "12px",
          }}
        />
      )}
    </section>
  );
}
