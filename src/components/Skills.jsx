import { useEffect, useRef } from "react";
import { ArrowUpRight, Braces, KeyRound, LayoutTemplate } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EditorialDoodles } from "./Doodles";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    number: "01",
    title: "Frontend Development",
    intro: "Interfaces with clarity, rhythm and room to breathe.",
    skills: [
      { name: "HTML5", logo: "html5", color: "E34F26" },
      { name: "CSS3", logo: "css", color: "1572B6" },
      { name: "JavaScript (ES6+)", logo: "javascript", color: "F7DF1E" },
      { name: "React.js", logo: "react", color: "61DAFB" },
      { name: "Tailwind CSS", logo: "tailwindcss", color: "06B6D4" },
      { name: "Bootstrap", logo: "bootstrap", color: "7952B3" },
      { name: "Responsive Design", icon: LayoutTemplate },
    ],
  },
  {
    number: "02",
    title: "Backend & Database",
    intro: "Reliable systems that keep useful ideas moving.",
    skills: [
      { name: "Node.js", logo: "nodedotjs", color: "5FA04E" },
      { name: "Express.js", logo: "express", color: "F7F5EF" },
      { name: "MongoDB", logo: "mongodb", color: "47A248" },
      { name: "MySQL", logo: "mysql", color: "4479A1" },
      { name: "REST APIs", icon: Braces },
      { name: "JWT Authentication", icon: KeyRound },
    ],
  },
  {
    number: "03",
    title: "Programming & Tools",
    intro: "The practical tools behind thoughtful builds.",
    skills: [
      { name: "C++", logo: "cplusplus", color: "00599C" },
      { name: "Git & GitHub", logos: ["git", "github"], color: "F7F5EF" },
      { name: "Postman", logo: "postman", color: "FF6C37" },
      { name: "Vite", logo: "vite", color: "646CFF" },
      { name: "Vercel", logo: "vercel", color: "F7F5EF" },
    ],
  },
];

