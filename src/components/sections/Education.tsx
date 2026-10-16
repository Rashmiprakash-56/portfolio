import { education } from "@/data/education";

export function Education() {
  return (
    <section id="education" className="px-4 py-20 sm:px-6 lg:px-12 lg:py-28 border-t border-line">
      {/* Section Header */}
      <div className="flex items-center gap-3 font-mono text-xs text-muted mb-8">
        <span className="text-accent">&gt;</span>
        <h2 className="text-primary font-bold tracking-wide" tabIndex={-1}>
          education.md
        </h2>
        <span className="text-line">/</span>
        <span className="text-muted text-[11px]">academics</span>
      </div>

      <div className="w-full rounded-md border border-line bg-surface p-6 sm:p-8 font-mono space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <h3 className="text-base sm:text-lg font-bold text-primary">
            {education.institution}
          </h3>
          <span className="text-xs text-muted">
            {education.start} — {education.end}
          </span>
        </div>

        <div className="space-y-1 text-xs sm:text-sm text-muted">
          <p className="text-primary font-medium">
            {education.degree} in {education.field}
          </p>
          <p>
            Cumulative GPA: <span className="text-accent font-bold">{education.cgpa}</span> / 10.0
          </p>
          <p className="text-[11px] text-muted">{education.location}</p>
        </div>
      </div>
    </section>
  );
}
