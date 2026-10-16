import type { SectionId } from "@/hooks/useScrollSpy";

/** File-tree style nav items for the explorer rail — spec §5.5 */
export interface NavItem {
  id: SectionId;
  label: string;
  kind: "file" | "folder";
}

export const navItems: NavItem[] = [
  { id: "about", label: "about.md", kind: "file" },
  { id: "experience", label: "experience.log", kind: "file" },
  { id: "projects", label: "projects/", kind: "folder" },
  { id: "skills", label: "skills.json", kind: "file" },
  { id: "education", label: "education.md", kind: "file" },
  { id: "contact", label: "contact.sh", kind: "file" },
];

/** Friendly label for each section shown in the status bar */
export const sectionLabels: Record<SectionId, string> = {
  top: "hero",
  about: "about.md",
  experience: "experience.log",
  projects: "projects/",
  skills: "skills.json",
  education: "education.md",
  contact: "contact.sh",
};