function SkillLine({ skill, index }) {
  const lineRef = useRef(null);

  const handleMouseMove = (event) => {
    const line = lineRef.current;
    if (!line || window.matchMedia("(pointer: coarse)").matches) return;
    const bounds = line.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    line.style.transform = `perspective(700px) rotateX(${y * -1.5}deg) rotateY(${x * 1.5}deg) translateX(${x * 3}px)`;
  };

  const resetLine = () => {
    if (lineRef.current) lineRef.current.style.transform = "";
  };

  return (
    <li
      ref={lineRef}
      data-skill-line
      onMouseMove={handleMouseMove}
      onMouseLeave={resetLine}
      className="group flex min-w-0 items-center gap-4 border-b border-[#A8B5A2]/20 py-4.5 transition-[transform,color,border-color] duration-400 ease-out hover:border-[#C6A15B]/70 hover:text-[#C6A15B] sm:gap-5"
    >
      <span className="w-5 shrink-0 font-mono text-[.65rem] tracking-[.12em] text-[#A8B5A2]/65 transition-colors duration-300 group-hover:text-[#C6A15B]">{String(index + 1).padStart(2, "0")}</span>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center gap-1.5 text-[#F7F5EF] transition-transform duration-300 group-hover:scale-[1.06]">
        {skill.logos ? skill.logos.map((logo) => <img key={logo} src={`https://cdn.simpleicons.org/${logo}/${skill.color}`} alt="" className="h-5 w-5 object-contain first:-mr-1" loading="lazy" />) : skill.logo ? <img src={`https://cdn.simpleicons.org/${skill.logo}/${skill.color}`} alt="" className="h-7 w-7 object-contain" loading="lazy" /> : <skill.icon size={22} strokeWidth={1.4} className="text-[#A8B5A2]" />}
      </span>
      <span className="relative min-w-0 font-sans text-[.95rem] leading-6 text-[#F7F5EF] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#C6A15B] sm:text-base">{skill.name}<span className="absolute -bottom-1 left-0 h-px w-0 bg-[#C6A15B] transition-all duration-300 group-hover:w-full" /></span>
      <ArrowUpRight size={14} className="ml-auto shrink-0 -translate-x-1 text-[#C6A15B] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
    </li>
  );
}

function SkillCategory({ category, index }) {
  return (
    <article data-skill-category data-skill-index={index} className="group relative border-t border-[#A8B5A2]/40 py-9 transition-colors duration-500 hover:border-[#C6A15B]/80 lg:py-12">
      <span data-skill-divider aria-hidden="true" className="absolute left-0 -top-px h-px w-0 bg-[#C6A15B] transition-all duration-700 group-hover:w-full" />
      <div className="grid gap-10 lg:grid-cols-[minmax(16rem,.72fr)_minmax(0,1.28fr)] lg:gap-24">
        <div className="flex items-start gap-5">
          <span data-skill-category-number className="font-serif text-5xl leading-none text-[#C6A15B]/85 transition-transform duration-500 group-hover:-translate-y-1 sm:text-6xl">{category.number}</span>
          <div className="pt-1">
            <h3 data-skill-category-title className="max-w-xs font-serif text-2xl uppercase leading-[1.05] tracking-[.02em] text-[#F7F5EF] transition-colors duration-300 group-hover:text-[#C6A15B] sm:text-3xl">{category.title}</h3>
            <p className="mt-4 max-w-xs text-sm leading-6 text-[#A8B5A2]">{category.intro}</p>
          </div>
        </div>
        <ul className="grid content-start gap-x-10 sm:grid-cols-2">
          {category.skills.map((skill, skillIndex) => <SkillLine key={skill.name} skill={skill} index={skillIndex} />)}
        </ul>
      </div>
    </article>
  );
}

function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      gsap.set("[data-skills-kicker], [data-skills-title], [data-skills-description], [data-skill-category], [data-skill-line], [data-skill-divider]", {
        opacity: 1,
        visibility: "visible",
      });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
      });

      timeline
        .fromTo("[data-skills-kicker]", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 })
        .fromTo("[data-skills-title]", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.3")
        .fromTo("[data-skills-description]", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, "-=0.35");

      gsap.utils.toArray("[data-skill-category]").forEach((category) => {
        const lines = category.querySelectorAll("[data-skill-line]");
        timeline
          .fromTo(category, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 })
          .fromTo(category.querySelector("[data-skill-divider]"), { width: "0%" }, { width: "100%", duration: 0.6 }, "-=0.4")
          .fromTo(lines, { x: 10, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, stagger: 0.045 }, "-=0.3");
      });

      gsap.to("[data-skills-doodle]", {
        y: -10, rotation: 3, ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" data-skills-section className="relative overflow-hidden bg-[#0F3D3E] px-6 py-24 text-[#F7F5EF] lg:px-10 lg:py-32">
      <div data-skills-top-atmosphere aria-hidden="true" className="pointer-events-none absolute -top-8 left-0 h-24 w-full border-t border-[#C6A15B]/20 bg-[#A8B5A2]/6" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-full border-b border-[#A8B5A2]/20 bg-[#A8B5A2]/4" />
      <div data-skills-doodle className="pointer-events-none absolute -right-10 top-20 hidden h-32 w-48 opacity-45 lg:block">
        <EditorialDoodles className="h-full w-full opacity-65" />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <header className="grid gap-8 border-b border-[#AEBBA9]/30 pb-12 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
          <div>
            <div data-skills-kicker className="flex items-center gap-5 font-sans text-xs uppercase tracking-[.25em] text-[#C6A15B]"><span>MY STACK</span><span className="h-px w-14 bg-[#C6A15B]/70" /><span>02</span></div>
            <div className="mt-5">
              <h2 data-skills-title className="max-w-2xl font-serif text-5xl leading-[.92] tracking-[-.04em] text-[#F7F5EF] sm:text-6xl lg:text-7xl">Skills <span className="text-[#C6A15B]">&amp;</span><br />Expertise<span className="text-[#C6A15B]">.</span></h2>
            </div>
          </div>
          <p data-skills-description className="max-w-md text-base leading-8 text-[#D4E0DC] lg:justify-self-end">Technologies and tools I use to build thoughtful, responsive and meaningful digital experiences.</p>
        </header>

        <div className="mt-4">
          {skillCategories.map((category, index) => <SkillCategory key={category.title} category={category} index={index} />)}
        </div>
      </div>
    </section>
  );
}

export default Skills;
