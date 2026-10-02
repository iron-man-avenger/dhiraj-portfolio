import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, CheckCircle2 } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

interface LogLine {
  id: string;
  type: 'cmd' | 'info' | 'success' | 'warn' | 'dim';
  text: string;
}

const PRESET_SCENARIOS = [
  {
    label: 'AST Invariant',
    command: 'run verify-ast --strict',
    logs: [
      { type: 'cmd', text: '$ agentic-cli verify-ast --strict --target=PnL_Variance' },
      { type: 'info', text: '⟳ Ingesting natural query: "draft beer variance vs budget"' },
      { type: 'dim', text: '  [Router] Dispatched to SQL_Specialist (id: ag-04)' },
      { type: 'warn', text: '  ! Invariant Guard: Stale taxonomy drift detected in Cat_09' },
      { type: 'info', text: '  [Self-Heal] Derived catalog vocabulary from live DB schema' },
      { type: 'success', text: '✔ Invariant Verified: 100% Deterministic match (24ms)' },
    ] as LogLine[]
  },
  {
    label: 'Consensus Swarm',
    command: 'swarm consensus --quorum=3',
    logs: [
      { type: 'cmd', text: '$ agentic-cli swarm consensus --quorum=3' },
      { type: 'dim', text: '  [Agent 1: Semantic Parser] Extracted 4 parameters' },
      { type: 'dim', text: '  [Agent 2: MCP Broker] Retrieved RLS Token for Site #4' },
      { type: 'dim', text: '  [Agent 3: Math Critic] Cross-verified line-item sums' },
      { type: 'success', text: '✔ Consensus Quorum Reached (3/3 votes, latency: 31ms)' },
    ] as LogLine[]
  },
  {
    label: 'Vision OWL-v2',
    command: 'vision eval --zero-shot',
    logs: [
      { type: 'cmd', text: '$ agentic-cli vision eval --zero-shot --threshold=0.92' },
      { type: 'info', text: '⟳ Ingesting smartphone stream (1920x1080 @ 30fps)' },
      { type: 'dim', text: '  [Optical Flow] Camera trajectory pose recovery: Inliers 0.95' },
      { type: 'success', text: '✔ Detected 18 bottles with liquid fill level (Confidence: 98.4%)' },
    ] as LogLine[]
  }
];

export const AgentTerminalSandbox: React.FC = () => {
  const [logs, setLogs] = useState<LogLine[]>(PRESET_SCENARIOS[0].logs);
  const [isRunning, setIsRunning] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const runScenario = (idx: number) => {
    if (isRunning) return;
    sounds.playPillSelect();
    setActiveScenarioIdx(idx);
    setIsRunning(true);
    setLogs([]);

    const scenarioLogs = PRESET_SCENARIOS[idx].logs;
    scenarioLogs.forEach((line, i) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, line]);
        if (i === scenarioLogs.length - 1) {
          setIsRunning(false);
        }
      }, (i + 1) * 220);
    });
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isRunning) return;
    sounds.playTap();

    const cmd = inputValue.trim().toLowerCase();
    const newLogs: LogLine[] = [
      ...logs,
      { id: String(Date.now()), type: 'cmd', text: `$ ${inputValue.trim()}` }
    ];

    if (cmd === 'clear') {
      setLogs([]);
      setInputValue('');
      return;
    } else if (cmd === 'help') {
      newLogs.push(
        { id: String(Date.now() + 1), type: 'info', text: 'Available commands: status, agents, verify, clear, eval' }
      );
    } else if (cmd === 'status') {
      newLogs.push(
        { id: String(Date.now() + 1), type: 'success', text: 'All 6 Autonomous Agents Healthy • Invariant Proof: 100%' }
      );
    } else if (cmd === 'agents') {
      newLogs.push(
        { id: String(Date.now() + 1), type: 'dim', text: '1: Semantic Router (Ready)\n2: AST Judge (Online)\n3: Vision OWL-v2 (Active)\n4: MCP DB Broker (Connected)' }
      );
    } else {
      newLogs.push(
        { id: String(Date.now() + 1), type: 'warn', text: `Executing: ${cmd} ... Verified with deterministic pass.` }
      );
    }

    setLogs(newLogs);
    setInputValue('');
  };

  const handleReset = () => {
    sounds.playTap();
    setLogs(PRESET_SCENARIOS[0].logs);
  };

  return (
    <div className="relative w-full h-[280px] bg-[#242925] rounded-2xl border border-[#39403B] shadow-elevated flex flex-col justify-between overflow-hidden text-white font-mono select-none">
      
      {/* Terminal Titlebar */}
      <div className="px-3.5 py-2 bg-[#1C201D] border-b border-[#39403B] flex items-center justify-between text-[11px] text-white/70">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[10px] font-mono text-white/60 ml-2">dhiraj@agent-sandbox:~</span>
        </div>

        <div className="flex items-center gap-1">
          {PRESET_SCENARIOS.map((sc, i) => (
            <button
              key={sc.label}
              onClick={() => runScenario(i)}
              disabled={isRunning}
              className={`px-2 py-0.5 rounded text-[9px] font-mono font-semibold transition-all ${
                activeScenarioIdx === i
                  ? 'bg-amber text-[#2B302C] shadow-sm'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              {sc.label}
            </button>
          ))}
          <button
            onClick={handleReset}
            className="p-1 rounded text-white/50 hover:text-white hover:bg-white/10 transition-colors ml-1"
            title="Reset Terminal"
          >
            <RotateCcw className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>

      {/* Terminal Stream Body */}
      <div className="flex-1 p-3.5 overflow-y-auto space-y-1 text-[11px] leading-relaxed select-text font-mono">
        {logs.map((log, idx) => (
          <div key={idx} className="flex items-start gap-1.5">
            {log.type === 'cmd' && <span className="text-amber font-bold">{log.text}</span>}
            {log.type === 'info' && <span className="text-cyan-400">{log.text}</span>}
            {log.type === 'success' && (
              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3 h-3 shrink-0" />
                <span>{log.text}</span>
              </span>
            )}
            {log.type === 'warn' && <span className="text-amber-300">{log.text}</span>}
            {log.type === 'dim' && <span className="text-white/60">{log.text}</span>}
          </div>
        ))}
        {isRunning && (
          <div className="text-amber flex items-center gap-1 animate-pulse text-[10px]">
            <span>⟳ Executing verified agent pipeline...</span>
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Interactive CLI Input Line */}
      <form onSubmit={handleInputSubmit} className="p-2 bg-[#1C201D] border-t border-[#39403B] flex items-center gap-2">
        <span className="text-amber font-bold text-xs pl-1">$</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type 'help', 'status', 'agents' or command..."
          className="flex-1 bg-transparent text-white text-[11px] font-mono outline-none placeholder:text-white/30"
        />
        <button
          type="submit"
          disabled={isRunning || !inputValue.trim()}
          className="px-2.5 py-0.5 rounded bg-amber/20 border border-amber/40 text-amber text-[10px] font-semibold hover:bg-amber hover:text-[#2B302C] transition-all disabled:opacity-30 disabled:pointer-events-none"
        >
          Run
        </button>
      </form>

    </div>
  );
};
