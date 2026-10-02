import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ArrowUpRight
} from 'lucide-react';
import { projects } from '../data/portfolioData';
import type { Project } from '../types';
import { sounds } from '../utils/soundEffects';
import { ProjectArchitectureDiagram } from './ProjectArchitectureDiagram';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'Agentic AI', 'Document AI', 'Computer Vision', 'Full-Stack Platform'];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const handleOpenModal = (project: Project) => {
    sounds.playTap();
    setActiveModalProject(project);
  };

  const handleCloseModal = () => {
    sounds.playTap();
    setActiveModalProject(null);
  };

  return (
    <section id="projects" className="py-24 bg-[#F7F2EB] relative border-t border-[#E3DACD]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-dark block mb-2">
              Selected Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight font-sans">
              Flagship Engineering Projects
            </h2>
            <p className="text-sm sm:text-base text-charcoal-muted mt-2 max-w-xl font-normal leading-relaxed">
              Production systems designed for strict reliability: multi-agent routing, self-correcting logic, and document AI.
            </p>
          </div>

          {/* Minimalist Filter Tabs */}
          <div className="flex flex-wrap gap-1 p-1 bg-white/60 rounded-full border border-[#E3DACD] self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sounds.playTap();
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-charcoal text-white shadow-sm'
                    : 'text-charcoal-muted hover:text-charcoal hover:bg-black/[0.03]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Clean, Editorial Projects Grid (Zero Box Clutter) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-8 rounded-3xl bg-white/70 border border-[#E3DACD]/80 hover:bg-white hover:border-[#D5CABE] hover:shadow-elevated transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Meta Top Line */}
                <div className="flex items-center justify-between text-xs font-mono text-charcoal-muted mb-4">
                  <span className="font-semibold text-charcoal">{project.company}</span>
                  <span>{project.category}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-charcoal font-sans leading-snug group-hover:text-amber-dark transition-colors mb-3">
                  {project.title}
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-6 font-normal">
                  {project.summary}
                </p>

                {/* Clean Metrics Ticker (Inline text with subtle dot dividers, no chunky boxes) */}
                <div className="pt-4 border-t border-[#EAE2D5] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono mb-6">
                  {project.metrics.slice(0, 3).map((m, mIdx) => (
                    <div key={mIdx} className="flex items-center gap-1.5">
                      <span className="text-charcoal-muted">{m.label}:</span>
                      <strong className="text-charcoal font-semibold">{m.value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <button
                onClick={() => handleOpenModal(project)}
                className="inline-flex items-center gap-2 text-xs font-bold text-charcoal hover:text-amber-dark transition-colors pt-2 self-start group/btn"
              >
                <span>Examine System Architecture</span>
                <ArrowUpRight className="w-4 h-4 text-amber transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Deep-Dive Case Study Modal (Editorial, Spacious, Zero Garbage Clutter) */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-charcoal/70 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-3xl border border-[#E3DACD] shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto my-auto"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-6 right-6 p-2 rounded-full border border-[#E5DDCF] bg-white text-charcoal-muted hover:text-charcoal hover:bg-ecru-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="pr-12 mb-8">
                <div className="flex items-center gap-3 text-xs font-mono text-charcoal-muted mb-2">
                  <span className="text-amber-dark font-bold">{activeModalProject.category}</span>
                  <span>•</span>
                  <span>{activeModalProject.company}</span>
                  <span>•</span>
                  <span>{activeModalProject.period}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal font-sans tracking-tight">
                  {activeModalProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-muted mt-2 font-mono">
                  {activeModalProject.subtitle}
                </p>
              </div>

              {/* Clean Inline Stats Row (No heavy boxed grid) */}
              <div className="py-4 border-y border-[#E3DACD]/80 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {activeModalProject.metrics.map((m, idx) => (
                  <div key={idx}>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-muted block">
                      {m.label}
                    </span>
                    <span className="text-base font-bold text-charcoal font-mono mt-0.5 block">
                      {m.value}
                    </span>
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
                <ul className="space-y-3">
                  {activeModalProject.bullets.map((bullet, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-charcoal-muted flex items-start gap-3 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber mt-2 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hard Lessons / Differentiators */}
              {activeModalProject.keyLessons && activeModalProject.keyLessons.length > 0 && (
                <div className="mb-8 pt-6 border-t border-[#E3DACD]/70">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-charcoal-muted font-bold mb-4">
                    Key Lessons & Architectural Decisions
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeModalProject.keyLessons.map((lesson, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white/80 border border-[#E5DDCF]">
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
                    className="text-xs font-mono text-charcoal px-2.5 py-1 rounded-md bg-white border border-[#E5DDCF]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
