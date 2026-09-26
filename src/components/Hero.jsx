import { useEffect, useRef } from "react";
import { Download, Sparkles } from "lucide-react";
import gsap from "gsap";
import { EditorialDoodles } from "./Doodles";
import profileImage from "../assets/images/profile/profile.jpeg";
import resumeFile from "../assets/images/resume/Zobia-Masood-Resume.pdf";

const greeting = "Assalamualaikum, I'm";

function Hero() {
  const heroRef = useRef(null);
  const portraitRef = useRef(null);
  const shapeRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compactViewport = window.matchMedia("(max-width: 767px)").matches;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .from("[data-greeting-letter]", { y: 20, opacity: 0, duration: 0.45, stagger: 0.03 })
        .from("[data-name-word]", { y: 68, opacity: 0, rotateX: -26, duration: 0.8, stagger: 0.12, filter: "blur(2px)" }, "-=.22")
        .from("[data-hero-tagline]", { y: 22, opacity: 0, duration: 0.6 }, "-=.36")
        .from("[data-hero-label]", { y: 14, opacity: 0, duration: 0.5 }, "-=.28")
        .from("[data-hero-description]", { y: 16, opacity: 0, duration: 0.62 }, "-=.24")
        .from("[data-hero-cta]", { y: 16, opacity: 0, duration: 0.6 }, "-=.25")
        .from(portraitRef.current, { scale: 0.94, y: 18, rotate: 1.2, duration: 1.1, ease: "power3.out" }, "-=.68")
        .from("[data-hero-detail]", { scale: 0.85, opacity: 0, y: 16, duration: 0.75, stagger: 0.12 }, "-=.5");

      if (reducedMotion) return;

      gsap.set([hero, portraitRef.current, shapeRef.current], {
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      });

      gsap.to(hero, {
        yPercent: -2,
        scale: 1.01,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.to(portraitRef.current, { y: -8, duration: 3.4, ease: "sine.inOut", repeat: -1, yoyo: true });

      gsap.to("[data-hero-detail]", {
        yPercent: -8,
        xPercent: 3,
        rotation: 1.5,
        ease: "none",
        stagger: 0.18,
        scrollTrigger: { trigger: hero, start: "top bottom", end: "bottom top", scrub: true },
      });

      if (compactViewport) return;

      const moveWithPointer = (event) => {
        const bounds = hero.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;

        gsap.to(portraitRef.current, {
          x: x * 8,
          y: y * 5 - 7,
          rotateY: x * 1.5,
          rotateX: y * -1.3,
          z: 10,
          duration: 0.9,
          ease: "power3.out",
        });

        gsap.to(shapeRef.current, {
          x: x * 14,
          y: y * 12 + 8,
          rotate: x * 1.2,
          duration: 1,
          ease: "power3.out",
        });
      };
      hero.addEventListener("mousemove", moveWithPointer);
      return () => hero.removeEventListener("mousemove", moveWithPointer);
    }, hero);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="home" className="relative flex min-h-screen items-center overflow-hidden bg-[#F7F4EC] px-6 pb-16 pt-32 lg:px-10 lg:pb-24 lg:pt-36">
      <EditorialDoodles className="-right-16 top-32 hidden h-48 w-72 opacity-70 lg:block" />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-8">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-7 font-['Caveat'] text-3xl font-medium text-[#C9A86A] sm:text-4xl" aria-label={greeting}>
            {greeting.split("").map((character, index) => <span data-greeting-letter key={`${character}-${index}`}>{character === " " ? "\u00A0" : character}</span>)}
          </p>
          <h1 className="font-['Playfair_Display'] text-7xl font-medium leading-[.88] tracking-[-.055em] text-[#0B4544] sm:text-8xl lg:text-[clamp(6rem,11vw,10rem)]">
            <span className="block overflow-hidden"><span className="inline-block" data-name-word>Zobia</span></span>
            <span className="block overflow-hidden"><span className="inline-block" data-name-word>Masood<span className="text-[#C9A86A]">.</span></span></span>
          </h1>
          <p data-hero-tagline className="mt-9 font-['Playfair_Display'] text-2xl italic text-[#0B4544] sm:text-3xl">I build. I create. I explore.</p>
          <p data-hero-label className="mt-7 font-sans text-xs font-semibold uppercase tracking-[.25em] text-[#607789]">Frontend &amp; MERN Stack Developer</p>
          <p data-hero-description className="mt-5 max-w-lg font-sans text-base leading-8 text-[#607789] sm:text-lg">I love turning ideas into real and meaningful digital experiences while exploring creativity beyond the screen.</p>
          <div data-hero-cta className="mt-9 flex items-center gap-5">
            <a data-magnetic href={resumeFile} download="Zobia-Masood-Resume.pdf" className="group inline-flex items-center gap-3 border border-[#C9A86A] bg-[#0B4544] px-6 py-3.5 font-sans text-sm text-white transition duration-300 hover:-translate-y-1 hover:bg-[#C9A86A] hover:text-[#0B4544]"><Download size={17} className="transition-transform group-hover:-translate-y-0.5" /> Download Resume</a>
            <a href="#projects" className="font-sans text-sm text-[#0B4544] underline decoration-[#C9A86A] underline-offset-8 transition hover:text-[#C9A86A]">View My Work</a>
          </div>
        </div>

        <div className="relative flex min-h-130 items-center justify-center lg:min-h-170">
          <div ref={shapeRef} className="absolute h-[min(78vw,35rem)] w-[min(78vw,35rem)] rounded-[46%_54%_57%_43%/42%_46%_54%_58%] border border-[#C9A86A]/60 bg-[#AEBBA9]/25" data-hero-detail />
          <div className="absolute h-[min(65vw,28rem)] w-[min(65vw,28rem)] rounded-full border border-[#AEBBA9]/70" data-hero-detail />
          <div ref={portraitRef} className="relative z-10 h-108 w-[20rem] overflow-hidden rounded-[48%_48%_8%_8%] border-10 border-[#F7F4EC] shadow-[0_25px_70px_rgba(11,69,68,.16)] sm:h-140 sm:w-100" data-hero-profile>
            <img src={profileImage} alt="Zobia Masood" className="h-full w-full object-cover" />
          </div>
          <div className="absolute bottom-8 left-2 z-20 flex items-center gap-2 bg-[#F7F4EC] px-4 py-3 font-sans text-xs text-[#0B4544] shadow-[0_12px_30px_rgba(11,69,68,.1)] sm:left-8"><Sparkles size={15} className="text-[#C9A86A]" /> Creative developer</div>
          <span className="absolute right-2 top-14 font-['Caveat'] text-2xl text-[#C9A86A] sm:right-10" data-hero-detail>made with curiosity</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
