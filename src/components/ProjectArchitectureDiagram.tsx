import { 
  ArrowRight, 
  ShieldCheck, 
  Database, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Zap
} from 'lucide-react';

interface DiagramNode {
  title: string;
  subtitle: string;
  badge?: string;
  type: 'input' | 'ai' | 'router' | 'verify' | 'database' | 'output';
  details?: string[];
}

interface DiagramStep {
  groupName: string;
  nodes: DiagramNode[];
}

interface ProjectArchitectureDiagramProps {
  projectId: string;
}

export const ProjectArchitectureDiagram: React.FC<ProjectArchitectureDiagramProps> = ({ projectId }) => {
  
  // Custom diagram steps per project
  const getDiagramData = (): { title: string; steps: DiagramStep[] } => {
    switch (projectId) {
      case 'financial-multi-agent':
        return {
          title: "Multi-Agent NLP-to-SQL & 3-Tier Verification Topology",
          steps: [
            {
              groupName: "1. Ingestion & Grounding",
              nodes: [
                {
                  title: "Natural Language Query",
                  subtitle: "User input via Chat UI / Widget",
                  type: "input",
                  badge: "Prompt",
                  details: ["Fiscal period detection", "Literal entity grounding"]
                },
                {
                  title: "Context Memory Store",
                  subtitle: "Cosmos DB (24h TTL) + LangMem",
                  type: "database",
                  badge: "BGE Embeddings",
                  details: ["Semantic cache hit check", "Episodic thread recall"]
                }
              ]
            },
            {
              groupName: "2. Multi-Agent Routing",
              nodes: [
                {
                  title: "Semantic Router LLM",
                  subtitle: "Azure OpenAI Orchestrator",
                  type: "router",
                  badge: "Permission Gated",
                  details: ["Dynamic few-shot retrieval", "Cross-agent decomposition"]
                },
                {
                  title: "6 Specialist Agents",
                  subtitle: "P&L, Sales, Labor, KPI, Stock, Advisory",
                  type: "ai",
                  badge: "Domain Specialists",
                  details: ["SQL code generator", "Self-correcting retry loop"]
                }
              ]
            },
            {
              groupName: "3. Verification & Execution",
              nodes: [
                {
                  title: "Pre-Exec Logic Judge",
                  subtitle: "SQL AST Schema Verifier",
                  type: "verify",
                  badge: "Tier 1 Guard",
                  details: ["Live schema AST parse", "Rejects invalid columns"]
                },
                {
                  title: "MCP JSON-RPC Server",
                  subtitle: "Model Context Protocol Broker",
                  type: "database",
                  badge: "Key Vault JWT",
                  details: ["PostgreSQL Row-Level Security", "SQL Server / SQLite"]
                }
              ]
            },
            {
              groupName: "4. Output Invariant Validation",
              nodes: [
                {
                  title: "Post-Exec Invariant Critic",
                  subtitle: "Deterministic Math & Grain Check",
                  type: "verify",
                  badge: "Tier 2 & 3 Guards",
                  details: ["No-arithmetic narration rules", "Catches hallucinated figures"]
                },
                {
                  title: "Streamed Response",
                  subtitle: "NDJSON Stream to React Client",
                  type: "output",
                  badge: "Production Safe",
                  details: ["Recharts pivot tables", "Follow-up query suggestions"]
                }
              ]
            }
          ]
        };

      case 'papertrail-idp':
        return {
          title: "Hybrid Intelligent Document Processing Pipeline",
          steps: [
            {
              groupName: "1. Document Ingestion",
              nodes: [
                {
                  title: "Supplier PDFs / Scans",
                  subtitle: "Multi-language invoices & receipts",
                  type: "input",
                  badge: "Input Stream",
                  details: ["Greek, Thai, Arabic, Spanish", "Phone photos & carbon copies"]
                },
                {
                  title: "Batch Classifier",
                  subtitle: "Page-level splitting engine",
                  type: "router",
                  badge: "Page Grouper",
                  details: ["Separates invoices from credit notes", "Skips non-field email covers"]
                }
              ]
            },
            {
              groupName: "2. Hybrid Extraction",
              nodes: [
                {
                  title: "Azure Document Intelligence",
                  subtitle: "OCR & Layout Table Parser",
                  type: "ai",
                  badge: "Line-Item OCR",
                  details: ["Tabular bounding boxes", "Raw text transcription"]
                },
                {
                  title: "GPT-4o Vision Pass",
                  subtitle: "Targeted Header Extractor",
                  type: "ai",
                  badge: "Header Identity",
                  details: ["Vendor tax ID extraction", "Mod11 / Mod10 checksum"]
                }
              ]
            },
            {
              groupName: "3. Deterministic Validation",
              nodes: [
                {
                  title: "Arithmetic Reconciliation",
                  subtitle: "Self-Validating Math Invariants",
                  type: "verify",
                  badge: "Correctness Proof",
                  details: ["Line sums == Subtotal", "Subtotal + Tax == Total"]
                },
                {
                  title: "Cost-Gated AI Guard",
                  subtitle: "Error-triggered re-reads",
                  type: "verify",
                  badge: "~$0.03 / Doc",
                  details: ["Second LLM pass ONLY on math error", "Multi-calendar date conversion"]
                }
              ]
            },
            {
              groupName: "4. Ledger Delivery",
              nodes: [
                {
                  title: "Validated Accounting JSON",
                  subtitle: "Exported to Azure SQL / AKS",
                  type: "output",
                  badge: "Production Ready",
                  details: ["20s processing (60% cut)", "Zero hallucinated totals"]
                }
              ]
            }
          ]
        };

      case 'gl-master-mapping':
        return {
          title: "6-Tier Waterfall & Idempotent Mapping Architecture",
          steps: [
            {
              groupName: "1. ERP Ingestion",
              nodes: [
                {
                  title: "Client Charts of Accounts",
                  subtitle: "Ingestion from 6 ERP platforms",
                  type: "input",
                  badge: "6 ERPs",
                  details: ["QBO, Xero, Sage X3, Iplicit, etc.", "Up to 500 accounts/client"]
                }
              ]
            },
            {
              groupName: "2. Classification Waterfall",
              nodes: [
                {
                  title: "6-Tier Waterfall Engine",
                  subtitle: "Tiered precision cascade",
                  type: "ai",
                  badge: "100% Auto-Classify",
                  details: [
                    "T1: Curated mappings",
                    "T2: Learned overlay",
                    "T3: Exact/normalized lookup",
                    "T4: Jaccard GL code gating",
                    "T5: Azure OpenAI Embeddings",
                    "T6: TF-IDF fallback"
                  ]
                },
                {
                  title: "Live Schema Catalog",
                  subtitle: "Dynamic 70-Category DB",
                  type: "database",
                  badge: "Drift Prevention",
                  details: ["Eliminates 79% silent taxonomy drift", "Codes derived from live DB"]
                }
              ]
            },
            {
              groupName: "3. Safe Bulk Operations",
              nodes: [
                {
                  title: "Snapshot & Restore",
                  subtitle: "Point-in-time safe undo engine",
                  type: "verify",
                  badge: "53 Byte Checks",
                  details: ["Pre-flight scope verification", "Transactional rollback on error"]
                },
                {
                  title: "Human Review Gate",
                  subtitle: "438 ambiguous accounts",
                  type: "router",
                  badge: "Refuse to Guess",
                  details: ["Routes ambiguity to accountants", "Prevents confident errors"]
                }
              ]
            },
            {
              groupName: "4. Presentation Layer",
              nodes: [
                {
                  title: "Progressive SSE Grid",
                  subtitle: "3,690-Line React Virtualized Grid",
                  type: "output",
                  badge: "FastAPI + SSE",
                  details: ["Offset-based resume across retries", "Frozen headers in 1100px iframe"]
                }
              ]
            }
          ]
        };

      case 'bar-vision':
        return {
          title: "Video-to-Inventory Spatial Pipeline",
          steps: [
            {
              groupName: "1. Video Capture",
              nodes: [
                {
                  title: "Handheld Phone Video",
                  subtitle: "Back-bar stock recording",
                  type: "input",
                  badge: "Handheld RGB",
                  details: ["45s panning footage", "Variable lighting & motion blur"]
                }
              ]
            },
            {
              groupName: "2. Tracking & Detection",
              nodes: [
                {
                  title: "Camera Pose Recovery",
                  subtitle: "Optical Flow + RANSAC",
                  type: "ai",
                  badge: "0.95 Inlier Ratio",
                  details: ["Lucas-Kanade trajectory tracking", "Cuts 6 split paths into 1 unified track"]
                },
                {
                  title: "Zero-Shot OWLv2",
                  subtitle: "Open-vocabulary bottle detector",
                  type: "ai",
                  badge: "Zero Training Data",
                  details: ["Open-vocabulary text prompts", "Intersection-over-smaller suppression"]
                }
              ]
            },
            {
              groupName: "3. Spatial Deduplication & Liquid Level",
              nodes: [
                {
                  title: "Spatial Footprint Dedup",
                  subtitle: "Non-overlapping camera frames",
                  type: "verify",
                  badge: "-35% Duplicates",
                  details: ["Tracks camera instead of objects", "Fixes 40% over-counting bug"]
                },
                {
                  title: "2D CNN Liquid Regressor",
                  subtitle: "Per-bottle fill estimator",
                  type: "ai",
                  badge: "MAE 0.144",
                  details: ["Trained CNN on bottle crops", "Group-by-entity cross validation"]
                }
              ]
            },
            {
              groupName: "4. Stock Manifest",
              nodes: [
                {
                  title: "Browser Review Manifest",
                  subtitle: "FastAPI async job queue",
                  type: "output",
                  badge: "Commercial Safe",
                  details: ["AGPL-3 dependencies excluded", "Streamed stage logs with overlays"]
                }
              ]
            }
          ]
        };

      case 'promoters-copilot':
        return {
          title: "Financial Extraction & Predictive Forecasting Flow",
          steps: [
            {
              groupName: "1. Data Ingestion",
              nodes: [
                {
                  title: "Financial Statements (PDF)",
                  subtitle: "Balance sheets & P&L filings",
                  type: "input",
                  badge: "Multi-Format",
                  details: ["Unstructured PDFs", "Scanned financial summaries"]
                }
              ]
            },
            {
              groupName: "2. Document Intelligence",
              nodes: [
                {
                  title: "Azure Document Intelligence",
                  subtitle: "Prebuilt & Custom Layout Models",
                  type: "ai",
                  badge: "Field Extraction",
                  details: ["Table cell extraction", "Header & currency normalization"]
                }
              ]
            },
            {
              groupName: "3. Time-Series Forecasting",
              nodes: [
                {
                  title: "Predictive Analytics Model",
                  subtitle: "Trend & seasonality regression",
                  type: "verify",
                  badge: "ML Analytics",
                  details: ["Historical run-rate calculations", "Cash flow projection models"]
                }
              ]
            },
            {
              groupName: "4. Executive Dashboard",
              nodes: [
                {
                  title: "Natural Language Insights",
                  subtitle: "Query-based analytics UI",
                  type: "output",
                  badge: "FastAPI Backend",
                  details: ["Interactive forecast visuals", "Automated executive reporting"]
                }
              ]
            }
          ]
        };

      case 'manufacturing-copilot':
        return {
          title: "Multimodal Industrial Troubleshooting Topology",
          steps: [
            {
              groupName: "1. Multimodal Input",
              nodes: [
                {
                  title: "Equipment Image & Voice Query",
                  subtitle: "Captured from shop floor devices",
                  type: "input",
                  badge: "Voice + Photo",
                  details: ["Factory machine photos", "Multilingual speech queries"]
                }
              ]
            },
            {
              groupName: "2. Computer Vision & Retrieval",
              nodes: [
                {
                  title: "Azure Computer Vision",
                  subtitle: "Machine Model Identification",
                  type: "ai",
                  badge: "Visual Match",
                  details: ["Model plate detection", "Part number OCR"]
                },
                {
                  title: "Vector Knowledge Base",
                  subtitle: "Machinery manuals & schematics",
                  type: "database",
                  badge: "Cosine Similarity",
                  details: ["Troubleshooting guide retrieval", "Safety protocols"]
                }
              ]
            },
            {
              groupName: "3. Multilingual LLM Copilot",
              nodes: [
                {
                  title: "Azure OpenAI Copilot",
                  subtitle: "Technical Q&A in 4 Languages",
                  type: "ai",
                  badge: "4 Languages",
                  details: ["English, Hindi, Gujarati, Bengali", "Role-based access permissions"]
                }
              ]
            },
            {
              groupName: "4. Shop Floor Action",
              nodes: [
                {
                  title: "ERP / MES Integration",
                  subtitle: "Real-time production telemetries",
                  type: "output",
                  badge: "Connected Factory",
                  details: ["Maintenance ticket dispatch", "Live equipment uptime stats"]
                }
              ]
            }
          ]
        };

      case 'visitor-management':
      default:
        return {
          title: "Smart Biometric Visitor Check-In Architecture",
          steps: [
            {
              groupName: "1. Visitor Arrival",
              nodes: [
                {
                  title: "Kiosk Check-In / Advance Link",
                  subtitle: "Walk-in & scheduled guest intake",
                  type: "input",
                  badge: "Intake",
                  details: ["Visitor registration form", "Govt ID badge capture"]
                }
              ]
            },
            {
              groupName: "2. Biometric Verification",
              nodes: [
                {
                  title: "Azure Face Recognition",
                  subtitle: "Returning visitor identification",
                  type: "ai",
                  badge: "Biometric AI",
                  details: ["Facial feature vector extraction", "Instant autofill for returnees"]
                }
              ]
            },
            {
              groupName: "3. Host Workflow Orchestration",
              nodes: [
                {
                  title: "Power Automate Flow",
                  subtitle: "Multi-stage host approval",
                  type: "verify",
                  badge: "Cloud Workflow",
                  details: ["Instant SMS & Email notifications", "Host 1-click arrival approval"]
                }
              ]
            },
            {
              groupName: "4. Secure Access & Reporting",
              nodes: [
                {
                  title: "Dynamic QR Pass & Admin CSV",
                  subtitle: "Security desk console",
                  type: "output",
                  badge: "Audited Pass",
                  details: ["Encrypted QR badge generation", "Filtered security audit reports"]
                }
              ]
            }
          ]
        };
    }
  };

  const { title, steps } = getDiagramData();

  // Helper for node type styling
  const getNodeStyles = (type: DiagramNode['type']) => {
    switch (type) {
      case 'input':
        return {
          border: 'border-[#D5CABE]',
          bg: 'bg-white',
          badgeBg: 'bg-ecru-200 text-charcoal',
          icon: FileText
        };
      case 'ai':
        return {
          border: 'border-amber/60',
          bg: 'bg-amber/10',
          badgeBg: 'bg-amber text-charcoal-deep font-bold',
          icon: Sparkles
        };
      case 'router':
        return {
          border: 'border-charcoal/40',
          bg: 'bg-[#2E332E] text-white',
          badgeBg: 'bg-amber/20 text-amber font-mono font-bold',
          icon: Zap
        };
      case 'verify':
        return {
          border: 'border-emerald-500/50',
          bg: 'bg-emerald-50/70',
          badgeBg: 'bg-emerald-600 text-white font-bold',
          icon: ShieldCheck
        };
      case 'database':
        return {
          border: 'border-blue-400/40',
          bg: 'bg-blue-50/60',
          badgeBg: 'bg-blue-100 text-blue-800 font-mono font-bold',
          icon: Database
        };
      case 'output':
        return {
          border: 'border-charcoal',
          bg: 'bg-charcoal text-white',
          badgeBg: 'bg-amber text-charcoal-deep font-bold',
          icon: CheckCircle2
        };
    }
  };

  return (
    <div className="mb-8 p-5 sm:p-6 rounded-3xl bg-[#FAF7F2] border border-[#E3DACD] shadow-sm">
      
      {/* Diagram Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#EAE2D5] gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber/20 text-amber-dark">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-muted">
              Interactive System Architecture Diagram
            </h4>
            <p className="text-sm font-bold text-charcoal font-sans">
              {title}
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-ecru-100 text-charcoal-muted border border-[#E0D5C3] self-start sm:self-auto">
          Dataflow Pipeline
        </span>
      </div>

      {/* Visual Flow Stages */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          
          {steps.map((step, sIdx) => (
            <div key={sIdx} className="flex flex-col gap-3 relative">
              
              {/* Step Header */}
              <div className="flex items-center justify-between pb-1 border-b border-[#E8DFC9]">
                <span className="text-[11px] font-mono font-bold text-charcoal tracking-wide">
                  {step.groupName}
                </span>
                <span className="text-[10px] font-mono text-charcoal-muted">
                  STAGE 0{sIdx + 1}
                </span>
              </div>

              {/* Nodes within Step */}
              <div className="space-y-3 flex-1 flex flex-col justify-start">
                {step.nodes.map((node, nIdx) => {
                  const style = getNodeStyles(node.type);
                  const Icon = style.icon;
                  const isDark = node.type === 'output' || node.type === 'router';

                  return (
                    <div
                      key={nIdx}
                      className={`p-3.5 rounded-2xl border transition-all duration-200 shadow-sm relative group hover:shadow-md ${style.border} ${style.bg}`}
                    >
                      {/* Node Top: Icon & Badge */}
                      <div className="flex items-center justify-between gap-1.5 mb-2">
                        <div className="flex items-center gap-1.5">
                          <Icon className={`w-3.5 h-3.5 ${isDark ? 'text-amber' : 'text-charcoal'}`} />
                          <span className={`text-[10px] font-mono font-bold ${isDark ? 'text-gray-300' : 'text-charcoal-muted'}`}>
                            {node.type.toUpperCase()}
                          </span>
                        </div>
                        {node.badge && (
                          <span className={`text-[9px] px-2 py-0.5 rounded-full ${style.badgeBg}`}>
                            {node.badge}
                          </span>
                        )}
                      </div>

                      {/* Node Title & Subtitle */}
                      <h5 className={`text-xs font-bold leading-tight font-sans ${isDark ? 'text-white' : 'text-charcoal'}`}>
                        {node.title}
                      </h5>
                      <p className={`text-[10px] mt-0.5 font-mono ${isDark ? 'text-gray-300' : 'text-charcoal-muted'}`}>
                        {node.subtitle}
                      </p>

                      {/* Node Micro-Details */}
                      {node.details && (
                        <div className="mt-2.5 pt-2 border-t border-black/10 space-y-1">
                          {node.details.map((detail, dIdx) => (
                            <div key={dIdx} className="flex items-center gap-1 text-[10px]">
                              <span className={`w-1 h-1 rounded-full ${isDark ? 'bg-amber' : 'bg-charcoal'}`} />
                              <span className={`${isDark ? 'text-gray-300' : 'text-charcoal-muted'}`}>
                                {detail}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Connecting arrow to next column on desktop */}
              {sIdx < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-[#C8934C]">
                  <ArrowRight className="w-5 h-5 drop-shadow-sm" />
                </div>
              )}
            </div>
          ))}

        </div>
      </div>

      {/* Legend Footer */}
      <div className="mt-6 pt-3 border-t border-[#EAE2D5] flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-charcoal-muted">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-bold text-charcoal">Topology Key:</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded bg-[#FAF7F2] border border-charcoal/40" /> Ingestion
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded bg-amber" /> AI Model / Agent
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded bg-emerald-500" /> Deterministic Verification
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded bg-blue-400" /> Database / Storage Broker
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded bg-charcoal" /> Verified Output Stream
          </span>
        </div>
        <span>Flow: Left ➔ Right</span>
      </div>

    </div>
  );
};
