import React, { useRef, useEffect, useState } from 'react';
import { RotateCcw, Zap } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

interface AgentNode {
  id: string;
  name: string;
  role: string;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  targetX: number;
  targetY: number;
  status: string;
  latency: string;
}

interface Packet {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  progress: number;
  speed: number;
  color: string;
}

export const AgentSwarmCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<AgentNode | null>(null);
  const [pulseActive, setPulseActive] = useState(false);
  const [draggedNodeIndex, setDraggedNodeIndex] = useState<number | null>(null);

  // Nodes definition
  const nodesRef = useRef<AgentNode[]>([
    { id: 'router', name: 'Semantic Router', role: 'Orchestrator', color: '#D4A066', x: 200, y: 80, vx: 0, vy: 0, radius: 24, targetX: 200, targetY: 80, status: 'Active Routing', latency: '14ms' },
    { id: 'ast', name: 'AST Logic Judge', role: 'Verification', color: '#10B981', x: 100, y: 150, vx: 0, vy: 0, radius: 21, targetX: 100, targetY: 150, status: 'Invariant Hold 100%', latency: '22ms' },
    { id: 'vision', name: 'OWL-v2 Vision', role: 'Zero-Shot Model', color: '#06B6D4', x: 300, y: 140, vx: 0, vy: 0, radius: 22, targetX: 300, targetY: 140, status: 'BBox Inlier 0.95', latency: '48ms' },
    { id: 'memory', name: 'Vector Memory', role: 'Cosmos + Qdrant', color: '#8B5CF6', x: 80, y: 240, vx: 0, vy: 0, radius: 20, targetX: 80, targetY: 240, status: '24h TTL Sync', latency: '8ms' },
    { id: 'mcp', name: 'MCP DB Broker', role: 'JSON-RPC Tool', color: '#F59E0B', x: 210, y: 220, vx: 0, vy: 0, radius: 23, targetX: 210, targetY: 220, status: 'RLS Verified', latency: '19ms' },
    { id: 'critic', name: 'Invariant Critic', role: 'Deterministic Gate', color: '#EF4444', x: 320, y: 240, vx: 0, vy: 0, radius: 21, targetX: 320, targetY: 240, status: '0 Drift Proof', latency: '12ms' },
  ]);

  const packetsRef = useRef<Packet[]>([]);
  const ripplesRef = useRef<{ x: number; y: number; r: number; alpha: number }[]>([]);

  // Layout initialization based on container dimensions
  const updateInitialPositions = (w: number, h: number) => {
    const cx = w / 2;
    const cy = h / 2;
    const nodes = nodesRef.current;
    
    // Position in an organic hexagonal network around center
    nodes[0].targetX = cx;
    nodes[0].targetY = cy - 75;

    nodes[1].targetX = cx - 110;
    nodes[1].targetY = cy - 20;

    nodes[2].targetX = cx + 110;
    nodes[2].targetY = cy - 20;

    nodes[3].targetX = cx - 90;
    nodes[3].targetY = cy + 70;

    nodes[4].targetX = cx;
    nodes[4].targetY = cy + 65;

    nodes[5].targetX = cx + 95;
    nodes[5].targetY = cy + 70;

    // Reset initial positions if first time
    nodes.forEach(n => {
      n.x = n.targetX + (Math.random() - 0.5) * 15;
      n.y = n.targetY + (Math.random() - 0.5) * 15;
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = Math.max(260, rect.height || 260);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      updateInitialPositions(width, height);
    };

    resize();
    window.addEventListener('resize', resize);

    // Spring physics constants
    const k = 0.045; // Spring stiffness
    const damping = 0.82; // Velocity damping

    // Edges connecting agents
    const edges = [
      [0, 1], [0, 2], [0, 4],
      [1, 3], [1, 4],
      [2, 5], [2, 4],
      [3, 4], [4, 5]
    ];

    let lastPacketTime = 0;

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Spawn packets periodically
      if (time - lastPacketTime > 600) {
        lastPacketTime = time;
        const edge = edges[Math.floor(Math.random() * edges.length)];
        const n1 = nodesRef.current[edge[0]];
        const n2 = nodesRef.current[edge[1]];
        if (n1 && n2) {
          packetsRef.current.push({
            fromX: n1.x,
            fromY: n1.y,
            toX: n2.x,
            toY: n2.y,
            progress: 0,
            speed: 0.018 + Math.random() * 0.015,
            color: n1.color
          });
        }
      }

      // Physics update
      const nodes = nodesRef.current;
      nodes.forEach((node, i) => {
        if (draggedNodeIndex !== i) {
          const fx = (node.targetX - node.x) * k;
          const fy = (node.targetY - node.y) * k;
          node.vx = (node.vx + fx) * damping;
          node.vy = (node.vy + fy) * damping;
          node.x += node.vx;
          node.y += node.vy;
        }
      });

      // Draw Ripples
      for (let rIdx = ripplesRef.current.length - 1; rIdx >= 0; rIdx--) {
        const rip = ripplesRef.current[rIdx];
        rip.r += 2.5;
        rip.alpha -= 0.02;
        if (rip.alpha <= 0) {
          ripplesRef.current.splice(rIdx, 1);
        } else {
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(212, 160, 102, ${rip.alpha * 0.6})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      // Draw Synaptic Connection Lines
      edges.forEach(([i1, i2]) => {
        const n1 = nodes[i1];
        const n2 = nodes[i2];
        if (!n1 || !n2) return;

        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.strokeStyle = 'rgba(212, 160, 102, 0.22)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Draw Data Packets
      for (let pIdx = packetsRef.current.length - 1; pIdx >= 0; pIdx--) {
        const p = packetsRef.current[pIdx];
        p.progress += p.speed;
        if (p.progress >= 1) {
          packetsRef.current.splice(pIdx, 1);
        } else {
          const curX = p.fromX + (p.toX - p.fromX) * p.progress;
          const curY = p.fromY + (p.toY - p.fromY) * p.progress;

          ctx.beginPath();
          ctx.arc(curX, curY, 3, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Draw Agent Nodes
      nodes.forEach((node, i) => {
        const isHovered = hoveredNode?.id === node.id;
        const isDragged = draggedNodeIndex === i;

        // Subtle outer glow ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + (isHovered || isDragged ? 7 : 4), 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? `${node.color}30` : `${node.color}15`;
        ctx.fill();

        // Node circle body
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#2B302C';
        ctx.fill();
        ctx.strokeStyle = isHovered || isDragged ? '#FFFFFF' : node.color;
        ctx.lineWidth = isHovered || isDragged ? 2.5 : 1.8;
        ctx.stroke();

        // Inner glowing core
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label below node
        ctx.font = 'bold 9px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = isHovered ? '#1E2320' : '#58615B';
        ctx.fillText(node.name, node.x, node.y + node.radius + 13);
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [draggedNodeIndex, hoveredNode]);

  // Pointer / Mouse drag interaction
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    nodesRef.current.forEach((node, idx) => {
      const dist = Math.hypot(node.x - x, node.y - y);
      if (dist <= node.radius + 10) {
        setDraggedNodeIndex(idx);
        canvas.setPointerCapture(e.pointerId);
        sounds.playTap();
      }
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (draggedNodeIndex !== null) {
      const node = nodesRef.current[draggedNodeIndex];
      if (node) {
        node.x = x;
        node.y = y;
        node.vx = 0;
        node.vy = 0;
      }
    } else {
      let found: AgentNode | null = null;
      nodesRef.current.forEach((node) => {
        const dist = Math.hypot(node.x - x, node.y - y);
        if (dist <= node.radius + 8) {
          found = node;
        }
      });
      setHoveredNode(found);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (draggedNodeIndex !== null) {
      setDraggedNodeIndex(null);
      try {
        canvasRef.current?.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  const handlePulse = () => {
    setPulseActive(true);
    sounds.playPillSelect();
    const cx = (canvasRef.current?.width || 360) / (2 * (window.devicePixelRatio || 1));
    const cy = (canvasRef.current?.height || 260) / (2 * (window.devicePixelRatio || 1));

    ripplesRef.current.push({ x: cx, y: cy, r: 10, alpha: 1 });
    
    // Add velocity excitement to all nodes
    nodesRef.current.forEach(node => {
      const angle = Math.atan2(node.y - cy, node.x - cx);
      node.vx += Math.cos(angle) * 7;
      node.vy += Math.sin(angle) * 7;
    });

    setTimeout(() => setPulseActive(false), 600);
  };

  const handleRebalance = () => {
    sounds.playTap();
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      updateInitialPositions(rect.width, rect.height);
      nodesRef.current.forEach(node => {
        node.vx = (Math.random() - 0.5) * 8;
        node.vy = (Math.random() - 0.5) * 8;
      });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-[280px] flex flex-col justify-between select-none">
      
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none rounded-2xl"
      />

      {/* Floating Hover Tooltip */}
      {hoveredNode && (
        <div 
          className="absolute z-20 pointer-events-none px-3 py-1.5 rounded-lg bg-[#2B302C] text-white text-[10px] font-mono shadow-xl border border-white/10 flex items-center gap-2 transform -translate-x-1/2 -translate-y-full"
          style={{ left: hoveredNode.x, top: Math.max(35, hoveredNode.y - hoveredNode.radius - 8) }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: hoveredNode.color }} />
          <span className="font-bold">{hoveredNode.name}</span>
          <span className="text-white/40">•</span>
          <span className="text-amber">{hoveredNode.status}</span>
          <span className="text-white/40">•</span>
          <span className="text-white/70">{hoveredNode.latency}</span>
        </div>
      )}

      {/* Action Ticker & Controls */}
      <div className="pt-2 px-1 border-t border-[#E3DACD]/70 flex items-center justify-between text-xs font-mono text-charcoal-muted">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] text-charcoal font-semibold">6 Agents Linked</span>
          <span className="text-charcoal-muted/60">•</span>
          <span className="text-[10px] text-charcoal-muted">Elastic Physics</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePulse}
            disabled={pulseActive}
            className="px-2 py-1 rounded-md bg-white border border-[#E3DACD] text-[10px] text-charcoal font-semibold hover:border-amber hover:text-amber-dark transition-colors flex items-center gap-1 shadow-2xs"
            title="Excites nodes with synaptic data pulse"
          >
            <Zap className="w-2.5 h-2.5 text-amber" />
            <span>Pulse</span>
          </button>

          <button
            onClick={handleRebalance}
            className="p-1 rounded-md bg-white border border-[#E3DACD] text-charcoal hover:border-amber hover:text-amber-dark transition-colors shadow-2xs"
            title="Rebalance Network Topology"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

    </div>
  );
};
