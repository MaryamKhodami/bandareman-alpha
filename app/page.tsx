import Stories from "./components/Stories/Stories";
import SearchBar from "./components/SearchBar/SearchBar";
import CategoryScroller from "./components/Categories/CategoryScroller";
import BannerSlider from "./components/Banner/BannerSlider";
import SpecialScroller from "./components/Special/SpecialScroller";
import { stores } from "@/data/Stores";
import Newest from "./components/StoresList/Newest";
import TopDiscount from "./components/StoresList/TopDiscount";
export default function Home() {
  return (
    <main>
      <Stories />
      <SearchBar />
      <CategoryScroller />
      <BannerSlider />
      <SpecialScroller />
      <Newest stores={stores} />
      <TopDiscount stores={stores} />

    </main>
  );
}
