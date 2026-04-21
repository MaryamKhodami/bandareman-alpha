import Header from "./components/Header/Header";
import Stories from "./components/Stories/Stories";
import SearchBar from "./components/SearchBar/SearchBar";
import CategoryScroller from "./components/Categories/CategoryScroller";
import BannerSlider from "./components/Banner/BannerSlider";
export default function Home() {
  return (
    <main>
      <Header />
      <Stories />
      <SearchBar/>
      <CategoryScroller />
      <BannerSlider />
    </main>
  );
}