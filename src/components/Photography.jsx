import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { EditorialDoodles } from "./Doodles";

const assetFiles = import.meta.glob("../assets/images/photography/*", { eager: true, query: "?url", import: "default" });
const images = Object.entries(assetFiles).map(([path, url]) => ({ url, name: path.split("/").pop() }));
const titles = ["Echoes of Heritage", "Spring Blossoms", "Quiet Bloom", "Beyond the Clouds", "Lunar Silence","Whispers Among the Pines", "Silent Peaks", "After Dawn", "Stormy Skies", "Whispers of Nature", "Mountain Whispers", "Where Waves Meet the Shore", "A Moment Worth Keeping", "Faraaway Light", "River Stone","Where the Sun Meets the Sea","Under a Quiet Sky","Rhythm of the Waves"];
const captions = ["Where art and history meet in quiet beauty.", "Where nature blooms in its own quiet way.", "Where nature blooms in its own quiet way.", "Some lights don't need to shine the brightest to be noticed—they simply wait for the right moment.", "A quiet glow beneath the endless night.","Standing still, surrounded by nature's quiet beauty, where every breeze carries a sense of peace and every moment feels timeless.", "Where the mountains speak in silence.", "A peaceful moment as the world begins to wake.", "When the clouds hold their breath.", "Life flowing quietly through the rocks.", "Where the mountains stand tall, the sheep graze freely, and life moves at nature's pace.", "Standing at the edge of the ocean, where every wave brings a new beginning and every horizon holds a new story.", "Collecting little pieces of beauty along the way.", "Light arriving from somewhere far away.", "River stones smoothed by time..", "A quiet evening framed by ancient walls, where the fading sun meets the endless sea","A peaceful sky draped in clouds, with the silhouette of the minaret resting quietly below.","Waves roll in, one after another, carrying the calm rhythm of the ocean"]

function Photography() {
  const [active, setActive] = useState(0);
  const imageRef = useRef(null);
  const detailsRef = useRef(null);
  const move = (direction) => setActive((current) => (current + direction + images.length) % images.length);
  useEffect(() => { const onKey = (event) => { if (event.key === "ArrowLeft") move(-1); if (event.key === "ArrowRight") move(1); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, []);
  const current = images[active];
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline.fromTo(imageRef.current, { opacity: 0.55, scale: 1.025 }, { opacity: 1, scale: 1, duration: 0.7 })
      .fromTo(detailsRef.current, { y: 10, opacity: 0.6 }, { y: 0, opacity: 1, duration: 0.55 }, "-=.45");
    return () => timeline.kill();
  }, [active]);
  return <div id="photography" className="relative py-20"><EditorialDoodles className="-left-8 top-4 hidden h-36 w-56 rotate-180 md:block" /><div className="mb-8"><span className="section-kicker">THROUGH MY LENS</span><h3 className="mt-3 display-title">Quiet things, <em>noticed.</em></h3><p className="mt-4 max-w-lg leading-7 text-[#64748B]">A calm collection of light, texture and the little landscapes that ask to be remembered.</p></div><div className="media-gallery photography-gallery"><div data-editorial-media className="media-image-wrap"><img ref={imageRef} src={current.url} alt={titles[active] || "Photography"} className="media-image" /></div><div ref={detailsRef} data-editorial-copy className="media-details"><span className="section-kicker">{String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span><h4>{titles[active] || "A quiet moment"}</h4><p>{captions[active] || "A small pause in the world, held in light and shadow."}</p><div className="media-controls"><button className="icon-button" onClick={() => move(-1)} aria-label="Previous photograph"><ArrowLeft size={18} /></button><button className="icon-button filled" onClick={() => move(1)} aria-label="Next photograph"><ArrowRight size={18} /></button></div></div></div><div className="media-thumbs">{images.map((image, index) => <button key={image.name} className={index === active ? "active" : ""} onClick={() => setActive(index)} aria-label={`Show photograph ${index + 1}`}><img src={image.url} alt="" /></button>)}</div></div>;
}
export default Photography;
