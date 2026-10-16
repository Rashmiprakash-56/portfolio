import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ForecastDiagram() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="w-full my-6 rounded-md border border-line bg-surface p-4 overflow-x-auto">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-line text-xs font-mono text-muted">
        <span>architecture: demand-forecasting-pipeline</span>
        <span className="text-[10px] text-accent">CI/CD &amp; Hugging Face Hub Registry</span>
      </div>

      <svg
        viewBox="0 0 740 250"
        className="w-full min-w-[680px] h-auto font-mono text-xs select-none"
        aria-hidden="true"
      >
        <defs>
          <marker
            id="fc-arrow"
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

        {/* Pipeline Container */}
        <rect
          x="10"
          y="10"
          width="720"
          height="230"
          rx="6"
          fill="none"
          stroke="#1D2E37"
          strokeDasharray="4 4"
        />
        <text x="25" y="30" fill="#8CA2AB" fontSize="10">
          Inference &amp; Continuous Deployment Pipeline
        </text>

        {/* React Client */}
        <rect x="25" y="70" width="115" height="65" rx="4" fill="#122028" stroke="#1D2E37" />
        <text x="82" y="95" fill="#D8E4E8" fontSize="11" textAnchor="middle" fontWeight="bold">
          React Client
        </text>
        <text x="82" y="112" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          Job-Status Polling
        </text>
        <text x="82" y="125" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          SHAP Dashboards
        </text>

        {/* Arrow to FastAPI */}
        <line x1="140" y1="102" x2="185" y2="102" stroke="#14857B" strokeWidth="1.5" markerEnd="url(#fc-arrow)" />

        {/* FastAPI & Async Task */}
        <rect x="190" y="65" width="125" height="75" rx="4" fill="#0D161B" stroke="#2DD4C4" />
        <text x="252" y="92" fill="#2DD4C4" fontSize="11" textAnchor="middle" fontWeight="bold">
          FastAPI
        </text>
        <text x="252" y="108" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          24h REST Forecast API
        </text>
        <text x="252" y="122" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          Async Background Task
        </text>

        {/* Arrow to Model Engine */}
        <line x1="315" y1="102" x2="360" y2="102" stroke="#14857B" strokeWidth="1.5" markerEnd="url(#fc-arrow)" />

        {/* XGBoost Model Inference */}
        <rect x="365" y="60" width="145" height="85" rx="4" fill="#122028" stroke="#2DD4C4" />
        <text x="437" y="87" fill="#2DD4C4" fontSize="11" textAnchor="middle" fontWeight="bold">
          XGBoost Model
        </text>
        <text x="437" y="103" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          35K+ Records Dataset
        </text>
        <text x="437" y="117" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          &lt;3% MAPE Evaluation
        </text>
        <text x="437" y="131" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          SHAP Explainability
        </text>

        {/* CI/CD & Hugging Face Hub Box */}
        <rect x="545" y="60" width="170" height="85" rx="4" fill="#0D161B" stroke="#1D2E37" />
        <text x="630" y="87" fill="#D8E4E8" fontSize="11" textAnchor="middle" fontWeight="bold">
          Hugging Face Hub
        </text>
        <text x="630" y="103" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          Versioned Model Registry
        </text>
        <text x="630" y="117" fill="#2DD4C4" fontSize="9" textAnchor="middle">
          GitHub Actions CI/CD
        </text>
        <text x="630" y="131" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          Automated Deploy
        </text>

        {/* Arrow Model <-> HF */}
        <line x1="510" y1="102" x2="540" y2="102" stroke="#14857B" strokeWidth="1.5" markerEnd="url(#fc-arrow)" />

        {/* Bottom dataset note */}
        <text x="365" y="195" fill="#8CA2AB" fontSize="9" textAnchor="middle">
          SCADA &amp; Weather Temporal ETL Pipeline Integration
        </text>

        {/* Pulse */}
        {!prefersReduced && (
          <circle cx="140" cy="102" r="3" fill="#2DD4C4">
            <animate attributeName="cx" values="140; 252; 437; 630" dur="4s" repeatCount="1" />
            <animate attributeName="opacity" values="0.8; 1; 0.8; 0" dur="4s" repeatCount="1" />
          </circle>
        )}
      </svg>
    </div>
  );
}
