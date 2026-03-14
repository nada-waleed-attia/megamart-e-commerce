import Header from "./components/header";
import Header2 from "./components/header2";
import Header3 from "./components/header3";
import HeroSection from "./components/HERO.SECTION/hero.section";
import Slider2 from "./components/SLIDER2/slider2";
import CategoriesSection from "./components/slider3/slider3";
import BrandsSlider from "./components/slider4/slider4";
import DailyEssentials from "./components/slider5/slider5";
import Footer from "./components/FOOTER/footer";

export default function Home() {
  return (
    <>
      <Header />
      <Header2 />
      <Header3 />
      <HeroSection />
      <Slider2 />
      <CategoriesSection />
      <BrandsSlider />
      <DailyEssentials />
      <Footer />
    </>
  );
}
