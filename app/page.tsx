import Stories from "./components/Stories/Stories";
import SearchBar from "./components/SearchBar/SearchBar";
import CategoryScroller from "./components/Categories/CategoryScroller";
import BannerSlider from "./components/Banner/BannerSlider";
import SpecialScroller from "./components/Special/SpecialScroller";

export default function Home() {
  return (
    <main>
      <Stories />
      <SearchBar />
      <CategoryScroller />
      <BannerSlider />
      <SpecialScroller />
    </main>
  );
}
