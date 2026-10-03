import type { Project, SkillCategory, Experience, Award, Certification } from '../types';


export const personalInfo = {
  name: "Dhiraj Kumar",
  role: "AI Engineer",
  titleSuffix: "Agentic Systems & Vision AI",
  location: "Ahmedabad, India",
  email: "ai.cloudranger@gmail.com",
  phone: "9828762154",
  linkedin: "http://www.linkedin.com/in/dhiraj-malviya-1830a1288",
  twitter: "https://x.com/Dheeraj1953068",
  github: "https://github.com",
  objective: "Building intelligent, self-correcting, and production-hardened AI solutions. Specializing in Multi-Agent NLP-to-SQL architectures, 3-layer deterministic verification, high-throughput Intelligent Document Processing (IDP), and Computer Vision pipelines.",
  languages: ["English", "Hindi", "Gujarati"],
};

export const headlineMetrics = [
  {
    number: "6 + 5",
    label: "Agentic Architecture",
    description: "6 Specialist Agents + 5 Supporting LLM Roles",
    highlight: true,
  },
  {
    number: "3-Tier",
    label: "Verification Engine",
    description: "Pre-execution AST, post-execution math, answer critic",
    highlight: false,
  },
  {
    number: "12,087",
    label: "Mappings Sanitized",
    description: "Resolved silent 79% taxonomy drift across 6 ERPs",
    highlight: true,
  },
  {
    number: "60%",
    label: "Latency Reduction",
    description: "Cut IDP pipeline from 52s down to 20s via profiling",
    highlight: false,
  },
  {
    number: "$0.03",
    label: "Cost-Gated Unit Econ",
    description: "Per-invoice spend with proof-of-error gating",
    highlight: false,
  },
  {
    number: "36.5k",
    label: "Production Lines",
    description: "69 HTTP Endpoints, 94 TypeScript / Python modules",
    highlight: false,
  }
];

export const signatureChartData = [
  { label: "Token Parser", value: 65, height: "65%" },
  { label: "Vector Search", value: 85, height: "85%" },
  { label: "Multi-Agent Routing", value: 100, height: "100%", isAccent: true, note: "Over 12K+ Mappings Verified" },
  { label: "AST Logic Judge", value: 80, height: "80%" },
  { label: "Numeric Invariants", value: 68, height: "68%" },
  { label: "OWLv2 Vision", value: 58, height: "58%" },
  { label: "Optical Flow Pose", value: 38, height: "38%" },
  { label: "SSE Streaming", value: 24, height: "24%" },
  { label: "MCP Protocol", value: 26, height: "26%" },
  { label: "Cost Gating", value: 16, height: "16%" },
  { label: "Audit Trails", value: 30, height: "30%" },
  { label: "AKS Cluster", value: 32, height: "32%" },
];

