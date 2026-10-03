import { 
  ArrowRight, 
  ShieldCheck
} from 'lucide-react';

interface ArchitectureFlow {
  title: string;
  summary: string;
  stages: {
    num: string;
    label: string;
    tech: string;
    details: string;
  }[];
  verificationHighlight: string;
}

interface ProjectArchitectureDiagramProps {
  projectId: string;
}

export const ProjectArchitectureDiagram: React.FC<ProjectArchitectureDiagramProps> = ({ projectId }) => {
  
  const getFlowData = (): ArchitectureFlow => {
    switch (projectId) {
      case 'financial-multi-agent':
        return {
          title: "Multi-Agent NLP-to-SQL System Architecture",
          summary: "Brokered via Model Context Protocol (MCP) with 3 independent verification gates.",
          stages: [
            {
              num: "01",
              label: "Ingestion & Grounding",
              tech: "Cosmos DB + BGE Embeddings",
              details: "Resolves fiscal calendar dates and grounds follow-up entities against 24h semantic cache."
            },
            {
              num: "02",
              label: "Multi-Agent Routing",
              tech: "Azure OpenAI + 6 Specialist LLMs",
              details: "Router dispatches to domain specialist (P&L, Sales, Labor, KPI, Stocktake, Advisory)."
            },
            {
              num: "03",
              label: "Pre-Exec Logic Judge",
              tech: "SQL AST Schema Verifier",
              details: "Parses generated SQL against live database catalog; blocks un-aliased joins and column drift."
            },
            {
              num: "04",
              label: "MCP Broker & Database",
              tech: "JSON-RPC + PostgreSQL RLS",
              details: "Short-lived Key Vault JWTs execute read-only queries with strict Row-Level Security."
            },
            {
              num: "05",
              label: "Post-Exec Invariant Critic",
              tech: "Deterministic Math Rules",
              details: "Verifies variance calculations match source invariants; rejects hallucinated figures before narration."
            }
          ],
          verificationHighlight: "3 independent layers catch errors before SQL execution and before final response streaming."
        };

      case 'papertrail-idp':
        return {
          title: "Intelligent Document Processing (IDP) Architecture",
          summary: "Self-validating invoice extraction pipeline deployed on Azure Kubernetes Service (AKS).",
          stages: [
            {
              num: "01",
              label: "Document Stream Intake",
              tech: "Batch Document Classifier",
              details: "Ingests multi-page supplier PDFs across Thai, Greek, Arabic, and Spanish, grouping invoices."
            },
            {
              num: "02",
              label: "Hybrid Dual-Pass OCR",
              tech: "Azure Doc Intelligence + GPT-4o",
              details: "Layout & tables routed to Document Intelligence; vendor identity extracted via focused GPT-4o pass."
            },
            {
              num: "03",
              label: "Deterministic Checks",
              tech: "Mod11/10 Checksum + i18n Rules",
              details: "Validates tax IDs with algorithmic checksums; standardizes Buddhist/Gregorian dates in code."
            },
            {
              num: "04",
              label: "Arithmetic Reconciliation",
              tech: "Mathematical Invariant Gate",
              details: "Proves sum of lines = subtotal, and subtotal + tax = total; catches silent errors before ledger export."
            },
            {
              num: "05",
              label: "Cost-Gated Re-Read",
              tech: "Error-Proof Gating (~$0.03/doc)",
              details: "Expensive second LLM passes are only unlocked on mathematical proof of error."
            }
          ],
          verificationHighlight: "Arithmetic reconciliation guarantees correctness without trusting model hallucination."
        };

      case 'gl-master-mapping':
        return {
          title: "GL Master Mapping & Benchmark Classification Flow",
          summary: "High-scale 36.5k LOC platform classifying charts of accounts across 6 ERP systems.",
          stages: [
            {
              num: "01",
              label: "Chart of Accounts Intake",
              tech: "6 ERP Integrations (QBO, Xero, etc.)",
              details: "Ingests unstructured accounts up to 500 lines per client onboarding."
            },
            {
              num: "02",
              label: "6-Tier Waterfall Engine",
              tech: "Azure OpenAI + Jaccard + TF-IDF",
              details: "Curated lists -> Learned overlay -> Normalized lookup -> Embeddings -> TF-IDF fallback."
            },
            {
              num: "03",
              label: "Live DB Schema Catalog",
              tech: "Dynamic 70-Category Model",
              details: "Derives vocabulary from live DB, permanently eliminating the 79% silent drift defect."
            },
            {
              num: "04",
              label: "Transactional Snapshot",
              tech: "53 Byte-Level Assertions",
              details: "Point-in-time safe undo protecting bystander records with transactional rollback."
            },
            {
              num: "05",
              label: "Progressive SSE Stream",
              tech: "FastAPI + React Virtualized Grid",
              details: "Heartbeat-monitored SSE streaming populates 500-row grids with frozen identity columns."
            }
          ],
          verificationHighlight: "100% auto-classification on typical clients with zero tolerance for silent taxonomic drift."
        };

      case 'bar-vision':
        return {
          title: "Bar Vision: Video-to-Inventory Spatial Architecture",
          summary: "Zero-shot object detection and optical flow pose recovery pipeline.",
          stages: [
            {
              num: "01",
              label: "Handheld Video Input",
              tech: "Smartphone Back-Bar Recording",
              details: "Continuous video panning across multi-tier shelving with variable lighting."
            },
            {
              num: "02",
              label: "Camera Pose Recovery",
              tech: "Optical Flow + RANSAC (0.95 Inliers)",
              details: "Tracks camera trajectory, uniting fragmented paths and sampling non-overlapping frames."
            },
            {
              num: "03",
              label: "Open-Vocabulary Detection",
              tech: "OWLv2 PyTorch Detector",
              details: "Zero-shot bottle detection using open text prompts without requiring custom training datasets."
            },
            {
              num: "04",
              label: "Spatial Deduplication",
              tech: "Intersection-over-Smaller Suppress",
              details: "Eliminates nested bottle-neck boxes and removes 35% duplicate cross-frame counts."
            },
            {
              num: "05",
              label: "Liquid Level Regression",
              tech: "Custom 2D CNN (MAE 0.144)",
              details: "Regresses per-bottle liquid fill level with leave-one-group-out cross validation."
            }
          ],
          verificationHighlight: "Tracking the camera trajectory instead of individual chaotic bottles prevents double-counting."
        };

      case 'pharma-ocr':
        return {
          title: "PharmaAI: Agreement-to-Invoice System Architecture",
          summary: "Automated pharmaceutical contract terms extraction and multi-currency export billing engine.",
          stages: [
            {
              num: "01",
              label: "Multi-Page Contract Intake",
              tech: "Azure Document Intelligence",
              details: "Extracts signed milestone schedules (50% advance, 50% report), currency terms, and CRO study scopes."
            },
            {
              num: "02",
              label: "Entity & Scope Derivation",
              tech: "GPT-4o Vision + Regulatory Rules",
              details: "Disambiguates sponsor vs CRO, protocol IDs, and maps services to HSN/SAC 998113 regulatory codes."
            },
            {
              num: "03",
              label: "Milestone Math Invariant",
              tech: "Deterministic Calculation",
              details: "Verifies milestone percentage amounts reconcile mathematically against total signed proposal value."
            },
            {
              num: "04",
              label: "GST & LUT Tax Invariant",
              tech: "0% Export LUT Engine",
              details: "Applies 0% IGST under Letter of Undertaking (LUT) with live forex conversion for foreign sponsors."
            },
            {
              num: "05",
              label: "SWIFT Banking Auto-Router",
              tech: "Multi-Currency Banking Dispatch",
              details: "Auto-routes invoice remittance instructions to currency-specific HDFC accounts (USD, EUR, INR SWIFT)."
            }
          ],
          verificationHighlight: "Guarantees 100% tax and milestone invoice accuracy without relying on LLM arithmetic hallucinations."
        };

      case 'promoters-copilot':
        return {
          title: "Promoter's Copilot Extraction & Forecast Flow",
          summary: "Financial document intelligence and predictive modeling platform.",
          stages: [
            {
              num: "01",
              label: "Financial Statements Intake",
              tech: "PDF & Scanned Filings",
              details: "Unstructured balance sheets and annual earnings statements."
            },
            {
              num: "02",
              label: "Table & Field Extraction",
              tech: "Azure Document Intelligence",
              details: "Normalized table schemas, currency alignment, and balance line items."
            },
            {
              num: "03",
              label: "Time-Series Regression",
              tech: "Predictive Financial Models",
              details: "Calculates historical run-rates and generates multi-quarter revenue forecasts."
            },
            {
              num: "04",
              label: "Interactive Reporting",
              tech: "FastAPI + Analytical UI",
              details: "Delivers query-driven executive dashboards and risk indicators."
            }
          ],
          verificationHighlight: "Deterministic line-item reconciliation ensures extracted figures match audited totals."
        };

      case 'manufacturing-copilot':
        return {
          title: "Manufacturing Multimodal Troubleshooting Topology",
          summary: "Visual equipment identification with multilingual technical Q&A.",
          stages: [
            {
              num: "01",
              label: "Visual & Voice Intake",
              tech: "Shop Floor Mobile Capture",
              details: "Machine photos and spoken troubleshooting queries from operators."
            },
            {
              num: "02",
              label: "Model Identification",
              tech: "Azure Computer Vision",
              details: "Extracts machine model numbers and matches component visual signatures."
            },
            {
              num: "03",
              label: "Vector Manual Retrieval",
              tech: "Embeddings + Vector Search",
              details: "Retrieves exact maintenance procedures and electrical schematics."
            },
            {
              num: "04",
              label: "Multilingual Resolution",
              tech: "Azure OpenAI (4 Languages)",
              details: "Generates spoken and text troubleshooting in English, Hindi, Gujarati, and Bengali."
            }
          ],
          verificationHighlight: "Grounds responses strictly against manufacturer technical manuals to prevent unsafe steps."
        };

      case 'visitor-management':
      default:
        return {
          title: "Corporate Visitor Biometric Architecture",
          summary: "Facial recognition and automated cloud approval workflows.",
          stages: [
            {
              num: "01",
              label: "Kiosk Registration",
              tech: "Walk-in & Advance Guest Links",
              details: "Captures guest details, host information, and government identification."
            },
            {
              num: "02",
              label: "Biometric Matching",
              tech: "Azure Face API",
              details: "Recognizes returning visitors for 1-click check-in without manual re-entry."
            },
            {
              num: "03",
              label: "Automated Host Routing",
              tech: "Power Automate Workflows",
              details: "Sends immediate SMS and email alerts with 1-tap host approval."
            },
            {
              num: "04",
              label: "Dynamic Pass Generation",
              tech: "Encrypted QR Verification",
              details: "Produces time-limited security passes and logs entries to compliance CSVs."
            }
          ],
          verificationHighlight: "End-to-end security compliance with automated host authorization."
        };
    }
  };

  const flow = getFlowData();

  return (
    <div className="mb-6 sm:mb-8 p-3.5 sm:p-5 md:p-6 rounded-2xl bg-[#F7F2EB] border border-[#E3DACD]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-3.5 mb-4 sm:mb-5 border-b border-[#E3DACD]/70 gap-2">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-dark font-bold block mb-1">
            System Architecture
          </span>
          <h4 className="text-sm sm:text-base font-bold text-charcoal font-sans">
            {flow.title}
          </h4>
        </div>
        <p className="text-xs text-charcoal-muted font-mono">
          {flow.summary}
        </p>
      </div>

      {/* Responsive Pipeline: Full-Width Clean Cards on Mobile, 5-Col Grid on Desktop */}
      <div className="relative">
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3.5 relative">
          {flow.stages.map((stage, idx) => (
            <div 
              key={idx} 
              className="relative p-3 sm:p-3.5 md:p-4 rounded-xl bg-[#F7F2EB] border border-[#E5DDCF] flex flex-col justify-between hover:border-amber/50 transition-all group shadow-2xs"
            >
              <div>
                {/* Step indicator & Tech Badge */}
                <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold text-amber-dark px-2 py-0.5 rounded bg-amber/15 border border-amber/25">
                      Stage {stage.num}
                    </span>
                    <span className="text-[10px] font-mono font-medium text-charcoal-muted truncate max-w-[170px] sm:max-w-none">
                      {stage.tech}
                    </span>
                  </div>

                  {idx < flow.stages.length - 1 ? (
                    <ArrowRight className="w-3.5 h-3.5 text-amber/60 group-hover:text-amber transition-colors hidden lg:block" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  )}
                </div>

                <h5 className="text-xs sm:text-sm font-bold text-charcoal leading-snug font-sans mt-1">
                  {stage.label}
                </h5>

                <p className="text-xs text-charcoal-muted leading-relaxed mt-1 font-sans">
                  {stage.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Verification Callout */}
      <div className="mt-3.5 pt-3 border-t border-[#E3DACD]/60 flex items-center gap-2 text-xs text-charcoal font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong className="text-charcoal font-bold">Reliability Guarantee:</strong> {flow.verificationHighlight}</span>
      </div>

    </div>
  );
};
