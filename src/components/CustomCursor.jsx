import { useEffect, useRef } from "react";
import gsap from "gsap";

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const moveX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const moveY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" });
    const onMove = (event) => {
      moveX(event.clientX);
      moveY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
    };
    const onOver = (event) => {
      const target = event.target.closest("a, button, [data-project-image], img");
      if (!target) return;
      ring.classList.add("!h-12", "!w-12", "!border-[#C6A15B]");
      if (target.matches("[data-project-image], img")) ring.dataset.label = "Explore";
    };
    const onOut = (event) => {
      if (event.relatedTarget?.closest?.("a, button, [data-project-image], img")) return;
      ring.classList.remove("!h-12", "!w-12", "!border-[#C6A15B]");
      delete ring.dataset.label;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });
    document.documentElement.classList.add("cursor-none");
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      document.documentElement.classList.remove("cursor-none");
    };
  }, []);

  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-100 hidden lg:block">
    <span ref={ringRef} className="absolute left-0 top-0 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#0F3D3E]/60 text-[9px] font-medium uppercase tracking-wider text-[#0F3D3E] transition-[width,height,border-color] duration-300 after:content-[attr(data-label)]" />
    <span ref={dotRef} className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C6A15B]" />
  </div>;
}

export default CustomCursor;