export const projects: Project[] = [
  {
    id: "financial-multi-agent",
    title: "AI Financial Assistant & Multi-Agent NLP-to-SQL Platform",
    subtitle: "Enterprise Hospitality Practice | 6 Specialist Agents + 5 Supporting LLM Roles",
    company: "Paperchase Accountancy Ltd",
    period: "Jul 2025 – Present",
    category: "Agentic AI",
    summary: "Built an LLM-powered multi-agent assistant that answers natural language questions regarding restaurant P&L, sales, labor, KPIs, and stocktake across a multi-tenant client base. Brokered through a JWT-authenticated Model Context Protocol (MCP) server over SQL Server, PostgreSQL, SQLite, and Cosmos DB.",
    metrics: [
      { label: "Agents", value: "6 Specialists + 5 LLMs" },
      { label: "Memory Layers", value: "4 Distinct Tiers" },
      { label: "Verification", value: "3 Independent Layers" },
      { label: "Data Sources", value: "5 Heterogeneous DBs" },
    ],
    highlight: "The 3-tier verification layer: Pre-execution AST schema validation, post-execution numeric invariant sanity checks, and post-narration deterministic answer criticism.",
    bullets: [
      "Architected 6 specialist domain agents (Accounting/P&L, Sales, Timesheet/Labor, KPI/Forecasts, Stocktake, Advisory) with an intelligent router constrained to surface permissions.",
      "Engineered a 4-layer memory system: 24h TTL semantic cache on Cosmos DB, episodic memory via LangMem with BGE sentence embeddings, scoped thread store with 2MB item cap chunking, and learned data-inventory routing.",
      "Devised a self-correcting retry loop tracking SQL attempts, short-circuiting when the model regenerates identical failing queries.",
      "Built dynamic online few-shot retrieval selecting question-specific in-context demonstrations rather than static prompts.",
      "Brokered all database execution via a JSON-RPC Model Context Protocol (MCP) server with short-lived JWTs minted from Azure Key Vault and per-request tenant context propagation enforcing PostgreSQL Row-Level Security (RLS).",
      "Deployed to Azure Kubernetes Service (AKS) behind Azure API Management as a standalone chat application and embeddable per-agent widgets with NDJSON streaming."
    ],
    techStack: [
      "Python 3.11", "FastAPI", "Azure OpenAI", "Semantic Kernel", "Model Context Protocol (MCP)",
      "LangMem", "BGE Embeddings", "Cosmos DB", "PostgreSQL RLS", "SQL Server", "TypeScript", "React 19", "AKS"
    ],
    keyLessons: [
      {
        concept: "The Verification Differentiator",
        meaning: "Plenty of developers can prompt an LLM to generate SQL; far fewer engineer three independent verification layers that catch hallucinated columns, bad arithmetic, and grain mismatches before execution."
      },
      {
        concept: "Deterministic Prior-Turn Scans",
        meaning: "Deterministic entity grounding scans follow-up nouns against prior results before the LLM classifier runs, resolving conversational ambiguities without hallucination."
      }
    ],
    architectureBreakdown: {
      input: "Natural Language Financial Query ('Show wine variance vs budget for Q3 site 2')",
      orchestration: "Semantic Router -> Dynamic Few-Shot Retrieval -> Specialist SQL Generator -> Logic Judge",
      verification: "Pre-exec schema AST check -> Execute via MCP -> Post-exec numeric sanity check -> Answer Critic",
      output: "Narrated response with live Recharts visualizations, pivot tables, and NDJSON streaming"
    }
  },
  {
    id: "papertrail-idp",
    title: "Papertrail: Intelligent Document Processing & Invoice Extraction",
    subtitle: "Production Multi-Language Invoice Engine Deployed on Azure Kubernetes Service",
    company: "Paperchase Accountancy Ltd",
    period: "Jul 2025 – Present",
    category: "Document AI",
    summary: "A production invoice-extraction platform converting supplier PDFs in any language—from clean digital vectors to phone photos of carbon-copy forms—into validated, structured JSON accounting records.",
    metrics: [
      { label: "Runtime Reduction", value: "60% (52s -> 20s)" },
      { label: "Unit Economics", value: "~$0.03 / Invoice" },
      { label: "Languages", value: "Greek, Thai, Arabic, etc." },
      { label: "Tax-ID Accuracy", value: "19/19 (100% on bench)" },
    ],
    highlight: "Designed an arithmetic reconciliation layer validating that line amounts sum to subtotal, and subtotal + tax equals total, rejecting erroneous extractions before they touch the ledger.",
    bullets: [
      "Built a hybrid extraction pipeline routing fields to their optimal models: layout and line-items from Azure Document Intelligence, and header identity from a focused GPT-4o vision pass.",
      "Eliminated silent data corruption by moving tie-breaking, field selection, and format validation out of LLM prompts into unit-tested deterministic code.",
      "Engineered multi-calendar date handling (Buddhist Era to Gregorian conversion) and script-agnostic text comparison supporting Thai, Arabic, Greek, Japanese, and Cyrillic.",
      "Cut per-invoice processing time 60% (52s down to 20s) by identifying and eliminating Kubernetes CPU throttling, and reduced API payloads ~57% through runtime profiling.",
      "Added per-invoice live cost attribution across Azure services (USD + INR, live FX) and implemented cost-gated AI re-reads that only fire upon mathematical proof of error.",
      "Built a batch document classifier recovering multi-document PDFs into individual invoices, delivery notes, and credit notes."
    ],
    techStack: [
      "Node.js", "Express", "Azure Document Intelligence", "Azure OpenAI (GPT-4o Vision, GPT-4.1 nano)",
      "Azure AI Translator", "Azure Kubernetes Service", "Docker arm64", "React 18", "pdf.js", "Azure Key Vault"
    ],
    keyLessons: [
      {
        concept: "Self-Validating Documents",
        meaning: "An invoice carries its own mathematical proof: sum of lines = subtotal, subtotal + tax = total. Correctness is verifiable without trusting the AI model's internal confidence."
      },
      {
        concept: "Transcription vs. Judgement",
        meaning: "Models excel at 'what is printed here?' but degrade when asked 'which of these 3 addresses is the supplier?'. Ask for transcription, decide semantics in code."
      }
    ]
  },
  {
    id: "gl-master-mapping",
    title: "GL Master Mapping & Benchmark Classification Platform",
    subtitle: "36.5k LOC Internal SaaS | Sole Full-Stack Engineer | 6 ERP Integrations",
    company: "Paperchase Accountancy Ltd",
    period: "Jul 2025 – Present",
    category: "Full-Stack Platform",
    summary: "Internal platform serving a hospitality accounting practice. Ingests client charts of accounts from 6 ERP systems (QuickBooks Online/Desktop, Xero, Sage X3, Iplicit, Great Plains) and classifies every GL line item into a 70-category cross-client benchmarking taxonomy.",
    metrics: [
      { label: "Codebase Scale", value: "36,500 LOC (TS/Py)" },
      { label: "API Endpoints", value: "69 Endpoints" },
      { label: "ERP Systems", value: "6 Integrated" },
      { label: "Auto-Classification", value: "100% on typical clients" },
    ],
    highlight: "Diagnosed a silent data corruption defect affecting 79% of 12,087 stored mappings, caused by an un-keyed taxonomy expansion from 31 to 70 categories, and built an idempotent self-healing pipeline.",
    bullets: [
      "Designed and shipped a 6-tier classification waterfall: curated mappings -> learned overlay -> exact/normalized artifact lookup -> GL-code Jaccard gating -> Azure OpenAI embeddings -> TF-IDF fallback.",
      "Eliminated manual mapping of 150–200 accounts per client onboarding, achieving 100% auto-classification on typical charts of accounts.",
      "Discovered and resolved the 79% taxonomy drift defect by decoupling vocabulary derivation from hardcoded constants, making schema drift structurally impossible.",
      "Engineered point-in-time snapshot and transactional safe-restore for destructive bulk operations with 53 automated consistency assertions re-verifying bystander records byte-by-byte.",
      "Implemented progressive Server-Sent Events (SSE) streaming with offset-based resume and heartbeat pings so 500-row grids render instantly without blocking HTTP connections.",
      "Built a 3,690-line React virtualized data grid with client-side pagination, global regex search, inline cell editing, and sticky frozen identity headers inside an 1100px iframe."
    ],
    techStack: [
      "Python 3.11", "FastAPI", "React 18", "TypeScript", "Tailwind CSS", "SQL Server",
      "Azure OpenAI Embeddings", "Azure Key Vault", "AKS", "Docker", "SSE Streaming", "dnd-kit"
    ],
    keyLessons: [
      {
        concept: "The 79% Taxonomy Drift Bug",
        meaning: "Every stale code was inside the valid range, so all validators passed. The tell was a mapping whose code and name disagreed. Fix: derive taxonomy strictly from live database schema."
      },
      {
        concept: "When NOT to Automate",
        meaning: "When 5 old categories split into several new ones, auto-resolving would provide confident errors. Routing 438 ambiguous accounts to human accounting review was the superior engineering decision."
      }
    ]
  },
  {
    id: "bar-vision",
    title: "Bar Vision: Video-to-Inventory Computer Vision System",
    subtitle: "Zero-Shot Open-Vocabulary Detection + Optical Flow Camera Pose Recovery",
    company: "Paperchase Accountancy Ltd",
    period: "Jul 2025 – Present",
    category: "Computer Vision",
    summary: "An end-to-end video-to-inventory pipeline converting smartphone video of a bar's shelf into a deduplicated product count and per-bottle liquid fill-level estimate, reviewable in a browser.",
    metrics: [
      { label: "Pose Tracking Inliers", value: "0.41 -> 0.95" },
      { label: "Path Segments", value: "6 -> 1 Unified" },
      { label: "Duplicate Suppression", value: "35% Raw Detections" },
      { label: "Model Architecture", value: "OWLv2 + 2D CNN" },
    ],
    highlight: "Solved cross-frame double counting by recovering camera pose via optical flow and RANSAC affine estimation, counting only frames whose spatial footprints did not overlap.",
    bullets: [
      "Engineered an end-to-end CV pipeline utilizing zero-shot open-vocabulary detection (OWLv2) in PyTorch, removing the need for labelled training datasets.",
      "Solved camera cross-frame double-counting by recovering camera trajectory via optical flow and RANSAC, raising tracking reliability from 0.41 to 0.95 inlier ratio.",
      "Diagnosed coordinate-normalization bugs causing systematic over-counting, correcting inventory totals by up to 40% on test footage.",
      "Built a hybrid CV + Vision-LLM architecture where classical CV handles spatial detection and counting, while the VLM is constrained to bounded classification with a mandatory abstention path.",
      "Trained a custom 2D CNN liquid-level regressor (MAE 0.144 fill fraction) and caught cross-validation data leakage inflating scores by 47%, fixing it via group-by-entity splits.",
      "Enforced strict commercial open-source license compliance, excluding AGPL-3.0 dependencies (Ultralytics/YOLO, BoxMOT) and verifying commercial dataset terms."
    ],
    techStack: [
      "PyTorch", "Python", "OpenCV", "OWLv2 (Zero-Shot Detection)", "Optical Flow", "RANSAC",
      "Vision-Language Models", "2D CNN", "FastAPI", "Async Job Queue"
    ],
    keyLessons: [
      {
        concept: "Spatial Dedup Over Object Tracking",
        meaning: "Per-object tracking fails on chaotic handheld video. Tracking the camera's spatial trajectory instead and only sampling distinct viewpoints is orders of magnitude more robust."
      },
      {
        concept: "VLM Counting Limitations",
        meaning: "VLMs are reliable at judging a single cropped bottle label, but consistently fail when asked to count dense clusters. Classical CV for counting, VLM for identification."
      }
    ]
  },
  {
    id: "pharma-ocr",
    title: "PharmaAI: Agreement OCR to Multi-Currency Invoice Engine",
    subtitle: "Enterprise Contract Extraction & Multi-Currency Export Billing Engine",
    company: "Pharmazone / PIYTECH Solutions",
    period: "Oct 2025 – Present",
    category: "Document AI",
    summary: "Production document automation engine that ingests signed pharmaceutical Master Service Agreements (MSAs), Statements of Work (SOWs), Quotations, and Purchase Orders to extract commercial terms, milestone schedules, and CRO scopes, automatically generating compliant GST/LUT multi-currency export invoices.",
    metrics: [
      { label: "Agreements Mapped", value: "14 Live Contracts" },
      { label: "Extraction Accuracy", value: "100% Milestones & Tax" },
      { label: "Unit Economics", value: "~$0.04 / Document" },
      { label: "Currencies Supported", value: "USD, EUR, INR (SWIFT)" }
    ],
    highlight: "Designed an automated milestone derivation engine that matches signed contract payment terms (e.g. 50% on signing, 50% on draft report), maps project codes to HSN 998113 regulatory service lines, and auto-routes bank details to currency-specific HDFC international SWIFT accounts.",
    bullets: [
      "Engineered a multi-page PDF agreement extraction pipeline combining Azure Document Intelligence layout extraction with focused GPT-4o vision verification.",
      "Derived automated milestone tracking (e.g. 50% signing, 50% draft report) with deterministic cross-verification against original contract values.",
      "Implemented multi-currency banking dispatch automatically routing USD, EUR, and INR invoices to corresponding HDFC international SWIFT accounts.",
      "Automated Indian GST regulatory compliance distinguishing export invoices under Letter of Undertaking (LUT with 0% tax) with live forex conversion versus domestic 18% CGST/SGST.",
      "Built interactive web review interface in React and FastAPI allowing finance controllers to review auto-extracted milestone invoices with one-click export."
    ],
    techStack: [
      "Azure Document Intelligence", "Azure OpenAI (GPT-4o)", "FastAPI", "Python", "React 19", "TypeScript", "Tailwind CSS", "GST / LUT Invariant Engine"
    ],
    keyLessons: [
      {
        concept: "Deterministic Financial Invariants",
        meaning: "Never ask an LLM to guess currency conversions or GST percentages. Extract the raw milestone numbers, and compute the tax, currency exchange, and net totals in deterministic verified code."
      },
      {
        concept: "Contract Scope Boundary Derivation",
        meaning: "Pharmaceutical agreements often embed multi-site monitoring fees. Decoupling fixed milestone advances from pass-through investigator expenses prevents costly billing oversights."
      }
    ],
    architectureBreakdown: {
      input: "Signed Pharmaceutical Contracts (PDF): MSAs, SOWs, Quotations, and Purchase Orders (USD, EUR, INR)",
      orchestration: "Azure Document Intelligence -> GPT-4o Vision Pass -> Milestone Derivation Engine -> GST/LUT Tax Validator",
      verification: "Deterministic milestone % cross-check -> Forex valuation check -> HSN 998113 validation -> HDFC SWIFT account match",
      output: "Official PDF and structured JSON export invoices compliant with Indian Customs LUT and client accounting standards"
    }
  },
  {
    id: "promoters-copilot",
    title: "Promoter's Copilot: Financial Extraction & Forecasting",
    subtitle: "AI Tool for Structured Financial Extraction and Predictive Analytics",
    company: "atQor Technologies",
    period: "Aug 2023 – Jul 2025",
    category: "Agentic AI",
    summary: "An enterprise AI tool for analyzing financial documents and generating data-driven responses through automated text extraction, calculation, and time-series forecasting.",
    metrics: [
      { label: "Core Service", value: "Azure Document Intelligence" },
      { label: "Analytics", value: "Time-Series Forecasting" },
      { label: "Role", value: "AI Engineer" },
    ],
    highlight: "Integrated Azure services to orchestrate data workflows and deliver query-based financial insights through an intuitive executive dashboard.",
    bullets: [
      "Used Azure AI Document Intelligence to extract structured balance sheets and P&L data from financial PDFs using prebuilt and custom models.",
      "Built forecasting models on historical financial data to support strategic decision-making and cash flow projections.",
      "Engineered automated workflows orchestrating multi-format financial inputs into unified SQL schemas."
    ],
    techStack: ["Python", "FastAPI", "Azure OpenAI", "Azure Document Intelligence", "Time-Series Analytics"]
  },
  {
    id: "manufacturing-copilot",
    title: "Manufacturing Copilot: Equipment Identification & Q&A",
    subtitle: "Multilingual Multimodal Assistant for Industrial Equipment & ERP/MES",
    company: "atQor Technologies",
    period: "Aug 2023 – Jul 2025",
    category: "Computer Vision",
    summary: "An AI assistant enabling factory floor equipment identification and instant troubleshooting resolution from uploaded smartphone images.",
    metrics: [
      { label: "Languages", value: "English, Hindi, Gujarati, Bengali" },
      { label: "Integration", value: "ERP / MES Systems" },
      { label: "Modality", value: "Voice + Image + Text" },
    ],
    highlight: "Combined Azure Computer Vision with vector similarity retrieval to ground troubleshooting manuals directly against machine snapshots.",
    bullets: [
      "Used Azure Computer Vision and a vector database to identify industrial equipment models and retrieve specific maintenance manuals.",
      "Built a multilingual chatbot supporting 4 Indian languages for contextual technical Q&A using Azure OpenAI.",
      "Integrated voice/text queries with role-based access control directly hooked into factory ERP/MES systems."
    ],
    techStack: ["Azure Computer Vision", "Azure OpenAI", "Vector DB", "FastAPI", "Multilingual NLP", "Speech API"]
  },
  {
    id: "visitor-management",
    title: "Smart Corporate Visitor Management System",
    subtitle: "Facial Recognition, Dynamic QR Check-in & Host Approval Workflows",
    company: "atQor Technologies",
    period: "Aug 2023 – Jul 2025",
    category: "Full-Stack Platform",
    summary: "A smart visitor check-in and approval system integrating Microsoft and Azure cloud services for high-security corporate facilities.",
    metrics: [
      { label: "Verification", value: "Facial Biometrics & QR" },
      { label: "Notification", value: "Real-time SMS / Email" },
      { label: "Platform", value: "Power Automate + Azure" },
    ],
    highlight: "Enabled facial-recognition autofill for returning visitors, drastically reducing reception queues.",
    bullets: [
      "Built Power Automate flows for walk-in, returning, and advance visitor registration with face/ID scan.",
      "Developed multi-stage host approval flows with real-time SMS/email notifications and secure QR check-in/out.",
      "Delivered filtered CSV analytics reporting for facility security administrators."
    ],
    techStack: ["Azure Face API", "Power Automate", "Azure Cloud Services", "QR Integration", "CSV Analytics"]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Agentic AI & Orchestration",
    description: "Multi-agent systems, context engineering, and self-healing LLM workflows",
    skills: [
      { name: "Multi-Agent Systems", level: "Expert", highlight: "6 Specialist + 5 Supporting LLM Architecture" },
      { name: "Model Context Protocol (MCP)", level: "Expert", highlight: "JSON-RPC database brokers with Key Vault JWTs" },
      { name: "LLM-as-a-Judge", level: "Expert", highlight: "Pre-execution SQL AST & logic verification" },
      { name: "Context & Prompt Engineering", level: "Expert", highlight: "Dynamic online few-shot retrieval" },
      { name: "Semantic Kernel & LangChain", level: "Advanced", highlight: "Production pipelines & agentic memory" },
      { name: "Episodic Memory (LangMem)", level: "Advanced", highlight: "BGE sentence embeddings on Cosmos DB" },
      { name: "Semantic Caching", level: "Advanced", highlight: "24h TTL cosine similarity cache" },
      { name: "Self-Correcting Retry Loops", level: "Advanced", highlight: "AST short-circuiting on repeating query faults" },
    ]
  },
  {
    title: "Document AI & Computer Vision",
    description: "Multimodal perception, zero-shot detection, and OCR reconciliation",
    skills: [
      { name: "Azure Document Intelligence", level: "Expert", highlight: "Hybrid layout & table extraction" },
      { name: "GPT-4o Vision & VLMs", level: "Expert", highlight: "Focused header identity passes" },
      { name: "Zero-Shot Detection (OWLv2)", level: "Advanced", highlight: "Open-vocabulary retail detection" },
      { name: "Optical Flow & RANSAC", level: "Advanced", highlight: "Camera pose trajectory recovery" },
      { name: "OpenCV & PyTorch", level: "Advanced", highlight: "CNN liquid-level regressors" },
      { name: "Arithmetic Reconciliation", level: "Expert", highlight: "Deterministic total & tax verification" },
      { name: "License Compliance Auditing", level: "Advanced", highlight: "AGPL-3 rejection for enterprise safety" },
    ]
  },
  {
    title: "Backend & Cloud Architecture",
    description: "High-throughput APIs, streaming protocols, and cloud infrastructure",
    skills: [
      { name: "Python 3.11 & FastAPI", level: "Expert", highlight: "Sub-app mounting & async job queues" },
      { name: "Node.js & Express", level: "Advanced", highlight: "NDJSON streaming & REST APIs" },
      { name: "Azure Kubernetes Service (AKS)", level: "Advanced", highlight: "Multi-stage arm64 Docker builds & Key Vault" },
      { name: "Azure API Management", level: "Advanced", highlight: "Enterprise gateway routing" },
      { name: "SSE Streaming & NDJSON", level: "Expert", highlight: "Heartbeat resume for 500-row grids" },
      { name: "Performance Profiling", level: "Expert", highlight: "Diagnosed AKS CPU throttling (52s -> 20s)" },
    ]
  },
  {
    title: "Databases & Vector Stores",
    description: "Relational integrity, row-level security, and high-dimensional search",
    skills: [
      { name: "PostgreSQL with RLS", level: "Expert", highlight: "Row-Level Security for multi-tenant isolation" },
      { name: "SQL Server (T-SQL)", level: "Expert", highlight: "Complex financial query generation" },
      { name: "Azure Cosmos DB", level: "Advanced", highlight: "Multi-layer conversational store" },
      { name: "Vector Databases", level: "Advanced", highlight: "Pinecone, Qdrant, ChromaDB" },
      { name: "SQLite VACUUM & Audit Diffs", level: "Advanced", highlight: "Fixed-size volume disk reclamation" },
    ]
  },
  {
    title: "Frontend & Visualization",
    description: "Production-grade UI engineering, data grids, and fluid motion",
    skills: [
      { name: "React 19 / 18 & TypeScript", level: "Expert", highlight: "94 production modules & custom state" },
      { name: "Tailwind CSS & Design Systems", level: "Expert", highlight: "Token-only brand palettes" },
      { name: "Large-Scale Data Grids", level: "Expert", highlight: "3,690-line grid with frozen headers" },
      { name: "Recharts & Visual Analytics", level: "Advanced", highlight: "Financial charts & trendlines" },
      { name: "dnd-kit & Portals", level: "Advanced", highlight: "Drag-and-drop hierarchy reordering" },
    ]
  },
  {
    title: "Enterprise Practices & Tooling",
    description: "Data integrity, evaluation harnesses, and developer operations",
    skills: [
      { name: "Azure DevOps CI/CD", level: "Advanced", highlight: "Automated arm64 build pipelines" },
      { name: "Evaluation Harnesses", level: "Expert", highlight: "50-question ground-truth evaluation suites" },
      { name: "Idempotent Migrations", level: "Expert", highlight: "Safe snapshot & transactional restore" },
      { name: "Figma & UI/UX Design", level: "Advanced", highlight: "Enterprise wireframing & token systems" },
    ]
  }
];

