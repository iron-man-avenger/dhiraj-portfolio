import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderKanban, 
  Layers, 
  ShieldCheck, 
  X, 
  ArrowUpRight,
  BrainCircuit
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
    <section id="projects" className="py-24 bg-[#F7F2EB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1 rounded-md bg-amber/20 text-charcoal">
                <FolderKanban className="w-4 h-4 text-amber-dark" />
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-charcoal-muted">
                Engineered In Production
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight font-sans">
              Flagship Projects & Case Studies
            </h2>
            <p className="text-sm sm:text-base text-charcoal-muted mt-2 max-w-2xl">
              Systems designed for real-world enterprise constraints: self-correcting logic verification, multi-tenant database isolation, and high-throughput document intelligence.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sounds.playTap();
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-charcoal text-white shadow-sm ring-2 ring-amber/50'
                    : 'bg-white border border-[#E5DDCF] text-charcoal-muted hover:border-charcoal/30 hover:text-charcoal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group bg-white rounded-3xl border border-[#E3DACD] p-6 flex flex-col justify-between hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 relative"
            >
              <div>
                {/* Card Top: Category & Company */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-md bg-ecru-100 text-charcoal border border-[#E5DDCF]">
                    {project.category}
                  </span>
                  <span className="text-[11px] font-mono text-charcoal-muted">
                    {project.company.split(' ')[0]}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-charcoal font-sans leading-snug group-hover:text-amber-dark transition-colors mb-2">
                  {project.title}
                </h3>

                <p className="text-xs text-charcoal-muted leading-relaxed mb-4 line-clamp-3">
                  {project.summary}
                </p>

                {/* Key Metric Highlight Box */}
                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC9] mb-4">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-dark shrink-0 mt-0.5" />
                    <p className="text-[11px] text-charcoal font-medium leading-tight">
                      <strong className="text-charcoal font-bold">Differentiator:</strong> {project.highlight}
                    </p>
                  </div>
                </div>

                {/* Metric Strip */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {project.metrics.slice(0, 2).map((m, mIdx) => (
                    <div key={mIdx} className="p-2 rounded-xl bg-white border border-[#E5DDCF]/80">
                      <span className="text-[10px] font-mono text-charcoal-muted block">{m.label}</span>
                      <span className="text-xs font-bold text-charcoal font-mono">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#EAE2D5] mb-4">
                  {project.techStack.slice(0, 4).map((tech, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-ecru-100 text-charcoal-muted border border-[#E5DDCF]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber/15 text-charcoal">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                {/* Deep Dive Action Button */}
                <button
                  onClick={() => handleOpenModal(project)}
                  className="w-full py-2.5 rounded-xl bg-ecru-50 hover:bg-charcoal hover:text-white text-charcoal font-semibold text-xs border border-[#E0D5C3] transition-all flex items-center justify-center gap-1.5 shadow-sm group-hover:border-charcoal"
                >
                  <span>Examine System Architecture</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Deep-Dive Case Study Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-charcoal/70 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-3xl border border-[#E3DACD] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto my-auto"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-6 right-6 p-2 rounded-xl bg-white border border-[#E5DDCF] text-charcoal-muted hover:text-charcoal hover:bg-ecru-100 transition-colors shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="pr-12 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-amber text-charcoal-deep">
                    {activeModalProject.category}
                  </span>
                  <span className="text-xs font-mono text-charcoal-muted">
                    {activeModalProject.company} • {activeModalProject.period}
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-charcoal font-sans leading-tight">
                  {activeModalProject.title}
                </h3>
                <p className="text-sm font-medium text-charcoal-muted mt-1 font-mono">
                  {activeModalProject.subtitle}
                </p>
              </div>

              {/* Metrics Banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 p-4 rounded-2xl bg-white border border-[#E5DDCF]">
                {activeModalProject.metrics.map((m, idx) => (
                  <div key={idx}>
                    <span className="text-[10px] font-mono text-charcoal-muted uppercase tracking-wider block">
                      {m.label}
                    </span>
                    <span className="text-sm font-bold text-charcoal font-mono mt-0.5 block">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Visual System Architecture Diagram */}
              <ProjectArchitectureDiagram projectId={activeModalProject.id} />

              {/* Architecture Breakdown if available */}
              {activeModalProject.architectureBreakdown && (
                <div className="mb-6 p-4 rounded-2xl bg-[#EFE9DF] border border-[#E0D5C3]">
                  <h4 className="text-xs font-bold font-mono text-charcoal-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BrainCircuit className="w-4 h-4 text-amber-dark" />
                    End-to-End Orchestration Topology
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div>
                      <strong className="text-charcoal">Ingestion:</strong> {activeModalProject.architectureBreakdown.input}
                    </div>
                    <div>
                      <strong className="text-charcoal">Orchestration:</strong> {activeModalProject.architectureBreakdown.orchestration}
                    </div>
                    <div>
                      <strong className="text-charcoal">Verification:</strong> {activeModalProject.architectureBreakdown.verification}
                    </div>
                    <div>
                      <strong className="text-charcoal">Output Streaming:</strong> {activeModalProject.architectureBreakdown.output}
                    </div>
                  </div>
                </div>
              )}

              {/* Detailed Bullets */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-charcoal mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-dark" />
                  Key Engineering Contributions
                </h4>
                <ul className="space-y-2.5">
                  {activeModalProject.bullets.map((bullet, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-charcoal-muted flex items-start gap-2.5 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber mt-2 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Architectural Lessons / Talking Points */}
              {activeModalProject.keyLessons && activeModalProject.keyLessons.length > 0 && (
                <div className="mb-6 pt-4 border-t border-[#E5DDCF]">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal mb-3">
                    Architectural Differentiators & Hard Lessons
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {activeModalProject.keyLessons.map((lesson, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-white border border-[#E5DDCF]">
                        <span className="text-xs font-bold text-amber-dark font-mono block mb-1">
                          {lesson.concept}
                        </span>
                        <p className="text-xs text-charcoal-muted leading-relaxed">
                          {lesson.meaning}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack Full Tag Cloud */}
              <div className="pt-4 border-t border-[#E5DDCF]">
                <h4 className="text-xs font-mono font-bold text-charcoal-muted uppercase tracking-wider mb-2">
                  Complete Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.techStack.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-ecru-100 text-charcoal border border-[#E0D5C3]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
