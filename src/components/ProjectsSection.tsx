import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { 
  X, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { projects } from '../data/portfolioData';
import type { Project } from '../types';
import { sounds } from '../utils/soundEffects';
import { ProjectArchitectureDiagram } from './ProjectArchitectureDiagram';
import { CountUpText, MaskedWords, RiseText, SectionRule, Stagger } from './motion/primitives';
import { EXPO_OUT, staggerItem } from './motion/tokens';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [modalOrigin, setModalOrigin] = useState({ x: 0, y: 0 });

  const categories = ['All', 'Agentic AI', 'Document AI', 'Computer Vision', 'Full-Stack Platform'];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const handleOpenModal = (project: Project, from: HTMLElement) => {
    sounds.playTap();
    const card = (from.closest('[data-project-card]') ?? from).getBoundingClientRect();
    setModalOrigin({
      x: card.left + card.width / 2 - innerWidth / 2,
      y: card.top + card.height / 2 - innerHeight / 2,
    });
    setActiveModalProject(project);
  };

  const handleCloseModal = () => {
    sounds.playTap();
    setActiveModalProject(null);
  };

  return (
    <section id="projects" className="pt-6 sm:pt-8 pb-16 sm:pb-20 bg-[#F7F2EB] relative">
      <SectionRule />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-5 sm:gap-6">
          <div>
            <RiseText className="mb-2" innerClassName="text-xs font-mono font-bold uppercase tracking-widest text-[#2B302C] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2B302C]" />
              <span>Selected Works</span>
            </RiseText>
            <MaskedWords className="text-3xl sm:text-4xl font-extrabold text-[#2B302C] tracking-tight font-sans" text="Flagship Engineering Projects" />
            <RiseText delay={0.25} className="text-sm sm:text-base text-charcoal-muted mt-2 max-w-xl font-normal leading-relaxed">
              Production systems designed for strict reliability: multi-agent routing, self-correcting logic, and document AI.
            </RiseText>
          </div>

          {/* Minimalist Filter Tabs */}
          <div className="flex flex-wrap gap-1 p-1 bg-[#F7F2EB] rounded-2xl md:rounded-full border border-[#E3DACD] self-start md:self-auto shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sounds.playPillSelect();
                  setSelectedCategory(cat);
                }}
                className={`relative px-3.5 py-1.5 rounded-xl md:rounded-full text-xs font-semibold transition-colors duration-200 ${
                  selectedCategory === cat
                    ? 'text-charcoal-deep font-bold'
                    : 'text-charcoal-muted hover:text-charcoal hover:bg-black/[0.04]'
                }`}
              >
                {selectedCategory === cat && (
                  <motion.span
                    layoutId="project-filter"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    className="absolute inset-0 rounded-xl md:rounded-full bg-amber shadow-sm"
                  />
                )}
                <span className="relative">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Clean, Editorial Projects Grid with Primary Color Accents */}
        <LayoutGroup>
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout" initial={false}>
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              data-project-card
              layout
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.9, ease: EXPO_OUT, delay: (idx % 2) * 0.08, layout: { duration: 0.6, ease: EXPO_OUT } }}
              className="p-5 sm:p-7 md:p-8 rounded-3xl bg-[#F7F2EB] border border-[#E3DACD] hover:border-amber/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Meta Top Line with Primary Amber Category Pill */}
                <div className="flex items-center justify-between text-xs font-mono text-charcoal-muted mb-3.5">
                  <span className="font-semibold text-charcoal">{project.company}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber/10 text-amber-dark border border-amber/25">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-charcoal font-sans leading-snug group-hover:text-amber-dark transition-colors mb-1.5">
                  {project.title}
                </h3>

                {/* Subtitle / Architectural Role */}
                <p className="text-xs font-mono text-amber-dark font-medium mb-3">
                  {project.subtitle}
                </p>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-4 font-normal">
                  {project.summary}
                </p>

                {/* Architectural Differentiator Highlight Box (Instant Scannability) */}
                <div className="p-3.5 rounded-2xl bg-[#F7F2EB] border border-[#E3DACD]/80 mb-5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-charcoal-muted font-bold mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber" />
                    <span>Architectural Differentiator</span>
                  </div>
                  <p className="text-xs text-charcoal font-medium leading-relaxed">
                    {project.highlight}
                  </p>
                </div>

                {/* Clean Metrics Grid with Highlighted Metric Values */}
                <div className="pt-3 border-t border-[#EAE2D5] grid grid-cols-2 gap-2 text-xs font-mono mb-5">
                  {project.metrics.slice(0, 4).map((m, mIdx) => (
                    <div key={mIdx} className="p-2 rounded-xl bg-[#F7F2EB] border border-[#E5DDCF]/70">
                      <span className="text-[10px] text-charcoal-muted block truncate">{m.label}</span>
                      <strong className="text-xs font-bold text-charcoal group-hover:text-amber-dark transition-colors truncate block">
                        <CountUpText text={m.value} />
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link with Primary Accent Icon Badge */}
              <button
                onClick={(e) => handleOpenModal(project, e.currentTarget)}
                className="inline-flex items-center gap-2 text-xs font-bold text-charcoal hover:text-amber-dark transition-colors pt-2 self-start group/btn"
              >
                <span>Examine System Architecture & Case Study</span>
                <div className="w-6 h-6 rounded-full bg-amber/15 flex items-center justify-center text-amber-dark group-hover/btn:bg-amber group-hover/btn:text-charcoal transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </div>
              </button>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>
        </LayoutGroup>
      </div>

      {/* Deep-Dive Case Study Modal (Editorial, Spacious, Zero Garbage Clutter) */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div
            key="case-study"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.1 } }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.target === e.currentTarget && handleCloseModal()}
            className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-charcoal/70 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.4, x: modalOrigin.x, y: modalOrigin.y }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.4, x: modalOrigin.x, y: modalOrigin.y }}
              transition={{ duration: 0.6, ease: [0.87, 0, 0.13, 1] }}
              className="relative w-full max-w-4xl bg-[#F7F2EB] rounded-2xl sm:rounded-3xl border border-[#E3DACD] shadow-2xl p-4 sm:p-7 md:p-10 max-h-[92vh] sm:max-h-[90vh] overflow-y-auto my-auto"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 rounded-full border border-[#E5DDCF] bg-[#F7F2EB] text-charcoal-muted hover:text-charcoal hover:bg-ecru-200 transition-colors z-20 shadow-2xs"
                aria-label="Close"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Header */}
              <div className="pr-10 sm:pr-14 mb-6 sm:mb-8">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-charcoal-muted mb-2">
                  <span className="text-amber-dark font-bold">{activeModalProject.category}</span>
                  <span>•</span>
                  <span className="font-semibold text-charcoal">{activeModalProject.company}</span>
                  <span>•</span>
                  <span>{activeModalProject.period}</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-charcoal font-sans tracking-tight leading-tight">
                  {activeModalProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-muted mt-1.5 font-mono leading-relaxed">
                  {activeModalProject.subtitle}
                </p>
              </div>

              {/* Clean Inline Stats Row - Responsive Mobile Safe */}
              <div className="py-3 sm:py-4 border-y border-[#E3DACD]/80 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-6 sm:mb-8">
                {activeModalProject.metrics.map((m, idx) => (
                  <div key={idx} className="p-2 sm:p-0 rounded-xl bg-black/[0.02] sm:bg-transparent min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-muted block truncate mb-0.5">
                      {m.label}
                    </span>
                    <CountUpText text={m.value} className="text-xs sm:text-sm md:text-base font-bold text-charcoal font-mono leading-snug block break-words" />
                  </div>
                ))}
              </div>

              {/* Minimalist System Architecture Flow */}
              <ProjectArchitectureDiagram projectId={activeModalProject.id} />

              {/* Key Contributions List */}
              <div className="mb-8">
                <h4 className="text-xs font-mono uppercase tracking-widest text-charcoal-muted font-bold mb-4">
                  Engineering Contributions
                </h4>
                <Stagger className="space-y-3" gap={0.06}>
                  {activeModalProject.bullets.map((bullet, idx) => (
                    <motion.div key={idx} variants={staggerItem} className="text-xs sm:text-sm text-charcoal-muted flex items-start gap-3 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber mt-2 shrink-0" />
                      <span>{bullet}</span>
                    </motion.div>
                  ))}
                </Stagger>
              </div>

              {/* Hard Lessons / Differentiators */}
              {activeModalProject.keyLessons && activeModalProject.keyLessons.length > 0 && (
                <div className="mb-8 pt-6 border-t border-[#E3DACD]/70">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-charcoal-muted font-bold mb-4">
                    Key Lessons & Architectural Decisions
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeModalProject.keyLessons.map((lesson, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-[#F7F2EB] border border-[#E5DDCF]">
                        <span className="text-xs font-bold text-charcoal font-sans block mb-1">
                          {lesson.concept}
                        </span>
                        <p className="text-xs text-charcoal-muted leading-relaxed font-normal">
                          {lesson.meaning}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack Cloud */}
              <div className="pt-6 border-t border-[#E3DACD]/70 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-charcoal-muted font-bold mr-2">Technologies:</span>
                {activeModalProject.techStack.map((tech, idx) => (
                  <span 
                    key={idx}
                    className="text-xs font-mono text-charcoal px-2.5 py-1 rounded-md bg-[#F7F2EB] border border-[#E5DDCF]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
