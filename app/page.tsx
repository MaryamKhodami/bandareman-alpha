import { Suspense } from "react";
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

const Stories = dynamic(() => import("./components/Stories/Stories"));
const SearchBar = dynamic(() => import("./components/SearchBar/SearchBar"));
const BannerSlider = dynamic(() => import("./components/Banner/BannerSlider"));
const SpecialScroller = dynamic(() => import("./components/Special/SpecialScroller"));
const CategoryScroller = dynamic(() => import("./components/Categories/CategoryScroller"));
const StoresList = dynamic(() => import("./components/StoresList/StoresList"));
const Reels = dynamic(() => import("./components/Reels/Reels"));

async function getHomeData(): Promise<HomeResponse> {
  const res = await fetch("https://api1.renn.ir/home", { cache: "no-store" });
  if (!res.ok) throw new Error("خطا در دریافت اطلاعات از سرور");
  return res.json();
}

export default async function Home() {
  const response = await getHomeData();
  const sections = response.data.sections;

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
