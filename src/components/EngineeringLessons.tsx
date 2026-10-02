import React from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  ShieldAlert
} from 'lucide-react';
import { engineeringPrinciples } from '../data/portfolioData';

export const EngineeringLessons: React.FC = () => {

  return (
    <section id="principles" className="py-24 bg-[#EFE9DF]/40 border-t border-[#E3DACD] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1 rounded-md bg-amber/20 text-charcoal">
                <Lightbulb className="w-4 h-4 text-amber-dark" />
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-charcoal-muted">
                Under The Hood
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight font-sans">
              Engineering Mindset & Production Principles
            </h2>
            <p className="text-sm sm:text-base text-charcoal-muted mt-2 max-w-2xl">
              Anyone can call an LLM API. The real craft lies in understanding where models fail, guarding against silent data corruption, and building deterministic safety belts.
            </p>
          </div>

          <div className="handwriting text-2xl sm:text-3xl text-charcoal font-bold transform -rotate-3 select-none">
            "Code decides, models only observe"
          </div>
        </div>

        {/* Principles Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engineeringPrinciples.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 rounded-3xl bg-white border border-[#E3DACD] shadow-sm hover:shadow-elevated transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-charcoal text-white">
                    Rule 0{idx + 1}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-amber" />
                </div>

                <h3 className="text-base font-bold text-charcoal font-sans mb-3">
                  {item.title}
                </h3>

                <blockquote className="p-3.5 rounded-2xl bg-ecru-50 border-l-4 border-amber text-xs font-medium text-charcoal italic mb-4 leading-relaxed font-sans">
                  "{item.quote}"
                </blockquote>
              </div>

              <div className="pt-3 border-t border-[#EAE2D5]">
                <span className="text-[10px] font-mono uppercase font-bold text-amber-dark block mb-1">
                  How I applied it:
                </span>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  {item.application}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Case: The 79% Silent Drift Investigation */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-charcoal text-white border border-charcoal-border shadow-elevated">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/20 text-amber text-xs font-mono font-bold mb-3">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Production Incident Autopsy</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-sans tracking-tight mb-2">
                Diagnosing the 79% Silent Taxonomy Drift Defect (12,087 Mappings)
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                When a client benchmarking taxonomy expanded from 31 to 70 categories without re-keying the stored artifacts, predictions emitted codes that contradicted their own labels. Every check passed because old codes fell within the new valid integer range.
                <br /><br />
                <strong>The Engineering Solution:</strong> Rather than patching constants, I re-architected the pipeline to derive vocabulary dynamically from the live database catalog, making taxonomic drift structurally impossible to recur.
              </p>
            </div>

            <div className="lg:col-span-4 p-5 rounded-2xl bg-charcoal-card border border-charcoal-border flex flex-col justify-center">
              <span className="text-[11px] font-mono text-charcoal-faded uppercase tracking-wider block">
                Impact Metric
              </span>
              <span className="text-3xl font-extrabold font-mono text-amber mt-1">
                12,087 / 12,087
              </span>
              <span className="text-xs text-gray-300 font-sans mt-1">
                Records verified with byte-level point-in-time rollback protection.
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
