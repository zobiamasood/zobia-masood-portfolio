import { useState } from "react";
import projects from "../Data/Projects";
import { ArrowUpRight, ExternalLink } from "lucide-react";

function Projects() {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section
      id="projects"
      className="bg-[#F4F1E8] px-6 py-24 text-[#0F3D3E] lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">

        {/* ================= HEADER ================= */}
        <div
          className="mb-14 max-w-3xl"
          data-project-heading
        >
          <div
            className="mb-6 h-px w-full bg-linear-to-r from-[#C6A15B] via-[#C6A15B]/30 to-transparent"
            aria-hidden="true"
          />

          <div className="flex items-center gap-3">
            <span
              data-project-kicker
              className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#C6A15B]"
            >
              03 / MY PORTFOLIO
            </span>

            <span className="h-px w-10 bg-[#C6A15B]/50" />
          </div>

          <h2
            data-project-title
            className="mt-4 text-5xl font-medium leading-[0.94] tracking-tighter text-[#0F3D3E] md:text-7xl"
          >
            Things I&apos;ve built
            <span className="text-[#C6A15B]">.</span>
          </h2>

          <p
            data-project-description
            className="mt-6 max-w-xl font-sans text-[15px] leading-7 text-[#607789]"
          >
            Selected work where thoughtful interfaces meet useful technology.
          </p>
        </div>

        {/* ================= PROJECT GRID ================= */}
        <div className="grid gap-7 md:grid-cols-2">
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              data-card
              data-project-card
              className={`
                group relative flex h-full flex-col overflow-hidden rounded-[18px]
                border transition-all duration-700
                hover:-translate-y-1.5
                ${
                  project.featured
                    ? `
                      border-[#0F3D3E]
                      bg-[#0F3D3E]
                      text-[#F7F5EF]
                      shadow-[0_24px_60px_rgba(15,61,62,0.18)]
                      md:col-span-2 md:grid md:grid-cols-[1.2fr_0.8fr]
                    `
                    : `
                      border-[#0F3D3E]/10
                      bg-[#FBFAF6]
                      text-[#0F3D3E]
                      shadow-[0_10px_35px_rgba(15,61,62,0.045)]
                      hover:border-[#C6A15B]/40
                      hover:shadow-[0_20px_45px_rgba(15,61,62,0.08)]
                    `
                }
              `}
            >

              {/* ================= IMAGE SIDE ================= */}
              <div className="min-w-0">
                <div
                  data-project-image
                  className={`
                    relative min-h-75 overflow-hidden
                    border-b
                    ${
                      project.featured
                        ? "border-[#F7F5EF]/10 bg-[#123F40] md:min-h-117.5 md:border-b-0"
                        : "border-[#0F3D3E]/10 bg-[#EBE9E0]"
                    }
                  `}
                >

                  {/* subtle background detail */}
                  <div
                    className={`
                      pointer-events-none absolute inset-0
                      ${
                        project.featured
                          ? "bg-[radial-gradient(circle_at_80%_15%,rgba(198,161,91,0.12),transparent_30%)]"
                          : "bg-[radial-gradient(circle_at_85%_10%,rgba(198,161,91,0.10),transparent_28%)]"
                      }
                    `}
                  />

                  {/* IMAGE META */}
                  <div
                    className={`
                      absolute left-0 right-0 top-0 z-10
                      flex items-center justify-between gap-4
                      px-5 py-5
                      font-sans text-[9px] uppercase tracking-[0.17em]
                      ${
                        project.featured
                          ? "text-[#C6A15B]"
                          : "text-[#607789]"
                      }
                    `}
                  >
                    <span>
                      0{project.id}
                    </span>

                    <span>{project.category}</span>
                  </div>

                  {/* IMAGE FRAME */}
                  <div
                    className="
                      absolute inset-x-5 bottom-5 top-13
                      flex items-center justify-center
                      overflow-hidden
                      md:inset-x-6 md:bottom-6
                    "
                  >
                    <div
                      className={`
                        relative flex h-full w-full items-center justify-center
                        overflow-hidden rounded-xl border p-4
                        transition-all duration-700
                        group-hover:-translate-y-1
                        group-hover:scale-[1.01]
                        ${
                          project.featured
                            ? `
                              border-[#F7F5EF]/15
                              bg-[#E9EEE9]
                              shadow-[0_25px_55px_rgba(0,0,0,0.22)]
                            `
                            : `
                              border-[#0F3D3E]/10
                              bg-[#F7F5EF]
                              shadow-[0_18px_40px_rgba(15,61,62,0.10)]
                            `
                        }
                      `}
                    >
                      {project.image && (
                        <img
                          data-project-screenshot
                          src={project.image}
                          alt={`${project.title} project screenshot`}
                          loading="lazy"
                          className="
                            block h-full w-full
                            max-h-full max-w-full
                            rounded-md object-contain object-center
                            transition-transform duration-1000
                            ease-[cubic-bezier(0.22,1,0.36,1)]
                            group-hover:scale-[1.025]
                          "
                        />
                      )}
                    </div>
                  </div>

                  {/* corner arrow */}
                  <div
                    className={`
                      absolute bottom-4 right-4 z-10
                      flex h-8 w-8 items-center justify-center
                      rounded-full border backdrop-blur-sm
                      transition-all duration-500
                      group-hover:-translate-y-1 group-hover:translate-x-1
                      ${
                        project.featured
                          ? "border-[#C6A15B]/40 bg-[#0F3D3E]/70 text-[#C6A15B]"
                          : "border-[#0F3D3E]/10 bg-[#F7F5EF]/85 text-[#0F3D3E]"
                      }
                    `}
                  >
                    <ArrowUpRight size={15} strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* ================= CONTENT ================= */}
              <div className="min-w-0 flex-1">
                <div
                  className={`
                    flex h-full flex-col justify-between gap-7 p-6 lg:p-8
                    ${project.featured ? "md:p-10" : ""}
                  `}
                >

                  {/* top metadata */}
                  <div
                    className={`
                      flex items-center justify-end
                      border-b pb-4
                      ${
                        project.featured
                          ? "border-[#F7F5EF]/10"
                          : "border-[#0F3D3E]/10"
                      }
                    `}
                  >
                    <span
                      className={`
                        font-sans text-[11px] uppercase tracking-[0.2em]
                        ${
                          project.featured
                            ? "text-[#F7F5EF]/40"
                            : "text-[#607789]"
                        }
                      `}
                    >
                      0{project.id}
                    </span>
                  </div>

                  {/* title + description */}
                  <div className="space-y-4">
                    <h3
                      data-project-card-title
                      className={`
                        text-3xl font-medium leading-tight tracking-[-0.045em]
                        md:text-[2.2rem]
                        ${
                          project.featured
                            ? "text-[#F7F5EF]"
                            : "text-[#0F3D3E]"
                        }
                      `}
                    >
                      {project.title}
                    </h3>

                    <p
                      className={`
                        max-w-xl font-sans text-sm leading-7
                        ${
                          project.featured
                            ? "text-[#E5EEEA]"
                            : "text-[#607789]"
                        }
                      `}
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* tech */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((technology) => (
                      <span
                        key={technology}
                        className={`
                          inline-flex min-h-6.75 items-center
                          rounded-full border px-2.5 py-1
                          font-sans text-[11px] tracking-[0.03em]
                          transition-all duration-300
                          ${
                            project.featured
                              ? `
                                border-[#F7F5EF]/10
                                bg-[#164547]
                                text-[#E9F0EC]
                                group-hover:border-[#C6A15B]/30
                              `
                              : `
                                border-[#0F3D3E]/10
                                bg-[#F3F1EA]
                                text-[#0F3D3E]
                                group-hover:border-[#C6A15B]/30
                              `
                          }
                        `}
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  {/* links */}
                  <div
                    className={`
                      mt-auto flex flex-wrap items-center gap-6
                      border-t pt-5
                      font-sans text-[11px] uppercase tracking-[0.16em]
                      ${
                        project.featured
                          ? "border-[#F7F5EF]/10 text-[#C6A15B]"
                          : "border-[#0F3D3E]/10 text-[#C6A15B]"
                      }
                    `}
                  >
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} live demo`}
                      className={`
                        group/link relative inline-flex items-center gap-1.5
                        transition-colors duration-300
                        ${
                          project.featured
                            ? "hover:text-[#F7F5EF]"
                            : "hover:text-[#0F3D3E]"
                        }
                      `}
                    >
                      Live Demo

                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                      />

                      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#C6A15B] transition-transform duration-300 group-hover/link:scale-x-100" />
                    </a>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} GitHub`}
                      className={`
                        group/link relative inline-flex items-center gap-1.5
                        transition-colors duration-300
                        ${
                          project.featured
                            ? "hover:text-[#F7F5EF]"
                            : "hover:text-[#0F3D3E]"
                        }
                      `}
                    >
                      <ExternalLink size={14} />
                      GitHub

                      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#C6A15B] transition-transform duration-300 group-hover/link:scale-x-100" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ================= VIEW ALL ================= */}
        {projects.length > 3 && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              className="
                group inline-flex items-center gap-2
                border-b border-[#C6A15B]
                pb-2
                font-sans text-sm text-[#0F3D3E]
                transition-colors duration-300
                hover:text-[#C6A15B]
              "
            >
              {showAll ? "Show projects" : "View all projects"}

              <ArrowUpRight
                size={16}
                className="
                  transition-transform duration-300
                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                "
              />
            </button>
          </div>
        )}
        {/* ================= GITHUB ================= */}
<div className="mt-6 flex justify-center">
  <a
    href="https://github.com/zobiamasood"
    target="_blank"
    rel="noreferrer"
    className="
      group inline-flex items-center gap-1.5
      font-sans text-[12px] uppercase tracking-[0.14em]
      text-[#607789]
      transition-colors duration-300
      hover:text-[#0F3D3E]
    "
  >
    See all projects on my GitHub

    <ArrowUpRight
      size={14}
      className="
        transition-transform duration-300
        group-hover:-translate-y-0.5
        group-hover:translate-x-0.5
      "
    />
  </a>
</div>
      </div>
    </section>
  );
}

export default Projects;