import { useEffect, useRef } from "react";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import peerPathOne from "../assets/images/peerpath/peerpath01.jpeg";
import peerPathTwo from "../assets/images/peerpath/peerpath02.jpeg";
import peerPathJourney from "../assets/images/peerpath/peerpath_journey.mp4";

gsap.registerPlugin(ScrollTrigger);

function PeerPath() {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      gsap.fromTo("[data-peerpath-copy]", { y: 32, opacity: 0.01 }, {
        y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
      });
      gsap.fromTo("[data-peerpath-image]", { y: 44, rotate: (index) => index ? 5 : -5 }, {
        y: 0, rotate: (index) => index ? 2 : -3, duration: 1, stagger: 0.14, ease: "power3.out",
        scrollTrigger: { trigger: mediaRef.current, start: "top 82%", once: true },
      });
      gsap.fromTo("[data-peerpath-video]", { clipPath: "inset(14% 8% 14% 8% round 18px)", scale: 0.94 }, {
        clipPath: "inset(0% 0% 0% 0% round 18px)", scale: 1, duration: 1.15, ease: "power3.out",
        scrollTrigger: { trigger: "[data-peerpath-video]", start: "top 86%", once: true },
      });
      gsap.to("[data-peerpath-parallax]", {
        yPercent: -7, ease: "none",
        scrollTrigger: { trigger: mediaRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.to("[data-peerpath-doodle]", { y: -10, rotation: 3, duration: 2.8, ease: "sine.inOut", yoyo: true, repeat: -1 });
    }, section);

    return () => ctx.revert();
  }, []);

  const handlePointerMove = (event) => {
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -7;
    const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 7;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  };

  const resetPointer = (event) => {
    event.currentTarget.style.transform = "";
  };

  return (
    <section
      id="peerpath"
      ref={sectionRef}
      className="peerpath-section relative overflow-hidden px-6 py-24 lg:px-10 lg:py-32"
    >
      <svg
        data-peerpath-doodle
        aria-hidden="true"
        className="peerpath-doodle pointer-events-none absolute right-[8%] top-12 hidden h-28 w-40 lg:block"
        viewBox="0 0 160 110"
        fill="none"
      >
        <path
          d="M10 74C39 15 92 21 133 44"
          stroke="#C6A15B"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="m126 33 12 11-16 5"
          stroke="#C6A15B"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="34" cy="28" r="4" stroke="#A8B5A2" strokeWidth="1.8" />
        <path
          d="M107 77v14m-7-7h14"
          stroke="#0F3D3E"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>

      <div className="mx-auto max-w-6xl">
        <div data-peerpath-copy className="max-w-3xl">
          <span className="section-kicker">A DREAM IN PROGRESS</span>
          <h2 className="mt-4 font-serif text-5xl font-medium leading-[.98] tracking-[-.04em] text-[#0F3D3E] md:text-7xl">
            PeerPath <span className="text-[#C6A15B]">—</span> A dream I&apos;m
            building.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#64748B]">
            PeerPath is my vision for a student-first growth ecosystem where
            students can learn, connect, share experiences and grow without
            feeling alone.
          </p>
          <p className="mt-5 max-w-xl border-l border-[#C6A15B] pl-5 font-serif text-xl italic leading-8 text-[#0F3D3E]">
            The idea was presented at the Bano Qabil Convocation.
          </p>
        </div>

        <div
          ref={mediaRef}
          className="peerpath-media mt-16 grid gap-8 lg:mt-20 lg:grid-cols-[.94fr_1.06fr] lg:gap-12"
        >
          <div className="peerpath-image-stage relative min-h-152 md:min-h-180">
            <figure
              data-peerpath-image
              data-peerpath-parallax
              onPointerMove={handlePointerMove}
              onPointerLeave={resetPointer}
              className="peerpath-image peerpath-image-one absolute left-0 top-0 z-10 w-[84%] overflow-hidden rounded-2xl border border-[#0F3D3E]/10 bg-[#F7F5EF] p-2.5 shadow-[16px_20px_35px_rgba(15,61,62,.14)] md:p-3"
            >
              <div className="peerpath-image-inner flex aspect-4/3 items-center justify-center overflow-hidden rounded-[.65rem] bg-[#E9EEE6]">
                <img
                  src={peerPathOne}
                  alt="PeerPath interface and student journey"
                  className="h-full w-full object-contain"
                />
              </div>
              <figcaption className="px-2 pb-1 pt-3 font-sans text-[.65rem] uppercase tracking-[.16em] text-[#607789]">
                01 / the starting point
              </figcaption>
            </figure>
            <figure
              data-peerpath-image
              data-peerpath-parallax
              onPointerMove={handlePointerMove}
              onPointerLeave={resetPointer}
              className="peerpath-image peerpath-image-two absolute bottom-0 right-0 z-20 w-[67%] overflow-hidden rounded-2xl border border-[#0F3D3E]/10 bg-[#F7F5EF] p-2.5 shadow-[16px_20px_35px_rgba(15,61,62,.16)] md:p-3"
            >
              <div className="peerpath-image-inner flex aspect-4/3 items-center justify-center overflow-hidden rounded-[.65rem] bg-[#E9EEE6]">
                <img
                  src={peerPathTwo}
                  alt="PeerPath community experience"
                  className="h-full w-full object-contain"
                />
              </div>
              <figcaption className="px-2 pb-1 pt-3 font-sans text-[.65rem] uppercase tracking-[.16em] text-[#607789]">
                02 / the path ahead
              </figcaption>
            </figure>
            <span className="absolute -bottom-5 left-2 z-30 font-serif text-sm italic leading-6 text-[#607789] md:-bottom-9 md:left-2">
              an idea with room to grow
            </span>
          </div>
          <figure
            data-peerpath-video
            className="peerpath-video self-end overflow-hidden rounded-2xl border border-[#0F3D3E]/10 bg-[#0F3D3E] p-2.5 shadow-[16px_20px_35px_rgba(15,61,62,.16)] md:p-3"
          >
            <div className="overflow-hidden rounded-[.65rem] bg-black">
              <video
                src={peerPathJourney}
                controls
                muted
                playsInline
                preload="metadata"
                className="block aspect-video w-full object-contain"
                aria-label="One-minute PeerPath journey video"
              />
            </div>
            <figcaption className="flex items-center justify-between gap-4 px-2 pb-1 pt-4 text-sm text-[#F7F5EF]">
              <span>PeerPath / the journey so far</span>
              <MoveUpRight size={16} className="text-[#C6A15B]" />
            </figcaption>
          </figure>
        </div>

        <a
          href="#contact"
          data-magnetic
          className="mt-12 inline-flex items-center gap-2 border border-[#0F3D3E] px-5 py-3 text-sm text-[#0F3D3E] transition hover:bg-[#0F3D3E] hover:text-white"
        >
          Talk about the idea <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}

export default PeerPath;
