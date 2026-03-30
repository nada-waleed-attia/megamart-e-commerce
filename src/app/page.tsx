import { Metadata } from "next";
import Header from "./components/header";
import Header2 from "./components/header2";
import Header3 from "./components/header3";
import HeroSection from "./components/HERO.SECTION/hero.section";
import Slider2 from "./components/SLIDER2/slider2";
import CategoriesSection from "./components/slider3/slider3";
import BrandsSlider from "./components/slider4/slider4";
import DailyEssentials from "./components/slider5/slider5";
import Footer from "./components/FOOTER/footer";
import StructuredData from "./components/seo/structured-data";

export const metadata: Metadata = {
  title: "الصفحة الرئيسية | متجر إلكتروني",
  description: "اكتشف أحدث المنتجات الإلكترونية والملابس في متجرنا. عروض حصرية على هواتف ذكية، لابتوبات، ساعات ذكية، ملابس رياضية من أفضل الماركات العالمية مثل نايكي، أبل، سامسونج، أديداس.",
  keywords: [
    "صفحة رئيسية",
    "متجر إلكتروني",
    "منتجات جديدة",
    "عروض حصرية",
    "هواتف ذكية",
    "لابتوبات",
    "ساعات ذكية",
    "ملابس رياضية",
    "ماركات عالمية",
    "تسوق أونلاين"
  ]
};

export default function Home() {
  return (
    <>
      <StructuredData type="WebSite" data={{}} />
      <StructuredData type="Organization" data={{}} />
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
