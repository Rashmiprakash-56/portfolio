import { projects } from "@/data/projects";
import { TaskQueueDiagram } from "@/components/diagrams/TaskQueueDiagram";
import { ChatDiagram } from "@/components/diagrams/ChatDiagram";
import { ForecastDiagram } from "@/components/diagrams/ForecastDiagram";
import { trackEvent } from "@/lib/analytics";

export function Projects() {
  const renderDiagram = (id: string) => {
    switch (id) {
      case "task-queue":
        return <TaskQueueDiagram />;
      case "multi-agent-chat":
        return <ChatDiagram />;
      case "demand-forecasting":
        return <ForecastDiagram />;
      default:
        return null;
    }
  };

  const readmePaths: Record<string, string> = {
    "task-queue": "task-scheduler/README.md",
    "multi-agent-chat": "multi-agent-chat/README.md",
    "demand-forecasting": "electricity-demand-forecasting/README.md",
  };

  return (
    <section id="projects" className="px-4 py-20 sm:px-6 lg:px-12 lg:py-28 border-t border-line">
      {/* Section Header */}
      <div className="flex items-center gap-3 font-mono text-xs text-muted mb-8">
        <span className="text-accent">&gt;</span>
        <h2 className="text-primary font-bold tracking-wide" tabIndex={-1}>
          projects/
        </h2>
        <span className="text-line">/</span>
        <span className="text-muted text-[11px]">architecture &amp; case studies</span>
      </div>

      <div className="space-y-16">
        {projects.map((project) => (
          <article
            key={project.id}
            id={`project-${project.id}`}
            className="w-full rounded-md border border-line bg-surface overflow-hidden"
          >
            {/* README Title Bar — path only, NO macOS dots (§6) */}
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5 bg-surface-2/40 font-mono text-xs text-muted">
              <span>{readmePaths[project.id]}</span>
              <span className="text-[10px] text-accent">markdown</span>
            </div>

            {/* Panel Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Project Title */}
              <div>
                <h3 className="font-mono text-xl sm:text-2xl font-bold text-primary">
                  {project.title}
                </h3>
              </div>

              {/* Architecture SVG Diagram */}
              <div>{renderDiagram(project.id)}</div>

              {/* Verbatim Bullets */}
              <div className="space-y-3">
                <p className="font-mono text-xs text-primary font-bold uppercase tracking-wider">
                  Key Engineering Contributions
                </p>
                <ul className="space-y-2.5 font-sans text-sm sm:text-base text-muted leading-relaxed prose-width">
                  {project.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-accent shrink-0 mt-1 font-mono text-xs">›</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack as plain mono text separated by commas (§7.4) */}
              <div className="pt-2 border-t border-line">
                <p className="font-mono text-xs text-muted">
                  <span className="text-primary font-medium">Stack: </span>
                  {project.stack.join(", ")}
                </p>
              </div>

              {/* Links: GitHub always, Live only if live is non-null */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("project_link_click", {
                      project: project.id,
                      type: "github",
                    })
                  }
                  className="inline-flex items-center gap-1.5 rounded-[2px] border border-line bg-surface-2 px-3 py-1.5 font-mono text-xs text-primary hover:border-accent hover:text-accent transition-colors"
                >
                  <span>view source</span>
                  <span className="text-[10px] text-muted">↗</span>
                </a>

                {project.live && (
                  <div className="inline-flex items-center gap-2">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("project_link_click", {
                          project: project.id,
                          type: "live",
                        })
                      }
                      className="inline-flex items-center gap-1.5 rounded-[2px] bg-accent/10 border border-accent/40 px-3 py-1.5 font-mono text-xs text-accent hover:bg-accent/20 transition-colors"
                    >
                      <span>live demo</span>
                      <span className="text-[10px]">↗</span>
                    </a>
                    <span className="font-mono text-[11px] text-muted">
                      (may take ~30s to wake)
                    </span>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
