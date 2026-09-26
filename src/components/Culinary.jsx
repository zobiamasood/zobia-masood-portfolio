import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import gsap from "gsap";
import { EditorialDoodles } from "./Doodles";

const assetFiles = import.meta.glob("../assets/images/culinary/*", { eager: true, query: "?url", import: "default" });
const images = Object.entries(assetFiles).map(([path, url]) => ({ url, name: path.split("/").pop().replace(/\.[^.]+$/, "") }));
const details = {
  "Burger": ["Made with a Little Joy", "Turning simple ingredients into something fun, colourful and delicious."],
  "Chocolate chip cookies": ["Afternoon Baking", "A little sweetness, warm from the oven and made for sharing."],
  "Pasta": ["A Little Pasta Magic", " Simple ingredients, a little creativity, and something comforting on the plate."],
  "corn-soup": ["Comfort in a Bowl", "A silky corn soup for slower, quieter evenings."],
  "chicken-pulao": ["A Taste of Home", "Warm spices and familiar flavours that always feel like home."],
  "salad": ["Garden in a Bowl", "Fresh color, crisp texture and simple joy."],
};

function Culinary() {
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const imageRef = useRef(null);
  const detailsRef = useRef(null);
  const move = (direction) => setActive((current) => (current + direction + images.length) % images.length);
  useEffect(() => { const onKey = (event) => { if (event.key === "ArrowLeft") move(-1); if (event.key === "ArrowRight") move(1); if (event.key === "Escape") setIsOpen(false); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, []);
  const current = images[active];
  const [title, caption] = details[current?.name] || [current?.name || "A kitchen memory", "A small memory made with care."];
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline.fromTo(imageRef.current, { opacity: 0.55, scale: 1.025 }, { opacity: 1, scale: 1, duration: 0.7 })
      .fromTo(detailsRef.current, { y: 10, opacity: 0.6 }, { y: 0, opacity: 1, duration: 0.55 }, "-=.45");
    return () => timeline.kill();
  }, [active]);
  return <div id="culinary" className="relative py-20"><EditorialDoodles className="-right-6 top-6 hidden h-36 w-56 md:block" /><div className="mb-8"><span className="section-kicker">BEYOND CODE / IN THE KITCHEN</span><h3 className="mt-3 display-title">A taste of <em>creativity.</em></h3><p className="mt-4 max-w-lg leading-7 text-[#64748B]">Cooking has been a long-time passion and a quiet dream of becoming a chef.</p></div><div className="media-gallery"><div data-editorial-media className="media-image-wrap"><img ref={imageRef} src={current.url} alt={title} className="media-image" /><button type="button" className="media-expand" onClick={() => setIsOpen(true)} aria-label="View kitchen image fullscreen"><Maximize2 size={18} /></button></div><div ref={detailsRef} data-editorial-copy className="media-details"><span className="section-kicker">{String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span><h4>{title}</h4><p>{caption}</p><div className="media-controls"><button className="icon-button" onClick={() => move(-1)} aria-label="Previous kitchen image"><ArrowLeft size={18} /></button><button className="icon-button filled" onClick={() => move(1)} aria-label="Next kitchen image"><ArrowRight size={18} /></button></div></div></div><div className="media-thumbs">{images.map((image, index) => <button key={image.name} className={index === active ? "active" : ""} onClick={() => setActive(index)} aria-label={`Show kitchen image ${index + 1}`}><img src={image.url} alt="" /></button>)}</div>{isOpen && <div className="modal-backdrop" onClick={() => setIsOpen(false)}><div className="image-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setIsOpen(false)} aria-label="Close image"><X size={20} /></button><img src={current.url} alt={title} /><p>{title}</p></div></div>}</div>;
}
export default Culinary;