export const workExperience: Experience[] = [
  {
    role: "AI Engineer (Hospitality & Financial Analytics)",
    company: "Paperchase Accountancy Ltd",
    location: "Ahmedabad, India",
    period: "Jul 2025 – Present",
    description: "Sole owner and lead AI engineer building enterprise multi-agent financial intelligence and document automation platforms.",
    bullets: [
      "Engineered a multi-agent NLP-to-SQL platform on Azure OpenAI with 6 specialist agents, 4 memory tiers, and 3-layer deterministic verification.",
      "Built 'Papertrail' Intelligent Document Processing pipeline on Azure Kubernetes Service, cutting per-invoice processing time from 52s to 20s (~60%).",
      "Owned the 36.5k LOC GL Master Mapping platform, diagnosing and resolving a silent 79% taxonomy drift across 12,087 stored records.",
      "Developed Bar Vision: an OWLv2 zero-shot video inventory counting system with optical flow camera pose recovery.",
      "Collaborated on Azure DevOps CI/CD, managing Key Vault credentials, AKS deployment, and multi-tenant PostgreSQL Row-Level Security."
    ],
    skills: ["Azure OpenAI", "FastAPI", "TypeScript", "React 19", "AKS", "Document Intelligence", "PyTorch", "MCP"]
  },
  {
    role: "AI Engineer",
    company: "atQor Technologies Private Ltd",
    location: "Ahmedabad, India",
    period: "Aug 2023 – Jul 2025",
    description: "Designed multilingual AI copilots, computer vision inspection systems, and enterprise knowledge assistants.",
    bullets: [
      "Built enterprise AI applications integrating Azure OpenAI, Cognitive Services, vector databases, LangChain, and Semantic Kernel.",
      "Developed Manufacturing Copilot with equipment image recognition and multilingual Q&A (English, Hindi, Gujarati, Bengali).",
      "Delivered Promoter's Copilot for automated financial PDF extraction and time-series balance sheet forecasting.",
      "Led cross-functional teams across AI automation projects to streamline business operations and improve client productivity."
    ],
    skills: ["Azure Cognitive Services", "Computer Vision", "LangChain", "Vector DBs", "FastAPI", "Python"]
  },
  {
    role: "Trainee Engineer",
    company: "GetOnCRM Solutions Private Ltd",
    location: "Ahmedabad, India",
    period: "Jan 2023 – Aug 2023",
    description: "Collaborated on production CRM applications, developing Lightning Web Components (LWC) and optimizing backend Apex workflows.",
    bullets: [
      "Built custom Lightning Web Components (LWC) for enterprise customer relationship workflows.",
      "Strengthened software engineering fundamentals, unit testing, and agile team collaboration."
    ],
    skills: ["Salesforce LWC", "Apex", "JavaScript", "CRM Workflows"]
  },
  {
    role: "AI & Full-Stack Freelance Consultant",
    company: "Self-Employed",
    location: "Ahmedabad, India",
    period: "Jan 2022 – Dec 2023",
    description: "Delivered bespoke AI solutions, NLP chatbots, and data extraction pipelines for growing businesses.",
    bullets: [
      "Developed custom AI solutions using Python and Azure AI services, including text extraction and NLP chatbots.",
      "Built lightweight ML models for classification and time-series document parsing."
    ],
    skills: ["Python", "Azure AI", "REST APIs", "NLP", "Machine Learning"]
  }
];

