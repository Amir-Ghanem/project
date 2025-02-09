import { HeroSection } from "../components/about/HeroSection";
import { GridBlogs } from "../components/GridBlogs";


export default function Blogs() {
  return (
    <main className="overflow-hidden pt-20">
      <HeroSection 
      type ="News"
      />
     <GridBlogs type="News" />
     
    </main>
  );
}