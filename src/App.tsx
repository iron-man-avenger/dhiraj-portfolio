import { useState } from 'react';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AgentSimulator } from './components/AgentSimulator';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsMatrix } from './components/SkillsMatrix';
import { EngineeringLessons } from './components/EngineeringLessons';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ArcadeGame } from './components/ArcadeGame';
import { sounds } from './utils/soundEffects';

export function App() {
  const [isArcadeOpen, setIsArcadeOpen] = useState(false);
  const [soundMuted, setSoundMuted] = useState(() => sounds.getMuted());

  const handleToggleSound = () => {
    const muted = sounds.toggleMute();
    setSoundMuted(muted);
  };

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2B302C] font-sans antialiased selection:bg-[#D4A066] selection:text-[#1E2320]">
      
      {/* Top Glass Navigation */}
      <Navbar
        onOpenArcade={() => setIsArcadeOpen(true)}
        soundMuted={soundMuted}
        onToggleSound={handleToggleSound}
      />

      <main className="relative overflow-x-clip">
        {/* Hero with Signature Interactive Bar Chart (Directly inspired by reference image) */}
        <Hero onOpenArcade={() => setIsArcadeOpen(true)} />

        {/* Live Multi-Agent & Verification Simulator */}
        <AgentSimulator />

        {/* In-Depth Flagship Projects & Case Studies */}
        <ProjectsSection />

        {/* Categorized Skills Inventory */}
        <SkillsMatrix />

        {/* Under the Hood: Engineering Lessons & Taxonomy Drift Autopsy */}
        <EngineeringLessons />

        {/* Work Experience, Awards & Certifications */}
        <ExperienceTimeline />

        {/* Direct Contact & Inquiry Dispatch */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Playable Mini-Game Modal */}
      <ArcadeGame
        isOpen={isArcadeOpen}
        onClose={() => setIsArcadeOpen(false)}
      />

    </div>
  );
}

export default App;