export const awards: Award[] = [
  {
    title: "Winner, Overall Azure OpenAI Category",
    organization: "Microsoft Agentic AI Hackathon",
    year: "2025",
    badge: "Champion",
    description: "Recognized by Microsoft engineering leadership for exceptional multi-agent design, self-correcting logic verification, and enterprise-grade implementation on Azure OpenAI."
  },
  {
    title: "Student Solar Ambassador",
    organization: "IIT Bombay",
    year: "2022",
    badge: "Honored",
    description: "Selected as Solar Ambassador by the Indian Institute of Technology (IIT) Bombay for leadership in clean energy advocacy and technical initiative."
  }
];

export const certifications: Certification[] = [
  { name: "Salesforce Agentforce Specialist", issuer: "Salesforce", status: "Active" },
  { name: "Salesforce Certified Administrator", issuer: "Salesforce", status: "Active" },
  { name: "Salesforce Certified Associate", issuer: "Salesforce", status: "Active" },
];

export const engineeringPrinciples = [
  {
    title: "Transcription vs. Judgement",
    quote: "Models are reliable at 'what is printed here?' and unreliable at 'which of these is the right one?'. Ask for the former; decide in code.",
    application: "In Papertrail, we extract layout text via Document Intelligence, but run field selection, tie-breaking, and validation in unit-tested deterministic Python/Node code."
  },
  {
    title: "Self-Validating Documents",
    quote: "An invoice carries its own mathematical proof: sum of lines = subtotal, subtotal + tax = total.",
    application: "We catch incorrect extractions before they touch the general ledger, never relying purely on model confidence scores."
  },
  {
    title: "Fail Loudly, Not Silently",
    quote: "A wrong number that is flagged is recoverable; a wrong number marked 'OK' is not.",
    application: "Every document and SQL query carries a machine-readable validation verdict. When ambiguity exists (e.g. 438 GL accounts), we route to human review rather than hallucinating."
  },
  {
    title: "Cost-Gated AI Calls",
    quote: "Expensive AI re-reads must be gated on proof of mathematical error.",
    application: "The system only spends cloud compute when an invariant check fails, keeping average invoice extraction down to ~$0.03."
  },
  {
    title: "Measure Before Optimising",
    quote: "Several 'obvious' application fixes were measured and rejected; the real performance win was a Kubernetes CPU limit.",
    application: "Diagnosing AKS CPU throttling reduced pipeline latency by 60% without modifying application algorithms."
  }
];
