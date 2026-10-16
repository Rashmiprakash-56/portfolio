// src/data/experience.ts — spec §3.3 (verbatim bullets)
export const experience = [
  {
    company: "Mercados Energy Markets India Limited",
    title: "Analyst (Software Development)",
    start: "July 2025",
    end: "Present",
    bullets: [
      "Developed and integrated full-stack billing features using React.js/Redux and Django REST APIs for a production bill verification platform serving UPPCL, supporting 300+ power plants.",
      "Engineered plant-specific bill calculation and data-processing logic in Django, handling divergent per-plant formats and calculation rules and integrating results.",
      "Optimized MongoDB query performance and backend business logic over a 100K+ record dataset using bulk write strategies, aggregation pipelines, and a modular service-layer architecture to ensure correctness at scale.",
      "Built a Python optimization script for resource adequacy planning, solving multi-constraint energy problems to support procurement cost analysis.",
    ],
    stack: [
      "React.js",
      "Redux",
      "Django",
      "Django REST Framework",
      "MongoDB",
      "Python",
    ],
  },
  {
    company: "Mercados Energy Markets India Limited",
    title: "Intern",
    start: "Dec 2024",
    end: "June 2025",
    bullets: [
      "Built a day-ahead electricity demand forecasting pipeline via a custom ETL pipeline processing 10M+ SCADA, weather, and market records, cutting preprocessing time by 50%; modeled with XGBoost, Random Forest, and stacking ensembles on engineered weather/temporal features, achieving under 3% MAPE, a 12% improvement over baseline.",
      "Delivered Power BI dashboards and automated Python analytics reports for demand monitoring, cutting manual reporting effort by 40%.",
    ],
    stack: ["Python", "XGBoost", "Random Forest", "ETL", "Power BI"],
  },
] as const;
