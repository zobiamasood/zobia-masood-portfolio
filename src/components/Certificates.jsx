import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, X } from "lucide-react";
import gsap from "gsap";
import { EditorialDoodles } from "./Doodles";

const certificateAssets = import.meta.glob("../assets/images/certificates/*", { eager: true, query: "?url", import: "default" });

const certificates = [
  ["Alburhan-Certificate.jpeg", "ilm-e-Deen", "Al Burhan Institute"],
  ["C--_Essentials_1_certificate.pdf", "C++ Essentials 1", "Cisco Networking Academy"],
  ["CEssentials1Update.pdf", "C Essentials", "Cisco Networking Academy"],
  ["completion certificate-codeAlph.pdf", "Frontend Development Internship", "CodeAlpha"],
  ["DSTP_Certificate.pdf", "Digital Skills Training", "DSTP"],
  ["freecodecamp.org_certification_.pdf", "Responsive Web Design", "freeCodeCamp"],
  ["LOR.pdf", "Letter of Recommendation", "Professional Milestone"],
  ["Zobia masood6-Web developement.pdf", "Web Development", "Professional Training"],
  ["Zobia masood7-Frontend Developement.pdf", "Frontend Development", "Professional Training"],
].map(([file, title, organization]) => ({
  file,
  title,
  organization,
  url: certificateAssets[`../assets/images/certificates/${file}`],
}));

function Certificates() {
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const captionRef = useRef(null);
  const move = (direction) => setActive((current) => (current + direction + certificates.length) % certificates.length);
  const current = certificates[active];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline.fromTo(captionRef.current, { y: 8, opacity: 0.55 }, { y: 0, opacity: 1, duration: 0.55 });
    return () => timeline.kill();
  }, [active]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return <section id="certificates" className="relative overflow-hidden bg-white px-6 py-24 lg:px-10 lg:py-32">
    <EditorialDoodles className="-right-12 top-16 hidden h-44 w-64 opacity-60 lg:block" />
    <div className="mx-auto max-w-6xl">
      <span className="section-kicker">05 / CERTIFICATES &amp; MILESTONES</span>
      <div className="mt-4 grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
        <div><h2 className="display-title">Proof of<br /><em>curiosity.</em></h2><p className="mt-6 max-w-sm leading-7 text-[#64748B]">A growing collection of the places, people and practices that have shaped how I build.</p><div className="mt-8 flex items-center gap-3"><button className="icon-button" onClick={() => move(-1)} aria-label="Previous certificate"><ArrowLeft size={18} /></button><button className="icon-button filled" onClick={() => move(1)} aria-label="Next certificate"><ArrowRight size={18} /></button><span className="ml-3 font-sans text-sm tracking-[.16em] text-[#C6A15B]">{String(active + 1).padStart(2, "0")} / {String(certificates.length).padStart(2, "0")}</span></div></div>
        <div className="certificate-stage">
          {certificates.map((certificate, index) => <button type="button" className={`certificate-card certificate-card-${(index - active + certificates.length) % certificates.length}`} key={certificate.file} onClick={() => setActive(index)} aria-label={`Select ${certificate.title}`}><span>{certificate.organization}</span>{certificate.file.endsWith(".pdf") ? <iframe title={certificate.title} src={certificate.url} /> : <img src={certificate.url} alt={certificate.title} />}</button>)}
          <div ref={captionRef} className="certificate-caption"><p className="text-xs uppercase tracking-[.18em] text-[#C6A15B]">{current.organization}</p><h3 className="mt-2 text-2xl font-medium text-[#0F3D3E]">{current.title}</h3><button type="button" onClick={() => setIsOpen(true)} className="mt-5 inline-flex items-center gap-2 text-sm text-[#0F3D3E] underline decoration-[#C6A15B] underline-offset-8">View certificate <ExternalLink size={15} /></button></div>
        </div>
      </div>
    </div>
    {isOpen && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={current.title} onClick={() => setIsOpen(false)}><div className="certificate-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setIsOpen(false)} aria-label="Close certificate"><X size={20} /></button>{current.file.endsWith(".pdf") ? <iframe title={current.title} src={current.url} /> : <img src={current.url} alt={current.title} />}<a className="modal-link" href={current.url} target="_blank" rel="noreferrer">Open original <ExternalLink size={15} /></a></div></div>}
  </section>;
}

export default Certificates;
