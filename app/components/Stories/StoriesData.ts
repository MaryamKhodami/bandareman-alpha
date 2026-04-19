
export interface Slide {
  id: number;
  type: "image" | "video";
  url: string;
  duration?: number;
}

export interface storyItem {
  id: number;
  title: string;
  image: string;
  active: boolean;
  slides: Slide[];
}

export const storiesData: storyItem[] = [
  {
    id: 1,
    title: "بوکتاب",
    image: "/stores-story/booktab.png",
    active: true,
    slides: [
      { id: 1, type: "image", url: "/slides/s1-1.jpg" },
      { id: 2, type: "image", url: "/slides/s1-2.jpg" }
    ]
  },
  {
    id: 2,
    title: "هاکوپیان",
    image: "/stores-story/hacoupian.png",
    active: true,
    slides: [
      { id: 1, type: "image", url: "/slides/s2-1.jpg" }
    ]
  },
  {
    id: 3,
    title: "QFC",
    image: "/stores-story/qfc.png",
    active: true,
    slides: [
      { id: 1, type: "image", url: "/slides/s3-1.jpg" }
    ]
  },
  {
    id: 4,
    title: "لاویا",
    image: "/stores-story/lavia.png",
    active: true,
    slides: [
      { id: 1, type: "image", url: "/slides/s2-1.jpg" }
    ]
  },
  {
    id: 5,
    title: "شاورما مغربی",
    image: "/stores-story/maghrebi.png",
    active: true,
    slides: [
      { id: 1, type: "image", url: "/slides/s2-1.jpg" }
    ]
  },
  {
    id: 6,
    title: "اتاق فرار",
    image: "/stores-story/farar.png",
    active: true,
    slides: [
      { id: 1, type: "image", url: "/slides/s2-1.jpg" }
    ]
  }
];
