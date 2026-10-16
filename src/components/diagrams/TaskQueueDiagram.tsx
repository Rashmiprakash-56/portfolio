import { useReducedMotion } from "@/hooks/useReducedMotion";

export function TaskQueueDiagram() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="w-full my-6 rounded-md border border-line bg-surface p-4 overflow-x-auto">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-line text-xs font-mono text-muted">
        <span>architecture: task-queue-engine</span>
        <span className="text-[10px] text-accent">Docker Compose Boundary</span>
      </div>

      <svg
        viewBox="0 0 740 260"
        className="w-full min-w-[680px] h-auto font-mono text-xs select-none"
        aria-hidden="true"
      >
        <defs>
          <marker
            id="arrow"
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

        {/* Docker Compose Boundary Box */}
        <rect
          x="10"
          y="10"
          width="720"
          height="240"
          rx="6"
          fill="none"
          stroke="#1D2E37"
          strokeDasharray="4 4"
        />
        <text x="25" y="32" fill="#8CA2AB" fontSize="10">
          Docker Compose Network
        </text>

        {/* Producers */}
        <rect x="30" y="85" width="100" height="50" rx="4" fill="#122028" stroke="#1D2E37" />
        <text x="80" y="107" fill="#D8E4E8" fontSize="11" textAnchor="middle" fontWeight="bold">
          Producers
        </text>
        <text x="80" y="123" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          HTTP Requests
        </text>

        {/* Arrow to API */}
        <line x1="130" y1="110" x2="165" y2="110" stroke="#14857B" strokeWidth="1.5" markerEnd="url(#arrow)" />

        {/* Express API */}
        <rect x="170" y="75" width="120" height="70" rx="4" fill="#0D161B" stroke="#2DD4C4" />
        <text x="230" y="103" fill="#2DD4C4" fontSize="11" textAnchor="middle" fontWeight="bold">
          Express API
        </text>
        <text x="230" y="119" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          Auth &amp; Validation
        </text>
        <text x="230" y="133" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          /metrics (Prometheus)
        </text>

        {/* Arrow from API to Redis */}
        <line x1="290" y1="95" x2="335" y2="95" stroke="#14857B" strokeWidth="1.5" markerEnd="url(#arrow)" />
        {/* Arrow from API to Postgres */}
        <line x1="290" y1="125" x2="335" y2="125" stroke="#14857B" strokeWidth="1.5" markerEnd="url(#arrow)" />

        {/* Storage Tier: Redis & PostgreSQL */}
        {/* Redis */}
        <rect x="340" y="45" width="140" height="65" rx="4" fill="#122028" stroke="#1D2E37" />
        <text x="410" y="70" fill="#D8E4E8" fontSize="11" textAnchor="middle" fontWeight="bold">
          Redis
        </text>
        <text x="410" y="86" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          Priority Queues
        </text>
        <text x="410" y="100" fill="#F2B84B" fontSize="9" textAnchor="middle">
          Circuit Breaker
        </text>

        {/* PostgreSQL */}
        <rect x="340" y="125" width="140" height="65" rx="4" fill="#122028" stroke="#1D2E37" />
        <text x="410" y="150" fill="#D8E4E8" fontSize="11" textAnchor="middle" fontWeight="bold">
          PostgreSQL
        </text>
        <text x="410" y="166" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          Row-Level Locking
        </text>
        <text x="410" y="180" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          Job State &amp; Audit
        </text>

        {/* Arrows to Workers */}
        <line x1="480" y1="80" x2="525" y2="95" stroke="#14857B" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <line x1="480" y1="155" x2="525" y2="135" stroke="#14857B" strokeWidth="1.5" markerEnd="url(#arrow)" />

        {/* Workers Node */}
        <rect x="530" y="75" width="120" height="75" rx="4" fill="#0D161B" stroke="#2DD4C4" />
        <text x="590" y="101" fill="#2DD4C4" fontSize="11" textAnchor="middle" fontWeight="bold">
          Worker Pool
        </text>
        <text x="590" y="117" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          Safe Parallel Exec
        </text>
        <text x="590" y="131" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          Stale-Job Recovery
        </text>

        {/* Retry & Dead-letter Queue Path */}
        <path
          d="M 590 150 L 590 220 L 410 220 L 410 195"
          fill="none"
          stroke="#14857B"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          markerEnd="url(#arrow)"
        />
        <text x="500" y="214" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          Auto Retries &amp; DLQ
        </text>

        {/* Pulse signal indicator */}
        {!prefersReduced && (
          <circle cx="200" cy="110" r="3" fill="#2DD4C4">
            <animate
              attributeName="cx"
              values="130; 290; 480; 590"
              dur="4s"
              repeatCount="1"
            />
            <animate
              attributeName="opacity"
              values="0.8; 1; 0.8; 0"
              dur="4s"
              repeatCount="1"
            />
          </circle>
        )}
      </svg>
    </div>
  );
}
