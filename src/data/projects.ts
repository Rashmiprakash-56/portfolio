// src/data/projects.ts — spec §3.4 (verbatim bullets)
export const projects = [
  {
    id: "task-queue",
    title: "Asynchronous Task Queue Engine",
    stack: ["Node.js", "Express", "PostgreSQL", "Redis", "Docker"],
    bullets: [
      "Architected a horizontally-scalable, concurrent task queue in Node.js, PostgreSQL, and Redis with priority-based job queues and row-level locking for safe parallel job consumption across multiple workers.",
      "Engineered fault tolerance with a dead-letter queue, automated retries, a Redis-backed circuit breaker, and stale-job recovery; containerized all services with Docker Compose and exposed Prometheus-format metrics.",
    ],
    github: "https://github.com/Rashmiprakash-56/task-scheduler",
    live: null, // no live site: render NO "Live" button for this project
  },
  {
    id: "multi-agent-chat",
    title: "Multi-Agent Chat System",
    stack: ["React", "FastAPI", "MongoDB", "LangGraph"],
    bullets: [
      "Built a full-stack chat platform with a supervisor-agent architecture routing queries across 3 specialized sub-agents (RAG, NL-to-SQL, Web Search), real-time SSE token streaming, and a Pinecone vector search pipeline.",
      "Secured the system with JWT authentication and persistent multi-turn memory via PostgreSQL-backed checkpointers, with end-to-end distributed tracing across agent/tool calls using LangSmith.",
    ],
    github: "https://github.com/Rashmiprakash-56/Chat_Agent_Backend",
    live: "https://chat-agent-c7rd.onrender.com/",
  },
  {
    id: "demand-forecasting",
    title: "Time-Series Demand Forecasting Pipeline",
    stack: ["React", "FastAPI", "XGBoost", "GitHub Actions"],
    bullets: [
      "Built a full-stack app serving hourly electricity demand forecasts over a 35,000+ row dataset, with async background task processing and real-time job-status polling for a responsive UI during training.",
      "Automated model versioning/deployment to Hugging Face Hub via GitHub Actions CI/CD; exposed REST APIs for 24-hour forecasts with MAPE evaluation and SHAP explainability dashboards.",
    ],
    github:
      "https://github.com/Rashmiprakash-56/Electricity_Demand_Forecasting_Backend",
    live: "https://electricity-demand-forecasting-frontend.onrender.com/",
  },
] as const;
