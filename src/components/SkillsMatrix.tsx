import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Cpu, 
  Eye, 
  Server, 
  Database, 
  Layout, 
  GitBranch, 
  CheckCircle2
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';

export const SkillsMatrix: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const icons = [Cpu, Eye, Server, Database, Layout, GitBranch];

  return (
    <section id="skills" className="py-24 bg-[#FAF7F2] border-t border-[#E3DACD] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/20 text-charcoal text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Code2 className="w-3.5 h-3.5 text-amber-dark" />
            <span>Master Skill Inventory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight font-sans">
            Technical Stack & Production Proficiencies
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted mt-3">
            Grounded in production deployments: from zero-shot computer vision pipelines to distributed Model Context Protocol (MCP) multi-agent architectures.
          </p>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {skillCategories.map((category, idx) => {
            const Icon = icons[idx % icons.length];
            const isActive = activeCategory === idx;

            return (
              <button
                key={category.title}
                onClick={() => {
                  sounds.playTap();
                  setActiveCategory(idx);
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-charcoal text-white shadow-sm ring-2 ring-amber/50'
                    : 'bg-white border border-[#E5DDCF] text-charcoal-muted hover:border-charcoal/30 hover:text-charcoal'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber' : 'text-charcoal-muted'}`} />
                <span>{category.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Skills Grid */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E3DACD] shadow-elevated">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#EAE2D5] gap-2">
            <div>
              <h3 className="text-xl font-extrabold text-charcoal font-sans">
                {skillCategories[activeCategory].title}
              </h3>
              <p className="text-xs text-charcoal-muted font-mono mt-0.5">
                {skillCategories[activeCategory].description}
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-ecru-100 text-charcoal border border-[#E5DDCF] self-start sm:self-auto">
              {skillCategories[activeCategory].skills.length} Capabilities Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillCategories[activeCategory].skills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC9] hover:border-amber hover:shadow-sm transition-all group"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="text-sm font-bold text-charcoal font-sans group-hover:text-amber-dark transition-colors">
                    {skill.name}
                  </h4>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    skill.level === 'Expert' 
                      ? 'bg-amber text-charcoal-deep' 
                      : 'bg-charcoal text-white'
                  }`}>
                    {skill.level}
                  </span>
                </div>

                {skill.highlight && (
                  <div className="flex items-start gap-1.5 mt-2 pt-2 border-t border-[#EAE2D5]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-charcoal-muted font-medium leading-tight">
                      {skill.highlight}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
