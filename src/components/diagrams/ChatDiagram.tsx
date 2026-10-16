import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ChatDiagram() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="w-full my-6 rounded-md border border-line bg-surface p-4 overflow-x-auto">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-line text-xs font-mono text-muted">
        <span>architecture: multi-agent-chat-system</span>
        <span className="text-[10px] text-accent">LangGraph Supervisor Engine</span>
      </div>

      <svg
        viewBox="0 0 760 270"
        className="w-full min-w-[700px] h-auto font-mono text-xs select-none"
        aria-hidden="true"
      >
        <defs>
          <marker
            id="chat-arrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#14857B" />
          </marker>
        </defs>

        {/* Tracing & Boundary */}
        <rect
          x="10"
          y="10"
          width="740"
          height="250"
          rx="6"
          fill="none"
          stroke="#1D2E37"
          strokeDasharray="4 4"
        />
        <text x="25" y="30" fill="#8CA2AB" fontSize="10">
          LangSmith Distributed Tracing Boundary
        </text>

        {/* React Client */}
        <rect x="25" y="80" width="105" height="60" rx="4" fill="#122028" stroke="#1D2E37" />
        <text x="77" y="105" fill="#D8E4E8" fontSize="11" textAnchor="middle" fontWeight="bold">
          React Client
        </text>
        <text x="77" y="122" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          SSE Stream UI
        </text>

        {/* Client to FastAPI */}
        <line x1="130" y1="100" x2="175" y2="100" stroke="#14857B" strokeWidth="1.5" markerEnd="url(#chat-arrow)" />
        <text x="152" y="93" fill="#8CA2AB" fontSize="8" textAnchor="middle">JWT</text>
        {/* SSE return line */}
        <line x1="175" y1="120" x2="130" y2="120" stroke="#2DD4C4" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#chat-arrow)" />
        <text x="152" y="133" fill="#2DD4C4" fontSize="8" textAnchor="middle">SSE Stream</text>

        {/* FastAPI Edge */}
        <rect x="180" y="70" width="115" height="75" rx="4" fill="#0D161B" stroke="#2DD4C4" />
        <text x="237" y="98" fill="#2DD4C4" fontSize="11" textAnchor="middle" fontWeight="bold">
          FastAPI
        </text>
        <text x="237" y="114" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          JWT Auth Guard
        </text>
        <text x="237" y="128" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          Token Generator
        </text>

        {/* FastAPI to Supervisor */}
        <line x1="295" y1="110" x2="335" y2="110" stroke="#14857B" strokeWidth="1.5" markerEnd="url(#chat-arrow)" />

        {/* Supervisor Agent */}
        <rect x="340" y="65" width="130" height="90" rx="4" fill="#122028" stroke="#2DD4C4" />
        <text x="405" y="93" fill="#2DD4C4" fontSize="11" textAnchor="middle" fontWeight="bold">
          Supervisor Agent
        </text>
        <text x="405" y="110" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          LangGraph Router
        </text>
        <text x="405" y="126" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          State Coordination
        </text>

        {/* 3 Sub-Agents */}
        {/* Sub-Agent 1: RAG Pinecone */}
        <line x1="470" y1="85" x2="525" y2="55" stroke="#14857B" strokeWidth="1.5" markerEnd="url(#chat-arrow)" />
        <rect x="530" y="30" width="180" height="45" rx="4" fill="#0D161B" stroke="#1D2E37" />
        <text x="620" y="50" fill="#D8E4E8" fontSize="10" textAnchor="middle" fontWeight="bold">
          RAG Agent
        </text>
        <text x="620" y="65" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          Pinecone Vector DB Search
        </text>

        {/* Sub-Agent 2: NL-to-SQL */}
        <line x1="470" y1="110" x2="525" y2="110" stroke="#14857B" strokeWidth="1.5" markerEnd="url(#chat-arrow)" />
        <rect x="530" y="90" width="180" height="45" rx="4" fill="#0D161B" stroke="#1D2E37" />
        <text x="620" y="110" fill="#D8E4E8" fontSize="10" textAnchor="middle" fontWeight="bold">
          NL-to-SQL Agent
        </text>
        <text x="620" y="125" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          Schema Introspection &amp; Exec
        </text>

        {/* Sub-Agent 3: Web Search */}
        <line x1="470" y1="135" x2="525" y2="165" stroke="#14857B" strokeWidth="1.5" markerEnd="url(#chat-arrow)" />
        <rect x="530" y="150" width="180" height="45" rx="4" fill="#0D161B" stroke="#1D2E37" />
        <text x="620" y="170" fill="#D8E4E8" fontSize="10" textAnchor="middle" fontWeight="bold">
          Web Search Agent
        </text>
        <text x="620" y="185" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          Live External Retrieval
        </text>

        {/* Memory Tier at Bottom */}
        <rect x="240" y="200" width="230" height="45" rx="4" fill="#122028" stroke="#1D2E37" />
        <text x="355" y="219" fill="#D8E4E8" fontSize="10" textAnchor="middle" fontWeight="bold">
          PostgreSQL Checkpointers &amp; MongoDB
        </text>
        <text x="355" y="234" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          Persistent Multi-Turn Memory &amp; Chat History
        </text>
        <line x1="405" y1="155" x2="405" y2="195" stroke="#14857B" strokeWidth="1.5" markerEnd="url(#chat-arrow)" />

        {/* Pulse */}
        {!prefersReduced && (
          <circle cx="237" cy="110" r="3" fill="#2DD4C4">
            <animate attributeName="cx" values="130; 237; 405; 530" dur="4.5s" repeatCount="1" />
            <animate attributeName="opacity" values="0.8; 1; 0.8; 0" dur="4.5s" repeatCount="1" />
          </circle>
        )}
      </svg>
    </div>
  );
}
