import { useEffect, useRef } from "react";
import gsap from "gsap";

export function EditorialDoodles({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const scope = ref.current;
    if (!scope) return undefined;
    const ctx = gsap.context(() => {
      gsap.to("[data-doodle-float]", { y: -8, rotation: 4, duration: 2.8, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.3 });
      gsap.to("[data-doodle-draw]", { strokeDasharray: 260, strokeDashoffset: 0, duration: 1.4, ease: "power2.out", scrollTrigger: { trigger: scope, start: "top 85%" } });
    }, scope);
    return () => ctx.revert();
  }, []);

  return <svg ref={ref} aria-hidden="true" className={`pointer-events-none absolute overflow-visible ${className}`} viewBox="0 0 240 150" fill="none">
    <path data-doodle-draw d="M12 82C54 29 125 24 190 55" stroke="#C6A15B" strokeWidth="2" strokeLinecap="round" />
    <path d="M180 43l16 12-19 6" stroke="#C6A15B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path data-doodle-float d="M46 24l2 7m-5-3l7-1m-7 15l2 6m-5-3l7-1" stroke="#A8B5A2" strokeWidth="2" strokeLinecap="round" />
    <path data-doodle-float d="M210 96l2 8m-6-4l9-1m-6-5l6 6m0-6l-6 6" stroke="#0F3D3E" strokeWidth="2" strokeLinecap="round" />
  </svg>;
}

export function DoodleUnderline({ className = "" }) {
  return <svg aria-hidden="true" className={`pointer-events-none absolute ${className}`} viewBox="0 0 180 12" fill="none"><path d="M3 7c48-5 105 5 174-3" stroke="#C6A15B" strokeWidth="2" strokeLinecap="round" /></svg>;
}
