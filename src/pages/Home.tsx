import { HeroSlider } from '../components/HeroSlider';
import { AboutSection } from '../components/AboutSection';
import { MissionSection } from '../components/MissionSection';
import { ProjectsSlider } from '../components/ProjectsSlider';
import { TrustedBySection } from '../components/TrustedBySection';
import { StatisticsSection } from '../components/StatisticsSection';
import { PartnersSection } from '../components/PartnersSection';
import { BlogsSection } from '../components/BlogsSection';
import { ServicesSlider } from '../components/ServicesSlider';

export default function Home() {
  return (
    <main className="overflow-hidden pt-20">
      <HeroSlider />
      <AboutSection />
      <MissionSection />
      <ServicesSlider type ="Home"/>
      <ProjectsSlider type='Home' />
      <TrustedBySection />
      <StatisticsSection />
      <PartnersSection />
      <BlogsSection type='Home'/>
    </main>
  );
}