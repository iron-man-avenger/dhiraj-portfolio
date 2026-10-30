import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles, 
  Compass, 
  GitBranch, 
  FileCheck2, 
  Cpu, 
  Check, 
  Lock, 
  Activity
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { CountUpText, MaskedWords, Reveal, RiseText, SectionRule, TypeText } from './motion/primitives';
import { BACK_OUT, EXPO_OUT } from './motion/tokens';
import { PipelineRail } from './motion/PipelineRail';

interface Stage {
  title: string;
  shortRole: string;
  description: string;
  tech: string;
  metricBadge: string;
  dataLog: string;
}

interface Scenario {
  id: string;
  name: string;
  tag: string;
  query: string;
  routerTarget: string;
  verificationVerdict: string;
  stages: Stage[];
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
      tag: 'Multi-Agent SQL',
      query: 'Show last quarter’s beverage variance vs budget for site #4, breaking down wine and draft beer.',
      routerTarget: 'Accounting (P&L Specialist) + Sales Coordinator',
      verificationVerdict: '3/3 Verification Stages Passed (AST Valid, Invariants Reconciled, Zero Grain Mismatch)',
      stages: [
        {
          title: 'Context & Grounding',
          shortRole: 'Resolves Scope & Fiscal Calendar',
          description: 'Identifies fiscal quarter (Q2 FY25) and client site #4 boundaries without hallucinating date filters.',
          tech: 'Cosmos DB + BGE Embeddings',
          metricBadge: 'Resolved Q2 FY25',
          dataLog: 'RESOLVED: site_id=4, fiscal_quarter="2025-Q2", tenant="hospitality_uk"'
        },
        {
          title: 'Semantic Router',
          shortRole: 'Dispatches to Specialist Agent',
          description: 'Classifies user intent via dynamic few-shot retrieval and routes to dedicated Accounting/P&L Agent.',
          tech: 'Azure OpenAI Orchestrator',
          metricBadge: '0.942 Cosine Match',
          dataLog: 'ROUTED: Specialist_Accounting_v2 | COSINE_SIM: 0.942'
        },
        {
          title: 'SQL AST Judge',
          shortRole: 'Pre-Execution Logic Validation',
          description: 'Abstract Syntax Tree parser checks query against live DB schema and validates Row-Level Security.',
          tech: 'SQL AST Schema Parser',
          metricBadge: 'Schema Valid (0 Errors)',
          dataLog: 'JUDGE: AST syntactically valid. Tables: [gl_transactions, site_dim].'
        },
        {
          title: 'MCP Protocol Execution',
          shortRole: 'Secure Tool Brokerage',
          description: 'Model Context Protocol (MCP) server runs query using short-lived Key Vault JWT with tenant isolation.',
          tech: 'MCP Server + PostgreSQL RLS',
          metricBadge: '18ms Execution',
          dataLog: 'MCP_CALL: execute_sql() -> 42 rows in 18ms. JWT expired safely.'
        },
        {
          title: 'Invariant Math Critic',
          shortRole: 'Deterministic Sanity Proof',
          description: 'Proves sum(wine) + sum(beer) equals total before generating final executive response.',
          tech: 'Deterministic Math Critic',
          metricBadge: '100% Invariant Match',
          dataLog: 'INVARIANT_PASS: Sum(wine) + Sum(beer) == Total (£42,890.12). 0% discrepancy.'
        }
      ],
      finalOutput: {
        title: 'Verified Financial Answer Streamed via NDJSON',
        resultText: 'For Site #4 in Q2 FY25, total beverage expenditure was £42,890.12 against an approved budget of £39,500.00 (+£3,390.12 or +8.58% variance). Wine accounts for £2,410.00 of the overspend driven by vintage cellar restocking in May.',
        stats: [
          { label: 'Total Spend', value: '£42,890.12' },
          { label: 'Budget Variance', value: '+8.58% (£3,390.12)' },
          { label: 'Verification', value: '3/3 Stages Passed' },
          { label: 'Execution Speed', value: '18ms (MCP)' }
        ]
      }
    },
    {
      id: 'invoice-ocr',
      name: '2. Papertrail: Invoice Extraction',
      tag: 'Papertrail IDP',
      query: 'Ingest Spanish multi-page supplier invoice (PDF) with handwritten delivery surcharge.',
      routerTarget: 'Document Intelligence + GPT-4o Vision + Arithmetic Engine',
      verificationVerdict: 'Arithmetic Reconciliation Caught $45.00 Tax Discrepancy -> Repaired in Code',
      stages: [
        {
          title: 'Document Layout',
          shortRole: 'Raw Table & Line Extraction',
          description: 'Azure Document Intelligence extracts raw tabular line items, tax tables, and geometric bounding boxes.',
          tech: 'Azure Document Intelligence',
          metricBadge: '18 Lines (98.4% Recall)',
          dataLog: 'OCR_DONE: 18 line items detected, 3 pages processed. Recall: 98.4%'
        },
        {
          title: 'Header Identity',
          shortRole: 'Tax ID Verification',
          description: 'GPT-4o Vision pass extracts vendor Tax ID (CIF) and verifies Mod11 intra-community checksum.',
          tech: 'GPT-4o Vision + Mod11 Checksum',
          metricBadge: 'Mod11 Validated',
          dataLog: 'VENDOR: Distribuciones Eléctricas S.L. | CIF: B82349102 (VALID)'
        },
        {
          title: 'Arithmetic Proof',
          shortRole: 'Mathematical Proof of Lines',
          description: 'Deterministic math proves: sum of line items (€3,450.00) + 21% IVA (€724.50) equals total printed on invoice.',
          tech: 'Deterministic Math Invariant',
          metricBadge: '100% Match (€4,174.50)',
          dataLog: 'MATH_CHECK: Lines sum (€3,450.00) + Tax (€724.50) == Total (€4,174.50).'
        },
        {
          title: 'Cost-Gated Guard',
          shortRole: 'Unit Economics Control',
          description: 'Since arithmetic reconciles with 0% error, expensive second LLM re-read is skipped, preserving ~$0.03 cost.',
          tech: 'Cost-Gated AI Guard',
          metricBadge: 'Saved ~$0.03 / Inv',
          dataLog: 'COST_GATE: Error proof: FALSE -> Second LLM pass SKIPPED.'
        },
        {
          title: 'Ledger Ready',
          shortRole: 'Validated JSON Normalization',
          description: 'Exported as validated structured JSON accounting record with zero silent error risk.',
          tech: 'Ledger Normalizer',
          metricBadge: 'Ready for ERP Sync',
          dataLog: 'EXPORT: 18 lines allocated to GL 5210. Ready for ledger insertion.'
        }
      ],
      finalOutput: {
        title: 'Reconciled Accounting Record Ready for Ledger Export',
        resultText: 'Invoice #ES-2025-881 successfully validated. 18 line items mapped to GL Account 5210 (Food & Beverage Purchases). VAT verified at 21% with valid EU intra-community checksum.',
        stats: [
          { label: 'Processing Speed', value: '18.4s (60% Faster)' },
          { label: 'Unit Cost', value: '$0.028 / Invoice' },
          { label: 'Arithmetic Accuracy', value: '100% Invariant Match' },
          { label: 'Ledger Status', value: 'Clean & Exported' }
        ]
      }
    },
    {
      id: 'bar-vision',
      name: '3. Bar Vision: Video Inventory',
      tag: 'Bar Vision CV',
      query: 'Process 45s handheld phone video of back-bar liquor bottles with motion blur.',
      routerTarget: 'OWLv2 Open-Vocabulary Detection + Optical Flow RANSAC',
      verificationVerdict: 'Spatial Trajectory Recovery Eliminated 35% Cross-Frame Duplicates',
      stages: [
        {
          title: 'Zero-Shot OWLv2',
          shortRole: 'Open-Vocabulary Detection',
          description: 'PyTorch zero-shot detection finds bottles directly without requiring thousands of custom training labels.',
          tech: 'PyTorch + OWLv2',
          metricBadge: '142 Raw Detections',
          dataLog: 'ZERO_SHOT: Prompt ["liquor bottle", "spirits bottle"] -> 142 raw boxes'
        },
        {
          title: 'Camera Pose Recovery',
          shortRole: 'Trajectory Alignment',
          description: 'Optical flow & RANSAC track camera trajectory, sampling only distinct, non-overlapping viewpoints.',
          tech: 'Optical Flow + RANSAC',
          metricBadge: '0.95 Inlier Ratio',
          dataLog: 'RANSAC_POSE: Inlier ratio 0.95. Unified 6 fragmented segments into 1.'
        },
        {
          title: 'Spatial Dedup',
          shortRole: 'Cross-Frame Suppression',
          description: 'Intersection-over-smaller suppression eliminates overlapping box counts from slow camera panning.',
          tech: 'Spatial Deduplication',
          metricBadge: '-35% Duplicate Drop',
          dataLog: 'DEDUP: Removed 35% raw duplicate detections from panning overlap.'
        },
        {
          title: 'Liquid Regressor',
          shortRole: '2D CNN Level Estimation',
          description: 'Custom CNN calculates fill fraction per bottle with grouped cross-validation to prevent data leakage.',
          tech: '2D CNN Regressor',
          metricBadge: 'MAE 0.144 Fill Level',
          dataLog: 'LIQUID_LEVEL: Average fill 64.2%. 28 full, 12 partial bottles.'
        },
        {
          title: 'Review Manifest',
          shortRole: 'Async Job Queue Streaming',
          description: 'Streamed to FastAPI async job queue with review flags for low-confidence items. Fully commercial license safe.',
          tech: 'FastAPI Async Queue',
          metricBadge: '40 Distinct Bottles',
          dataLog: 'MANIFEST: 40 distinct bottles mapped. Commercial license clean.'
        }
      ],
      finalOutput: {
        title: 'Deduplicated Stocktake Manifest Generated',
        resultText: 'Video processed successfully. Detected 40 distinct bottles across 4 shelving tiers. Spatial deduplication prevented 22 duplicate counts caused by camera panning.',
        stats: [
          { label: 'Distinct Bottles', value: '40 Verified' },
          { label: 'Tracking Inliers', value: '0.95 (from 0.41)' },
          { label: 'Duplicate Drop', value: '-35% Double Counts' },
          { label: 'License Class', value: '100% Commercial' }
        ]
      }
    },
    {
      id: 'pharma-ocr',
      name: '4. PharmaAI: Agreement to Invoice',
      tag: 'PharmaAI OCR',
      query: 'Ingest signed 12-page Clinical Research Agreement (Pharmaris Canada) with 50% milestone advance.',
      routerTarget: 'Azure Document Intelligence + GPT-4o + GST/LUT Invariant Engine',
      verificationVerdict: 'Derived 50% Advance ($1,575 USD) • Applied 0% Export LUT • Routed to USD SWIFT',
      stages: [
        {
          title: 'Milestone Parsing',
          shortRole: 'Contract Terms Extraction',
          description: 'Extracts signed milestone schedules (50% on signing, 50% on final report), currencies, and study site scopes.',
          tech: 'Azure Document Intelligence',
          metricBadge: '12 Pages Extracted',
          dataLog: 'CONTRACT_PARSED: Milestone 1/2 identified. 50% advance of $3,150.00 contract.'
        },
        {
          title: 'Entity Disambiguation',
          shortRole: 'Regulatory Classification',
          description: 'Maps CRO protocol study name to regulatory service header: "Export Service-Exempt (GCP)" under HSN 998113.',
          tech: 'GPT-4o Vision + HSN Engine',
          metricBadge: 'HSN 998113 Mapped',
          dataLog: 'CLASSIFIED: Service Code 998113. Sponsor: Pharmaris Canada Inc. Department: CR.'
        },
        {
          title: 'GST & LUT Invariant',
          shortRole: 'Export Tax Verification',
          description: 'Validates 0% IGST under Letter of Undertaking (LUT) with live USD/INR forex conversion.',
          tech: 'Deterministic Tax Validator',
          metricBadge: '0% LUT Verified',
          dataLog: 'TAX_CHECK: Foreign export client -> 0% IGST applied under LUT. Zero tax leak.'
        },
        {
          title: 'SWIFT Bank Routing',
          shortRole: 'Auto-Account Selection',
          description: 'Auto-routes remittance instructions to currency-specific HDFC international account (USD SWIFT: HDFCINBB).',
          tech: 'Multi-Currency Bank Dispatch',
          metricBadge: 'HDFC USD Routed',
          dataLog: 'ROUTING: Mapped to HDFC USD Account 50200002488742. SWIFT: HDFCINBB.'
        },
        {
          title: 'Invoice Drafted',
          shortRole: 'Production Bill Generation',
          description: 'Generates official export invoice PZCR2526-03-027 ready for client dispatch with 100% compliance proof.',
          tech: 'FastAPI + React Exporter',
          metricBadge: 'Invoice Generated',
          dataLog: 'INVOICE_GENERATED: #PZCR2526-03-027 ($1,575.00 USD). Ready for client delivery.'
        }
      ],
      finalOutput: {
        title: 'Pharma Export Milestone Invoice #PZCR2526-03-027 Generated',
        resultText: 'Signed contract parsed successfully. Milestone 1 of 2 ($1,575.00 USD) drafted with 0% GST under Letter of Undertaking (LUT). Routed to HDFC USD SWIFT account with HSN 998113 compliance.',
        stats: [
          { label: 'Invoice Amount', value: '$1,575.00 USD' },
          { label: 'Milestone', value: '1 of 2 (50% Advance)' },
          { label: 'Tax Status', value: '0% Export LUT Verified' },
          { label: 'HSN/SAC Code', value: '998113 (GCP Service)' }
        ]
      }
    }
  ];

  const [selectedScenario, setSelectedScenario] = useState<Scenario>(scenarios[0]);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'visual' | 'telemetry'>('visual');
  const runTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopRun = () => {
    if (runTimer.current) clearInterval(runTimer.current);
    runTimer.current = null;
  };
  useEffect(() => stopRun, []);

  const startSimulation = () => {
    sounds.playClick();
    stopRun();
    setIsRunning(true);
    setCompleted(false);
    setActiveStep(0);

    let current = 0;
    runTimer.current = setInterval(() => {
      current++;
      if (current < selectedScenario.stages.length) {
        sounds.playTap();
        setActiveStep(current);
      } else {
        stopRun();
        setIsRunning(false);
        setCompleted(true);
        sounds.playSuccess();
      }
    }, 650);
  };

  const handleScenarioChange = (scenario: Scenario) => {
    sounds.playTap();
    stopRun();
    setSelectedScenario(scenario);
    setActiveStep(-1);
    setIsRunning(false);
    setCompleted(false);
  };

  const getStageIcon = (index: number) => {
    switch (index) {
      case 0: return <Compass className="w-4 h-4 text-amber-dark" />;
      case 1: return <GitBranch className="w-4 h-4 text-blue-600" />;
      case 2: return <FileCheck2 className="w-4 h-4 text-emerald-600" />;
      case 3: return <Lock className="w-4 h-4 text-purple-600" />;
      case 4: return <ShieldCheck className="w-4 h-4 text-amber-dark" />;
      default: return <Cpu className="w-4 h-4 text-amber-dark" />;
    }
  };

  return (
    <section id="simulator" className="pt-6 sm:pt-8 pb-16 sm:pb-20 bg-[#F7F2EB] relative z-0">
      <SectionRule />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-5 sm:gap-6">
          <div>
            <RiseText className="mb-2" innerClassName="text-xs font-mono font-bold uppercase tracking-widest text-amber-dark flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Architecture Benchmark</span>
            </RiseText>
            <MaskedWords className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight font-sans" text="Deterministic Verification Simulator" />
            <RiseText delay={0.25} className="text-sm sm:text-base text-charcoal-muted mt-2 max-w-2xl font-normal leading-relaxed">
              Watch production AI queries move through multi-agent routing, SQL AST schema validation, and arithmetic verification. Visual, transparent, zero hallucination.
            </RiseText>
          </div>

          {/* Scenario Selector Pills */}
          <div className="inline-flex items-center gap-1 p-1.5 bg-[#F7F2EB] rounded-2xl border border-[#E3DACD] shadow-sm max-w-full overflow-x-auto self-start md:self-auto">
            {scenarios.map((s) => {
              const isSelected = selectedScenario.id === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => handleScenarioChange(s)}
                  className={`relative px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors duration-200 flex items-center gap-1.5 ${
                    isSelected
                      ? 'text-charcoal-deep font-bold'
                      : 'text-charcoal-muted hover:text-charcoal hover:bg-black/[0.04]'
                  }`}
                >
                  {/* The amber highlight slides from the old choice to the new one */}
                  {isSelected && (
                    <motion.span
                      layoutId="scenario-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      className="absolute inset-0 rounded-xl bg-amber shadow-sm"
                    />
                  )}
                  <span className="relative">{s.tag}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Simulator Card (Warm Glassmorphism & High-Visual Architecture) */}
        <Reveal>
        <div className="rounded-3xl bg-[#F7F2EB] border border-[#E3DACD] shadow-sm p-4 sm:p-6 md:p-8 backdrop-blur-md transition-all duration-300">
          
          {/* Top Bar: Input Query & Primary Action */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-[#E3DACD]/80 gap-5">
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-charcoal-muted font-bold">
                  Live Production Input
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber/10 text-amber-dark border border-amber/20">
                  {selectedScenario.tag}
                </span>
              </div>
              <p className="text-sm sm:text-base font-medium text-charcoal leading-snug">
                "<TypeText text={selectedScenario.query} />"
              </p>
            </div>

            {/* Run Controls & View Mode Toggle */}
            <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
              <button
                onClick={startSimulation}
                disabled={isRunning}
                className={`px-5 py-2.5 rounded-full font-bold text-xs font-sans flex items-center gap-2 transition-all shadow-sm ${
                  isRunning
                    ? 'bg-charcoal/70 text-white cursor-not-allowed'
                    : 'bg-charcoal text-white hover:bg-charcoal-deep active:scale-95'
                }`}
              >
                {isRunning ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-amber border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Stages...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-amber text-amber" />
                    <span>Run Pipeline</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  sounds.playTap();
                  stopRun();
                  setActiveStep(-1);
                  setIsRunning(false);
                  setCompleted(false);
                }}
                className="p-2.5 rounded-full border border-[#E3DACD] bg-[#F7F2EB] text-charcoal-muted hover:text-charcoal hover:border-charcoal transition-colors"
                title="Reset Pipeline"
                aria-label="Reset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* View Mode Toggle Button */}
              <div className="hidden sm:inline-flex items-center p-0.5 bg-[#F7F2EB] rounded-full border border-[#E3DACD] text-[11px] font-mono ml-1">
                <button
                  onClick={() => {
                    sounds.playPillSelect();
                    setViewMode('visual');
                  }}
                  className={`px-3 py-1 rounded-full transition-all font-semibold ${
                    viewMode === 'visual'
                      ? 'bg-[#F7F2EB] text-charcoal shadow-2xs font-bold border border-[#E3DACD]'
                      : 'text-charcoal-muted hover:text-charcoal'
                  }`}
                >
                  Visual Flow
                </button>
                <button
                  onClick={() => {
                    sounds.playPillSelect();
                    setViewMode('telemetry');
                  }}
                  className={`px-3 py-1 rounded-full transition-all font-semibold ${
                    viewMode === 'telemetry'
                      ? 'bg-[#F7F2EB] text-charcoal shadow-2xs font-bold border border-[#E3DACD]'
                      : 'text-charcoal-muted hover:text-charcoal'
                  }`}
                >
                  Logs
                </button>
              </div>
            </div>
          </div>

          {/* VIEW MODE 1: VISUAL ARCHITECTURE FLOW (Default: Human-Friendly & Engaging) */}
          {viewMode === 'visual' ? (
            <div className="space-y-6">
              
              {/* The ball travels stage to stage as the pipeline runs */}
              <PipelineRail
                count={selectedScenario.stages.length}
                position={activeStep}
                complete={completed}
                className="hidden lg:block -mb-2"
              />

              {/* Stepper Node Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 relative">
                {selectedScenario.stages.map((stage, idx) => {
                  const isPast = activeStep > idx || completed;
                  const isCurrent = activeStep === idx;
                  const isPending = activeStep < idx && !completed;

                  return (
                    <motion.div
                      key={`${selectedScenario.id}-${idx}`}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, ease: EXPO_OUT, delay: idx * 0.06 }}
                      className={`relative p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                        isCurrent
                          ? 'border-amber bg-amber/[0.08] shadow-md ring-2 ring-amber/20 scale-[1.02]'
                          : isPast
                          ? 'border-emerald-500/30 bg-emerald-50/40 shadow-2xs'
                          : 'border-[#E3DACD]/70 bg-[#F7F2EB] opacity-60'
                      }`}
                    >
                      {/* Node Header: Step Number & Live Status Badge */}
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-mono text-charcoal-muted mb-2.5">
                          <span className="font-bold flex items-center gap-1.5">
                            {getStageIcon(idx)}
                            <span>0{idx + 1}</span>
                          </span>

                          {isPast && (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.45, ease: BACK_OUT }}
                              className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1"
                            >
                              <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                              <span>OK</span>
                            </motion.span>
                          )}

                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber text-charcoal-deep animate-pulse flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-charcoal-deep animate-ping" />
                              <span>ACTIVE</span>
                            </span>
                          )}

                          {isPending && (
                            <span className="text-[10px] text-charcoal-muted/60 font-mono">
                              WAITING
                            </span>
                          )}
                        </div>

                        {/* Stage Title & Human-Friendly Subtitle */}
                        <h4 className="font-bold text-sm text-charcoal font-sans leading-tight mb-1">
                          {stage.title}
                        </h4>
                        <p className="text-[11px] text-amber-dark font-medium leading-snug mb-2 font-mono">
                          {stage.shortRole}
                        </p>
                        <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-3 font-normal">
                          {stage.description}
                        </p>
                      </div>

                      {/* Bottom Metric Chip */}
                      <div className="mt-3.5 pt-2.5 border-t border-[#E3DACD]/60 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-charcoal-muted truncate max-w-[120px]">{stage.tech}</span>
                        <span className={`font-semibold px-2 py-0.5 rounded-md ${
                          isPast ? 'bg-emerald-100/80 text-emerald-800' : 'bg-black/[0.04] text-charcoal'
                        }`}>
                          {stage.metricBadge}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Verified Executive Summary Outcome (Shown clearly when complete) */}
              <AnimatePresence mode="wait" initial={false}>
                {completed ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.8, ease: EXPO_OUT }}
                    className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-emerald-500/[0.06] via-[#F7F2EB] to-amber/[0.06] border-2 border-emerald-500/30 shadow-sm"
                  >
                    {/* Header Stamp */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-emerald-500/15 gap-2 mb-4">
                      <div className="flex items-center gap-2 text-xs font-bold font-mono text-emerald-800">
                        <motion.div
                          initial={{ scale: 0, rotate: -40 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.55, ease: BACK_OUT, delay: 0.2 }}
                          className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </motion.div>
                        <span>[DETERMINISTIC VERIFICATION PASSED]</span>
                        <span>•</span>
                        <span className="font-normal text-charcoal-muted">Zero Hallucination Proof</span>
                      </div>
                      <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full self-start sm:self-auto">
                        100% Invariant Guarantee
                      </span>
                    </div>

                    {/* Human-Readable Clean Executive Briefing */}
                    <p className="text-sm sm:text-base font-normal text-charcoal leading-relaxed mb-6 font-sans">
                      {selectedScenario.finalOutput.resultText}
                    </p>

                    {/* KPI Metric Chips */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {selectedScenario.finalOutput.stats.map((stat, sIdx) => (
                        <motion.div
                          key={sIdx}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.7, ease: EXPO_OUT, delay: 0.25 + sIdx * 0.07 }}
                          className="p-3 rounded-xl bg-[#F7F2EB] border border-[#E3DACD] shadow-2xs"
                        >
                          <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-muted block mb-0.5">
                            {stat.label}
                          </span>
                          <CountUpText text={stat.value} className="text-sm sm:text-base font-bold text-charcoal font-sans" />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    className="p-4 rounded-xl bg-[#F7F2EB] border border-dashed border-[#E3DACD] text-center text-xs font-mono text-charcoal-muted flex items-center justify-center gap-2">
                    <Activity className="w-4 h-4 text-amber" />
                    <span>{isRunning ? 'Validating pipeline stages...' : 'Press "Run Pipeline" to visualize data flow and verification proof.'}</span>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          ) : (
            
            /* VIEW MODE 2: TELEMETRY LOGS (For engineers who want raw stdout inspection) */
            <div className="rounded-2xl bg-[#1C201D] text-white p-5 font-mono text-xs space-y-2 border border-charcoal-border">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[10px] text-gray-400">
                <span>TERMINAL_STDOUT // PIPELINE_EXECUTION</span>
                <span className="text-amber">LIVE_LOGS</span>
              </div>

              {activeStep === -1 && !completed && (
                <p className="text-gray-500 italic py-4 text-center">
                  Press "Run Pipeline" above to capture live telemetry logs...
                </p>
              )}

              {selectedScenario.stages.map((stage, idx) => {
                if (activeStep < idx && !completed) return null;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-2 text-gray-300"
                  >
                    <span className="text-amber">➜</span>
                    <span>
                      <strong className="text-emerald-400">[{stage.title}]</strong> <TypeText text={stage.dataLog} speed={10} />
                    </span>
                  </motion.div>
                );
              })}

              {completed && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EXPO_OUT }}
                  className="pt-3 border-t border-white/10 text-emerald-400 font-bold flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>[VERIFIED] {selectedScenario.verificationVerdict}</span>
                </motion.div>
              )}
            </div>
          )}

        </div>
        </Reveal>

      </div>
    </section>
  );
};
