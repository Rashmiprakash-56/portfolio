// src/data/profile.ts — spec §3.1
export const profile = {
  name: "Rashmiprakash Satapathy",
  shortName: "Rashmiprakash",
  role: "Software Engineer",
  email: "rpsatapathy04@gmail.com",
  links: {
    github: "https://github.com/Rashmiprakash-56",
    linkedin: "https://www.linkedin.com/in/rpsatapathy04/",
    leetcode: "https://leetcode.com/u/rpsatapathy04/",
    geeksforgeeks: "https://www.geeksforgeeks.org/user/rpsatapathy04/",
    resume: "/resume/Rashmiprakash_Satapathy.pdf",
  },
  availability: "Open to SDE roles",
} as const;

// Spec §3.2 — professional summary (verbatim from resume)
export const summary =
  "Software Engineer with experience in building full-stack and backend systems using React.js, Django, Node.js, Python, and SQL/NoSQL databases. Skilled in REST API design, distributed and concurrent systems, database optimization, and CI/CD, with a strong foundation in C++, Data Structures & Algorithms, and Object-Oriented Programming.";

// Spec §3.9 — hero metrics
export const heroMetrics = [
  { label: "power plants supported", value: "300+" },
  { label: "records optimized", value: "100K+" },
  { label: "records processed (ETL)", value: "10M+" },
  { label: "forecast error", value: "<3% MAPE" },
  { label: "leetcode rating", value: "1927" },
] as const;
