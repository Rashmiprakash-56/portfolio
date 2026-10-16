import { skills, skillGroupOrder } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="px-4 py-20 sm:px-6 lg:px-12 lg:py-28 border-t border-line">
      {/* Section Header */}
      <div className="flex items-center gap-3 font-mono text-xs text-muted mb-8">
        <span className="text-accent">&gt;</span>
        <h2 className="text-primary font-bold tracking-wide" tabIndex={-1}>
          skills.json
        </h2>
        <span className="text-line">/</span>
        <span className="text-muted text-[11px]">technical taxonomy</span>
      </div>

      {/* JSON-style panel */}
      <div className="w-full rounded-md border border-line bg-surface overflow-hidden font-mono text-xs">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5 bg-surface-2/40 text-muted">
          <span>skills.json</span>
          <span className="text-[10px] text-accent">json</span>
        </div>

        {/* Panel body with JSON formatting */}
        <div className="p-6 sm:p-8 space-y-4 overflow-x-auto select-text">
          <p className="text-muted">&#123;</p>

          <div className="pl-4 sm:pl-6 space-y-4">
            {skillGroupOrder.map((group, idx) => {
              const isLast = idx === skillGroupOrder.length - 1;
              const isAiMl = group === "AI/ML";

              return (
                <div
                  key={group}
                  className={`space-y-1.5 transition-opacity ${
                    isAiMl ? "opacity-75" : "opacity-100"
                  }`}
                >
                  <p>
                    <span className="text-accent font-semibold">&quot;{group}&quot;</span>
                    <span className="text-muted">: [</span>
                  </p>

                  <div className="pl-4 sm:pl-6 flex flex-wrap gap-x-2 gap-y-1">
                    {skills[group].map((skill, sIdx) => {
                      const isSkillLast = sIdx === skills[group].length - 1;
                      return (
                        <span key={skill} className="text-primary">
                          <span className={isAiMl ? "text-muted" : "text-primary"}>
                            &quot;{skill}&quot;
                          </span>
                          {!isSkillLast && <span className="text-muted">,</span>}
                        </span>
                      );
                    })}
                  </div>

                  <p className="text-muted">
                    <span>]</span>
                    {!isLast && <span>,</span>}
                    {isAiMl && (
                      <span className="ml-3 text-[10px] text-muted italic">
                        // supporting capability
                      </span>
                    )}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="text-muted">&#125;</p>
        </div>
      </div>
    </section>
  );
}
