import { HeroSection } from "../components/about/HeroSection";
import { ServicesGrid } from "../components/ServicesGrid";
// import { ServicesSlider } from "../components/ServicesSlider";


export default function Service() {
  return (
    <main className="overflow-hidden pt-20">
      <HeroSection 
      type ="Service"
      />
      {/* <ServicesSlider type="Service"/> */}
      <ServicesGrid type="Service" />
     
    </main>
  );
}