// src/data/skills.ts — spec §3.5 (grouped exactly as on the resume)
export const skills = {
  Languages: ["C++", "Python", "Java", "SQL", "JavaScript", "TypeScript"],
  "Core CS": [
    "Data Structures & Algorithms (DSA)",
    "Object-Oriented Programming (OOP)",
    "System Design",
    "DBMS",
  ],
  "Backend & Frontend": [
    "Django",
    "FastAPI",
    "Node.js",
    "Express.js",
    "REST APIs",
    "React.js",
    "Redux",
    "Tailwind CSS",
  ],
  "Databases & Infrastructure": [
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Redis",
    "Data Modeling",
    "Query Optimization",
    "Indexing",
    "AWS",
    "Docker",
    "CI/CD",
    "Git",
    "GitHub",
    "Agile",
  ],
  "AI/ML": [
    "XGBoost",
    "Scikit-learn",
    "LangGraph",
    "Vector Embeddings",
    "Semantic Search",
    "RAG",
    "LLM Integration",
  ],
} as const;

// Group keys in display order — backend-first, AI/ML last and visually quieter
export const skillGroupOrder = Object.keys(skills) as (keyof typeof skills)[];
