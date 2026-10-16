// src/data/achievements.ts — spec §3.7 + §3.8

export const codingProfiles = [
  {
    platform: "LeetCode",
    stat: "500+ questions solved",
    detail: "contest rating 1927 (Knight)",
    url: "https://leetcode.com/u/rpsatapathy04/",
  },
  {
    platform: "GeeksforGeeks",
    stat: "400+ questions solved",
    detail: null,
    url: "https://www.geeksforgeeks.org/user/rpsatapathy04/",
  },
] as const;

export const achievements = [
  "Achieved 97.53 percentile in JEE Main 2021 and 94.4% in CBSE Class XII Board Examinations.",
  "Secured 1st Rank in Electrical Engineering at Vigyaan, a National Level Science Exhibition organized by NIT Raipur.",
] as const;
