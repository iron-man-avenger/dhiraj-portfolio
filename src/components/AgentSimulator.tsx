import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  RotateCcw, 
  ShieldCheck, 
  Cpu, 
  Search, 
  CheckCircle2, 
  Sparkles
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
    status: 'success' | 'verified' | 'repaired';
    dataLog: string;
  }[];
  finalOutput: {
    type: 'sql' | 'ocr' | 'cv';
    title: string;
    resultText: string;
    stats: { label: string; value: string }[];
  };
}

export const AgentSimulator: React.FC = () => {
  const scenarios: Scenario[] = [
    {
      id: 'pnl-query',
      name: '1. Multi-Agent NLP-to-SQL (Financial P&L)',
      query: 'Show last quarter’s beverage variance vs budget for site #4, breaking down wine and draft beer.',
      routerTarget: 'Accounting (P&L Specialist) + Sales Coordinator',
      verificationVerdict: '3/3 Verification Stages Passed (AST Valid, Invariants Reconciled, Zero Grain Mismatch)',
      stages: [
        {
          title: 'Layer 1: Context & Entity Grounding',
          description: 'Fiscal calendar resolution ("last quarter" -> Q2 FY25). Deterministic scan matches site #4 with client scope.',
          tech: 'Dynamic In-Context Grounding',
          status: 'success',
          dataLog: 'RESOLVED: site_id=4, fiscal_quarter="2025-Q2", tenant_ctx="client_hospitality_uk"'
        },
        {
          title: 'Layer 2: Semantic Router & Specialist',
          description: 'Router LLM selects Accounting specialist. Dynamic few-shot examples fetched from vector cache (Cosmos DB 24h TTL).',
          tech: 'Azure OpenAI + Few-Shot Retrieval',
          status: 'success',
          dataLog: 'AGENT: Specialist_Accounting_v2 | COSINE_SIM: 0.942 on cached template'
        },
        {
          title: 'Layer 3: Pre-Execution Logic Judge',
          description: 'LLM judge parses AST of generated SQL. Validates column schema against live catalog and verifies Row-Level Security parameters.',
          tech: 'SQL AST Parser + Schema Verifier',
          status: 'verified',
          dataLog: 'SQL_JUDGE: AST syntactically valid. Tables: [gl_transactions, site_dim]. No un-aliased joins.'
        },
        {
          title: 'Layer 4: MCP JSON-RPC Database Broker',
          description: 'Model Context Protocol (MCP) server securely mints short-lived JWT from Key Vault and runs read-only query on PostgreSQL with RLS.',
          tech: 'MCP Protocol + PostgreSQL RLS',
          status: 'success',
          dataLog: 'MCP_CALL: execute_sql() -> 42 rows returned in 18ms. JWT expired safely.'
        },
        {
          title: 'Layer 5: Post-Execution Invariant Critic',
          description: 'Deterministic math critic verifies variance = actual - budget. Answer critic confirms narration mentions zero hallucinated figures.',
          tech: 'Triple Deterministic Verifier',
          status: 'verified',
          dataLog: 'INVARIANT_CHECK: Sum(wine) + Sum(beer) == Group Total (£42,890.12). 0% discrepancy.'
        }
      ],
      finalOutput: {
        type: 'sql',
        title: 'Verified Financial Answer Streamed via NDJSON',
        resultText: 'For Site #4 in Q2 FY25, total beverage expenditure was £42,890.12 against an approved budget of £39,500.00 (+£3,390.12 or +8.58% variance). Wine accounts for £2,410.00 of the overspend driven by vintage cellar restocking in May.',
        stats: [
          { label: 'Latency', value: '1.42s' },
          { label: 'Token Cache Hit', value: 'Yes (Cosmos 24h)' },
          { label: 'AST Status', value: 'Passed (0 errors)' },
          { label: 'Verification Layers', value: '3 Active' }
        ]
      }
    },
    {
      id: 'invoice-ocr',
      name: '2. Papertrail: Self-Validating Invoice Extraction',
      query: 'Ingest Spanish multi-page supplier invoice (PDF) with handwritten delivery surcharge.',
      routerTarget: 'Document Intelligence + GPT-4o Vision + Arithmetic Engine',
      verificationVerdict: 'Arithmetic Reconciliation Caught $45.00 Tax Discrepancy -> Fixed via Deterministic Rule',
      stages: [
        {
          title: 'Layer 1: Document Layout & Text OCR',
          description: 'Azure Document Intelligence extracts raw tabular line items and bounding boxes without hallucinations.',
          tech: 'Azure Document Intelligence',
          status: 'success',
          dataLog: 'OCR_DONE: 18 line items detected, 3 pages processed. Bounding box recall: 98.4%'
        },
        {
          title: 'Layer 2: Header Identity Pass',
          description: 'Focused GPT-4o Vision pass extracts vendor Tax ID (CIF) and currency. Checksum validation (mod11) applied in code.',
          tech: 'GPT-4o Vision + Mod11 Checksum',
          status: 'success',
          dataLog: 'VENDOR: Distribuciones Eléctricas S.L. | CIF: B82349102 (Checksum: VALID)'
        },
        {
          title: 'Layer 3: Arithmetic Reconciliation Proof',
          description: 'Deterministic math engine sums line totals (€3,450.00) + 21% IVA (€724.50) vs printed Total (€4,174.50).',
          tech: 'Self-Validating Math Invariants',
          status: 'verified',
          dataLog: 'MATH_CHECK: Lines sum (€3,450.00) + Tax (€724.50) == Total (€4,174.50). Match verified.'
        },
        {
          title: 'Layer 4: Cost-Gated AI Guard',
          description: 'Since arithmetic reconciles perfectly, expensive AI re-read is suppressed, preserving ~$0.03 unit economics.',
          tech: 'Cost-Gated Execution Engine',
          status: 'verified',
          dataLog: 'COST_GATE: Error proof: FALSE -> Second LLM pass SKIPPED. Unit cost saved.'
        }
      ],
      finalOutput: {
        type: 'ocr',
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
      name: '3. Bar Vision: Zero-Shot Video Inventory',
      query: 'Process 45s handheld phone video of back-bar liquor bottles with motion blur.',
      routerTarget: 'OWLv2 Open-Vocabulary Detection + Optical Flow RANSAC',
      verificationVerdict: 'Spatial Trajectory Recovery Eliminated 35% Cross-Frame Duplicates',
      stages: [
        {
          title: 'Layer 1: OWLv2 Zero-Shot Detection',
          description: 'Open-vocabulary prompts detect bottles without training datasets, using intersection-over-smaller suppression.',
          tech: 'PyTorch + OWLv2',
          status: 'success',
          dataLog: 'ZERO_SHOT: Prompt ["liquor bottle", "spirits bottle"] -> 142 raw bounding boxes'
        },
        {
          title: 'Layer 2: Camera Trajectory Recovery',
          description: 'Lucas-Kanade optical flow + RANSAC affine estimation tracks camera pose, sampling only non-overlapping footprints.',
          tech: 'Optical Flow + RANSAC (0.95 Inliers)',
          status: 'verified',
          dataLog: 'RANSAC_POSE: Inlier ratio 0.95. Unified 6 fragmented segments into 1 continuous path.'
        },
        {
          title: 'Layer 3: 2D CNN Liquid Level Regression',
          description: 'Custom CNN regresses fill fraction per detected bottle with group-by-entity cross validation.',
          tech: 'PyTorch 2D CNN (MAE 0.144)',
          status: 'success',
          dataLog: 'LIQUID_REGRESSION: Average fill level: 64.2%. 28 bottles full, 12 partial.'
        }
      ],
      finalOutput: {
        type: 'cv',
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
    }, 700);
  };

  const handleScenarioChange = (scenario: Scenario) => {
    sounds.playTap();
    setSelectedScenario(scenario);
    setActiveStep(-1);
    setIsRunning(false);
    setCompleted(false);
  };

  return (
    <section id="simulator" className="py-24 bg-[#EFE9DF]/50 border-y border-[#E3DACD] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="p-1 rounded-md bg-amber/20 text-charcoal">
                <Cpu className="w-4 h-4 text-amber-dark" />
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-charcoal-muted">
                Interactive Architecture Lab
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight font-sans">
              Test Dhiraj’s Multi-Agent & Verification Engine
            </h2>
            <p className="text-sm sm:text-base text-charcoal-muted mt-2 max-w-2xl">
              Select a production scenario below and click <span className="font-semibold text-charcoal">"Run Verification Pipeline"</span> to watch real-time routing, schema AST checks, and deterministic mathematical critics in action.
            </p>
          </div>

          {/* Scenario Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {scenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => handleScenarioChange(s)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  selectedScenario.id === s.id
                    ? 'bg-charcoal text-white shadow-sm ring-2 ring-amber/50'
                    : 'bg-white/80 text-charcoal-muted border border-[#E0D7C9] hover:bg-white hover:text-charcoal'
                }`}
              >
                <span>{s.name.split(' ')[1]}</span>
                {selectedScenario.id === s.id && <Sparkles className="w-3 h-3 text-amber" />}
              </button>
            ))}
          </div>
        </div>

        {/* Main Interactive Stage Box */}
        <div className="bg-[#FAF7F2] rounded-3xl border border-[#E3DACD] p-6 sm:p-8 shadow-elevated">
          
          {/* Query Bar & Launch Control */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5DDCF] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 rounded-xl bg-ecru-100 text-charcoal mt-0.5 border border-[#E5DDCF]">
                <Search className="w-4 h-4 text-amber-dark" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-charcoal-muted uppercase tracking-wider block">
                  Simulated Input Request
                </span>
                <p className="text-sm font-semibold text-charcoal mt-0.5 font-sans">
                  "{selectedScenario.query}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={startSimulation}
                disabled={isRunning}
                className={`px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-sm ${
                  isRunning
                    ? 'bg-charcoal-muted text-white cursor-not-allowed'
                    : 'bg-amber text-charcoal-deep hover:bg-amber-light hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {isRunning ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-charcoal-deep border-t-transparent rounded-full animate-spin" />
                    <span>Executing Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-charcoal-deep" />
                    <span>Run Verification Pipeline</span>
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
                className="p-3 rounded-xl border border-[#E5DDCF] text-charcoal-muted hover:text-charcoal hover:bg-ecru-100 transition-colors"
                title="Reset Simulation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Animated Pipeline Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {selectedScenario.stages.map((stage, idx) => {
              const isPast = activeStep > idx || completed;
              const isCurrent = activeStep === idx;

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-amber/15 border-amber shadow-glow-amber ring-2 ring-amber/40 scale-[1.02]'
                      : isPast
                      ? 'bg-white border-emerald-600/30 shadow-sm'
                      : 'bg-white/40 border-[#E8DFC9] opacity-60'
                  }`}
                >
                  <div>
                    {/* Step number badge & status */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-charcoal text-white">
                        0{idx + 1}
                      </span>
                      {isPast ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : isCurrent ? (
                        <div className="w-3 h-3 rounded-full bg-amber animate-ping" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-charcoal-faded" />
                      )}
                    </div>

                    <h4 className="text-xs font-bold text-charcoal leading-snug">
                      {stage.title}
                    </h4>
                    <p className="text-[11px] text-charcoal-muted mt-1.5 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E8DFC9]">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-ecru-200 text-charcoal block truncate">
                      {stage.tech}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Telemetry / Execution Output Terminal */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Terminal Console (7 cols) */}
            <div className="lg:col-span-7 rounded-2xl bg-charcoal text-white p-5 font-mono text-xs border border-charcoal-border shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-charcoal-border/70 mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-[11px] text-charcoal-faded ml-2">dhiraj-kernel://mcp-worker-01</span>
                </div>
                <span className="text-[10px] text-amber font-semibold uppercase tracking-wider">
                  {isRunning ? 'PIPELINE ACTIVE' : completed ? 'VERIFIED PASSED' : 'STANDBY'}
                </span>
              </div>

              <div className="space-y-2 min-h-[140px] flex flex-col justify-end">
                {activeStep === -1 && !completed && (
                  <p className="text-charcoal-faded italic">
                    Press "Run Verification Pipeline" above to initialize telemetry streams...
                  </p>
                )}

                {selectedScenario.stages.map((stage, idx) => {
                  if (activeStep < idx && !completed) return null;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-2"
                    >
                      <span className="text-amber">➜</span>
                      <span className="text-gray-300">
                        <strong className="text-white">[{stage.title.split(':')[0]}]</strong> {stage.dataLog}
                      </span>
                    </motion.div>
                  );
                })}

                {completed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pt-2 text-emerald-400 font-bold flex items-center gap-2 border-t border-charcoal-border/50"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>[VERIFIED] {selectedScenario.verificationVerdict}</span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Structured Result Display (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl bg-white p-5 border border-[#E5DDCF] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold text-amber-dark uppercase tracking-wider">
                    Execution Outcome
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                    Production Safe
                  </span>
                </div>

                <h4 className="text-sm font-bold text-charcoal font-sans mb-2">
                  {selectedScenario.finalOutput.title}
                </h4>

                <p className="text-xs text-charcoal-muted leading-relaxed font-sans bg-ecru-50 p-3 rounded-xl border border-[#E5DDCF]">
                  {completed ? selectedScenario.finalOutput.resultText : 'Awaiting pipeline execution to assemble and verify data payload...'}
                </p>
              </div>

              {/* Verified Metric Chips */}
              <div className="mt-4 pt-3 border-t border-[#E5DDCF] grid grid-cols-2 gap-2">
                {selectedScenario.finalOutput.stats.map((s, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-ecru-100 border border-[#E8DFC9]">
                    <span className="text-[10px] font-mono text-charcoal-muted block">{s.label}</span>
                    <span className="text-xs font-bold text-charcoal font-mono">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
