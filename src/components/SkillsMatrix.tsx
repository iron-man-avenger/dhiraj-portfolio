import React from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '../data/portfolioData';
import { MaskedWords, RiseText, SectionRule } from './motion/primitives';
import { EXPO_OUT, VIEWPORT, popItem } from './motion/tokens';

export const SkillsMatrix: React.FC = () => {
  return (
    <section id="skills" className="pt-6 sm:pt-8 pb-16 sm:pb-20 bg-[#F7F2EB] relative">
      <SectionRule />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <RiseText className="mb-2" innerClassName="text-xs font-mono font-bold uppercase tracking-widest text-[#2B302C] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2B302C]" />
            <span>Technical Stack</span>
          </RiseText>
          <MaskedWords className="text-3xl sm:text-4xl font-extrabold text-[#2B302C] tracking-tight font-sans" text="Production Skills & Architectural Domains" />
          <RiseText delay={0.25} className="text-sm sm:text-base text-charcoal-muted mt-2 max-w-xl font-normal leading-relaxed">
            Technologies and engineering disciplines proven in production systems across multi-agent orchestration, document AI, and cloud backends.
          </RiseText>
        </div>

        {/* Clean, Editorial Skills Directory with Primary #2B302C Depth */}
        <div className="divide-y divide-[#E3DACD]/70 border-y border-[#E3DACD]/70">
          {skillCategories.map((category) => (
            <motion.div 
              key={category.title}
              initial="hidden"
              whileInView="shown"
              viewport={VIEWPORT}
              className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center transition-colors hover:bg-black/[0.01]"
            >
              {/* Category Name & Scope (4 cols) inside Primary #2B302C Box */}
              <motion.div
                variants={{
                  hidden: { clipPath: 'inset(0 100% 0 0 round 16px)' },
                  shown: { clipPath: 'inset(0 0% 0 0 round 16px)', transition: { duration: 0.9, ease: EXPO_OUT } },
                }}
                className="lg:col-span-4 p-5 rounded-2xl bg-[#2B302C] text-white border border-[#39403B] shadow-sm flex flex-col justify-center">
                <h3 className="text-sm sm:text-base font-bold text-white font-sans flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber shrink-0 shadow-xs" />
                  <span>{category.title}</span>
                </h3>
                <p className="text-xs text-white/75 font-mono mt-2 leading-relaxed font-normal">
                  {category.description}
                </p>
              </motion.div>

              {/* Skills List with Primary Accents on Expert Technologies (8 cols) */}
              <motion.div
                variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.035, delayChildren: 0.35 } } }}
                className="lg:col-span-8 flex flex-wrap gap-2.5 items-center"
              >
                {category.skills.map((skill) => {
                  const isExpert = skill.level === 'Expert';
                  return (
                    <motion.div
                      key={skill.name}
                      variants={popItem}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all shadow-2xs group ${
                        isExpert
                          ? 'bg-amber/[0.12] border border-amber/40 text-[#2B302C] hover:border-amber hover:bg-amber/20'
                          : 'bg-[#F7F2EB] border border-[#E3DACD] text-charcoal hover:border-amber/50 hover:bg-[#F7F2EB] hover:text-amber-dark'
                      }`}
                    >
                      <span className={`font-semibold ${isExpert ? 'text-[#2B302C] font-bold' : ''}`}>
                        {skill.name}
                      </span>
                      {isExpert && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2B302C] shrink-0" />
                      )}
                      {skill.highlight && (
                        <span className={`text-[10px] transition-colors ${
                          isExpert ? 'text-[#2B302C]/85 font-medium' : 'text-charcoal-muted group-hover:text-charcoal'
                        }`}>
                          — {skill.highlight}
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
