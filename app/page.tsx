"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Loading from "./components/LoadingHome/Loading";
import HomeSection from "./components/HomeSection/HomeSection";



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

const Stories = dynamic(() => import("./components/Stories/Stories"), { ssr: false });
const SearchBar = dynamic(() => import("./components/SearchBar/SearchBar"), { ssr: false });
const BannerSlider = dynamic(() => import("./components/Banner/BannerSlider"), { ssr: false });
const SpecialScroller = dynamic(() => import("./components/Special/SpecialScroller"), { ssr: false });
const CategoryScroller = dynamic(() => import("./components/Categories/CategoryScroller"), { ssr: false });
const StoresList = dynamic(() => import("./components/StoresList/StoresList"), { ssr: false });
const Reels = dynamic(() => import("./components/Reels/Reels"), { ssr: false });

export default function Home() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://api1.renn.ir/home");
        const json: HomeResponse = await res.json();
  
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
              <HomeSection key={index} height={110}>
                <Stories items={section.data.items} />
              </HomeSection>
            );

          case "search":
            return (
              <HomeSection key={index} height={60} priority>
                <SearchBar placeholder={section.data.placeholder} />
              </HomeSection>
            );

          case "categories":
            return (
              <HomeSection key={index} height={150}>
                <CategoryScroller items={section.data.items} />
              </HomeSection>
            );

          case "banner_slider":
            return (
              <HomeSection key={index} height={180}>
                <BannerSlider items={section.data.items} />
              </HomeSection>
            );

          case "special_offers":
            return (
              <HomeSection key={index} height={320}>
                <SpecialScroller
                  items={section.data.items}
                  title={section.data.title}
                />
              </HomeSection>
            );

          case "stores_list":
            return (
              <HomeSection key={index} height={260}>
                <StoresList
                  title={section.data.title}
                  showMore={section.data.showMore}
                  items={section.data.items || []}
                  slug={section.data.slug}
                />
              </HomeSection>
            );

          case "reels":
            return (
              <HomeSection key={index} height={240}>
                <Reels
                  items={section.data.items}
                  title={section.data.title}
                  slug={section.data.slug}
                />
              </HomeSection>
            );

          default:
            return null;
        }
      })}
    </main>
  );
}
