import { HeroSection } from '../components/home/HeroSection';
import { LearningPath } from '../components/home/LearningPath';
import { ProjectGrid } from '../components/home/ProjectGrid';

export function Home() {
  return (
    <div>
      <HeroSection />
      <LearningPath />
      <ProjectGrid />
    </div>
  );
}
