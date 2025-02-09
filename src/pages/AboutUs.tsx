import { HeroSection } from '../components/about/HeroSection';
import { CEOSectionView } from '../components/about/CEOSectionView';
import { AboutSection } from '../components/about/AboutSection';
import { MissionVisionSection } from '../components/about/MissionVisionSection';
import { StatisticsSection } from '../components/StatisticsSection';
import { TeamSection } from '../components/about/TeamSection';

export default function AboutUs() {
  return (
    <main className="overflow-hidden pt-20">
      <HeroSection type = "About" />
      <CEOSectionView />
      <AboutSection />
      <MissionVisionSection />
      <StatisticsSection />
      <TeamSection />
    </main>
  );
}