"use client";
import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";

interface Section {
  type: string;
  data: {
    items?: any[];
    title?: string;
    placeholder?: string;
    showMore?: boolean;
    slug?: string;
  };
}

interface HomeResponse {
  data: {
    sections: Section[];
  };
}
import Loading from "./components/LoadingHome/Loading"
const Stories = dynamic(() => import("./components/Stories/Stories"),{ ssr: false });
const SearchBar = dynamic(() => import("./components/SearchBar/SearchBar"), { ssr: false });
const BannerSlider = dynamic(() => import("./components/Banner/BannerSlider"), { ssr: false });
const SpecialScroller = dynamic(() => import("./components/Special/SpecialScroller"),{ ssr: false });
const CategoryScroller = dynamic(() => import("./components/Categories/CategoryScroller"),{ ssr: false });
const StoresList = dynamic(() => import("./components/StoresList/StoresList"),{ ssr: false });
const Reels = dynamic(() => import("./components/Reels/Reels"),{ ssr: false });


export default function Home() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://api1.renn.ir/home");
        const json = await res.json();
        setSections(json.data.sections);
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }


  return (
    <main>
      {sections.map((section, index) => {
        switch (section.type) {
          case "stories":
            return (
              <Suspense key={index} fallback={<div className="h-20 animate-pulse bg-gray-100 mb-4" />}>
                <Stories items={section.data.items} />
              </Suspense>
            );

          case "search":
            return (
              <Suspense key={index} fallback={<div className="h-12 animate-pulse bg-gray-100 mb-4" />}>
                <SearchBar placeholder={section.data.placeholder} />
              </Suspense>
            );

          case "categories":
            return (
              <Suspense key={index} fallback={<div className="h-32 animate-pulse bg-gray-100 mb-4" />}>
                <CategoryScroller items={section.data.items} />
              </Suspense>
            );

          case "banner_slider":
            return (
              <Suspense key={index} fallback={<div className="h-40 animate-pulse bg-gray-100 mb-4" />}>
                <BannerSlider items={section.data.items} />
              </Suspense>
            );

          case "special_offers":
            return (
              <Suspense key={index} fallback={<div className="h-64 animate-pulse bg-gray-100 my-4" />}>
                <SpecialScroller 
                  items={section.data.items} 
                  title={section.data.title} 
                />
              </Suspense>
            );

          case "stores_list":
            return (
              <Suspense key={index} fallback={<div className="h-48 animate-pulse bg-gray-100 mb-4" />}>
                <StoresList 
                  title={section.data.title}
                  showMore={section.data.showMore}
                  items={section.data.items || []}
                  slug={section.data.slug}
                />
              </Suspense>
            );

          case "reels":
            return (
              <Suspense key={index} fallback={<div className="h-48 animate-pulse bg-gray-100 mb-4" />}>
                <Reels 
                  items={section.data.items} 
                  title={section.data.title} 
                  slug={section.data.slug}
                />
              </Suspense>
            );

          default:
            return null;
        }
      })}
    </main>
  );
}
