import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  RotateCcw, 
  ShieldCheck, 
  CheckCircle2
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface Scenario {
  id: string;
  name: string;
  query: string;
  routerTarget: string;
  verificationVerdict: string;
  stages: {
    title: string;
    description: string;
    tech: string;
    dataLog: string;
  }[];
  finalOutput: {
    title: string;
    resultText: string;
    stats: { label: string; value: string }[];
  };
}

export const AgentSimulator: React.FC = () => {
  const scenarios: Scenario[] = [
    {
      id: 'pnl-query',
      name: '1. NLP-to-SQL (Financial P&L)',
      query: 'Show last quarter’s beverage variance vs budget for site #4, breaking down wine and draft beer.',
      routerTarget: 'Accounting (P&L Specialist) + Sales Coordinator',
      verificationVerdict: '3/3 Verification Stages Passed (AST Valid, Invariants Reconciled, Zero Grain Mismatch)',
      stages: [
        {
          title: 'Context & Grounding',
          description: 'Fiscal calendar resolution ("last quarter" -> Q2 FY25). Scoped to site #4.',
          tech: 'Cosmos DB + BGE Embeddings',
          dataLog: 'RESOLVED: site_id=4, fiscal_quarter="2025-Q2", tenant="hospitality_uk"'
        },
        {
          title: 'Semantic Router',
          description: 'Dispatches to Accounting specialist. In-context dynamic few-shot retrieval.',
          tech: 'Azure OpenAI Orchestrator',
          dataLog: 'ROUTED: Specialist_Accounting_v2 | COSINE_SIM: 0.942'
        },
        {
          title: 'SQL Logic Judge',
          description: 'AST parser checks generated SQL against live schema and validates Row-Level Security.',
          tech: 'SQL AST Schema Parser',
          dataLog: 'JUDGE: AST syntactically valid. Tables: [gl_transactions, site_dim].'
        },
        {
          title: 'MCP Execution',
          description: 'Model Context Protocol (MCP) server runs query via Key Vault short-lived JWT.',
          tech: 'MCP Server + PostgreSQL RLS',
          dataLog: 'MCP_CALL: execute_sql() -> 42 rows in 18ms. JWT expired safely.'
        },
        {
          title: 'Invariant Critic',
          description: 'Deterministic math critic proves variance = actual - budget before final narration.',
          tech: 'Deterministic Math Critic',
          dataLog: 'INVARIANT_PASS: Sum(wine) + Sum(beer) == Total (£42,890.12). 0% discrepancy.'
        }
      ],
      finalOutput: {
        title: 'Verified Financial Answer Streamed via NDJSON',
        resultText: 'For Site #4 in Q2 FY25, total beverage expenditure was £42,890.12 against an approved budget of £39,500.00 (+£3,390.12 or +8.58% variance). Wine accounts for £2,410.00 of the overspend driven by vintage cellar restocking in May.',
        stats: [
          { label: 'Latency', value: '1.42s' },
          { label: 'Token Cache Hit', value: 'Yes (Cosmos 24h)' },
          { label: 'AST Status', value: 'Passed (0 errors)' },
          { label: 'Verification', value: '3/3 Active' }
        ]
      }
    },
    {
      id: 'invoice-ocr',
      name: '2. Papertrail: Invoice Extraction',
      query: 'Ingest Spanish multi-page supplier invoice (PDF) with handwritten delivery surcharge.',
      routerTarget: 'Document Intelligence + GPT-4o Vision + Arithmetic Engine',
      verificationVerdict: 'Arithmetic Reconciliation Caught $45.00 Tax Discrepancy -> Repaired in Code',
      stages: [
        {
          title: 'Document Layout',
          description: 'Azure Document Intelligence extracts raw tabular line items and bounding boxes.',
          tech: 'Azure Document Intelligence',
          dataLog: 'OCR_DONE: 18 line items detected, 3 pages processed. Recall: 98.4%'
        },
        {
          title: 'Header Identity',
          description: 'Focused GPT-4o Vision pass extracts vendor Tax ID (CIF) with mod11 checksum validation.',
          tech: 'GPT-4o Vision + Mod11',
          dataLog: 'VENDOR: Distribuciones Eléctricas S.L. | CIF: B82349102 (VALID)'
        },
        {
          title: 'Arithmetic Proof',
          description: 'Deterministic math engine sums line totals (€3,450.00) + 21% IVA (€724.50) vs printed Total.',
          tech: 'Deterministic Math Invariant',
          dataLog: 'MATH_CHECK: Lines sum (€3,450.00) + Tax (€724.50) == Total (€4,174.50).'
        },
        {
          title: 'Cost-Gated Guard',
          description: 'Since arithmetic reconciles, expensive second LLM re-read is skipped, preserving ~$0.03 cost.',
          tech: 'Cost-Gated AI Guard',
          dataLog: 'COST_GATE: Error proof: FALSE -> Second LLM pass SKIPPED.'
        },
        {
          title: 'Ledger Ready',
          description: 'Exported as validated structured JSON accounting record with 0% silent error risk.',
          tech: 'Ledger Normalizer',
          dataLog: 'EXPORT: 18 lines allocated to GL 5210. Ready for ledger insertion.'
        }
      ],
      finalOutput: {
        title: 'Reconciled Accounting Record Ready for Ledger Export',
        resultText: 'Invoice #ES-2025-881 successfully validated. 18 line items mapped to GL Account 5210 (Food & Beverage Purchases). VAT verified at 21% with valid EU intra-community checksum.',
        stats: [
          { label: 'Processing Time', value: '18.4s (Down from 52s)' },
          { label: 'Unit Cost', value: '$0.028' },
          { label: 'Reconciliation', value: '100% Invariant Match' },
          { label: 'Tax ID Check', value: 'Mod11 Valid' }
        ]
      }
    },
    {
      id: 'bar-vision',
      name: '3. Bar Vision: Video Inventory',
      query: 'Process 45s handheld phone video of back-bar liquor bottles with motion blur.',
      routerTarget: 'OWLv2 Open-Vocabulary Detection + Optical Flow RANSAC',
      verificationVerdict: 'Spatial Trajectory Recovery Eliminated 35% Cross-Frame Duplicates',
      stages: [
        {
          title: 'Zero-Shot OWLv2',
          description: 'Open-vocabulary prompts detect bottles without labelled training datasets.',
          tech: 'PyTorch + OWLv2',
          dataLog: 'ZERO_SHOT: Prompt ["liquor bottle", "spirits bottle"] -> 142 raw boxes'
        },
        {
          title: 'Camera Pose Recovery',
          description: 'Optical flow + RANSAC affine estimation tracks camera trajectory, sampling non-overlapping frames.',
          tech: 'Optical Flow + RANSAC',
          dataLog: 'RANSAC_POSE: Inlier ratio 0.95. Unified 6 fragmented segments into 1.'
        },
        {
          title: 'Spatial Dedup',
          description: 'Intersection-over-smaller suppression removes nested bottle-neck boxes and duplicates.',
          tech: 'Spatial Deduplication',
          dataLog: 'DEDUP: Removed 35% raw duplicate detections from panning overlap.'
        },
        {
          title: 'Liquid Regressor',
          description: 'Custom 2D CNN regresses fill fraction per bottle with grouped leave-one-group-out cross validation.',
          tech: '2D CNN Regressor',
          dataLog: 'LIQUID_LEVEL: Average fill 64.2%. 28 full, 12 partial bottles.'
        },
        {
          title: 'Review Manifest',
          description: 'Streamed to FastAPI async job queue with review flags for low-confidence items.',
          tech: 'FastAPI Async Queue',
          dataLog: 'MANIFEST: 40 distinct bottles mapped. Commercial license clean.'
        }
      ],
      finalOutput: {
        title: 'Deduplicated Stocktake Manifest Generated',
        resultText: 'Video processed successfully. Detected 40 distinct bottles across 4 shelving tiers. Spatial deduplication prevented 22 duplicate counts caused by camera panning.',
        stats: [
          { label: 'Distinct Bottles', value: '40 Counted' },
          { label: 'Inlier Ratio', value: '0.95 (from 0.41)' },
          { label: 'Duplicate Drop', value: '-35% Raw Boxes' },
          { label: 'License Class', value: '100% Commercial' }
        ]
      }
    }
  ];

  const [selectedScenario, setSelectedScenario] = useState<Scenario>(scenarios[0]);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  const startSimulation = () => {
    sounds.playClick();
    setIsRunning(true);
    setCompleted(false);
    setActiveStep(0);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < selectedScenario.stages.length) {
        sounds.playTap();
        setActiveStep(current);
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setCompleted(true);
        sounds.playSuccess();
      }
    }, 600);
  };

  const handleScenarioChange = (scenario: Scenario) => {
    sounds.playTap();
    setSelectedScenario(scenario);
    setActiveStep(-1);
    setIsRunning(false);
    setCompleted(false);
  };

  return (
    <section id="simulator" className="py-24 bg-[#FAF7F2] border-t border-[#E3DACD]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-dark block mb-2">
              Interactive Test Bench
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight font-sans">
              Pipeline Execution Simulator
            </h2>
            <p className="text-sm sm:text-base text-charcoal-muted mt-2 max-w-xl font-normal leading-relaxed">
              Test real production queries through Dhiraj's multi-agent routing, SQL AST judges, and arithmetic reconciliation.
            </p>
          </div>

          {/* Scenario Selector Tabs */}
          <div className="flex flex-wrap gap-1 p-1 bg-white/70 rounded-full border border-[#E3DACD] self-start md:self-auto">
            {scenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => handleScenarioChange(s)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedScenario.id === s.id
                    ? 'bg-charcoal text-white shadow-sm'
                    : 'text-charcoal-muted hover:text-charcoal hover:bg-black/[0.03]'
                }`}
              >
                {s.name.split('.')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Clean, Unified Terminal Console (Zero Clutter) */}
        <div className="rounded-3xl bg-[#1C201D] text-white p-6 sm:p-8 border border-charcoal-border shadow-elevated">
          
          {/* Query Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-charcoal-border/70 gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber font-bold block mb-1">
                Input Query
              </span>
              <p className="text-sm font-mono text-gray-200">
                "{selectedScenario.query}"
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={startSimulation}
                disabled={isRunning}
                className={`px-5 py-2.5 rounded-full font-bold text-xs font-mono flex items-center gap-2 transition-all ${
                  isRunning
                    ? 'bg-charcoal-muted text-gray-300 cursor-not-allowed'
                    : 'bg-amber text-charcoal-deep hover:bg-amber-light'
                }`}
              >
                {isRunning ? (
                  <>
                    <div className="w-3 h-3 border-2 border-charcoal-deep border-t-transparent rounded-full animate-spin" />
                    <span>Running...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-charcoal-deep" />
                    <span>Run Pipeline</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  sounds.playTap();
                  setActiveStep(-1);
                  setIsRunning(false);
                  setCompleted(false);
                }}
                className="p-2 rounded-full border border-charcoal-border text-gray-400 hover:text-white transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Minimalist Horizontal Step Progression */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pb-6 mb-6 border-b border-charcoal-border/50">
            {selectedScenario.stages.map((stage, idx) => {
              const isPast = activeStep > idx || completed;
              const isCurrent = activeStep === idx;

              return (
                <div 
                  key={idx}
                  className={`p-3 rounded-xl transition-all border ${
                    isCurrent
                      ? 'border-amber bg-amber/10'
                      : isPast
                      ? 'border-emerald-500/40 bg-white/5'
                      : 'border-transparent bg-transparent opacity-40'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 mb-1">
                    <span>0{idx + 1}</span>
                    {isPast && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    {isCurrent && <span className="w-2 h-2 rounded-full bg-amber animate-ping" />}
                  </div>
                  <div className="text-xs font-bold text-white font-sans">{stage.title}</div>
                  <div className="text-[10px] font-mono text-gray-400 mt-0.5 truncate">{stage.tech}</div>
                </div>
              );
            })}
          </div>

          {/* Real-Time Telemetry Logs & Streamed Output */}
          <div className="space-y-3 font-mono text-xs">
            <div className="min-h-[110px] space-y-1.5 text-gray-300">
              {activeStep === -1 && !completed && (
                <p className="text-gray-500 italic">
                  Press "Run Pipeline" above to execute verification stages...
                </p>
              )}

              {selectedScenario.stages.map((stage, idx) => {
                if (activeStep < idx && !completed) return null;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-amber">➜</span>
                    <span>
                      <strong className="text-white">[{stage.title}]</strong> {stage.dataLog}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Final Answer Banner */}
            {completed && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 border-t border-charcoal-border/70 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    [VERIFIED] {selectedScenario.verificationVerdict}
                  </span>
                  <span className="text-amber font-mono">Status: Streamed OK</span>
                </div>
                <p className="text-xs font-sans text-gray-200 bg-white/5 p-4 rounded-xl leading-relaxed">
                  {selectedScenario.finalOutput.resultText}
                </p>
              </motion.div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
