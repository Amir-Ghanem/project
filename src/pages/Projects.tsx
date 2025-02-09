import { HeroSection } from "../components/about/HeroSection";
import { ProjectsGrid } from "../components/ProjectsGrid";
import { ProjectsSlider } from "../components/ProjectsSlider";


export default function Projects() {
  return (
    <main className="overflow-hidden pt-20">
      <HeroSection 
      type ="Projects"
      />
      <ProjectsGrid />
     
    </main>
  );
}