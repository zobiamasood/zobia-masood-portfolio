import { ArrowUpRight } from "lucide-react";
import { EditorialDoodles } from "./Doodles";
import Culinary from "./Culinary";
import Photography from "./Photography";
import photographyImage from "../assets/images/photography/Asthetic-shorts.jpeg";
const pastaImage = Object.values(import.meta.glob("../assets/images/culinary/Pasta.png", { eager: true, query: "?url", import: "default" }))[0];

function BeyondCode() {
	return <section id="beyond-code" className="relative overflow-hidden bg-[#F7F5EF] px-6 py-24 lg:px-10 lg:py-32">
		<EditorialDoodles className="-right-20 top-20 hidden h-48 w-72 opacity-60 lg:block" />
		<div className="mx-auto max-w-6xl"><div className="mb-14 max-w-2xl"><span className="font-sans text-xs uppercase tracking-[.22em] text-[#C6A15B]">04 / LIFE OUTSIDE THE TERMINAL</span><h2 className="mt-3 text-5xl font-medium leading-none tracking-[-.04em] text-[#0F3D3E] md:text-7xl">Beyond the Code<span className="text-[#C6A15B]">.</span></h2><p className="mt-5 font-sans leading-7 text-[#64748B]">When I&apos;m not coding, I love creating in different ways.</p></div><div className="grid gap-6 md:grid-cols-2">
				<a data-kitchen-feature data-editorial-media className="group relative flex min-h-87.5 flex-col justify-between overflow-hidden bg-[#0F3D3E] bg-cover bg-center p-6 text-white lg:min-h-112.5 lg:p-10" href="#culinary" style={{ backgroundImage: `linear-gradient(180deg, rgba(15,61,62,.25), rgba(15,61,62,.92)), url('${pastaImage}')` }}><span className="relative font-sans text-xs uppercase tracking-[.22em] text-[#C6A15B]">Kitchen stories</span><h3 className="relative text-5xl font-medium leading-none md:text-7xl">Explore the<br /><em className="text-[#C6A15B]">Kitchen.</em></h3><span className="relative inline-flex items-center gap-2 font-sans text-xs text-[#C6A15B]">View the Gallery <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /></span></a>
			<a data-editorial-media className="group relative flex min-h-87.5 flex-col justify-between overflow-hidden bg-[#0F3D3E] p-6 text-white lg:min-h-112.5 lg:p-10" href="#photography"><img src={photographyImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" /><span className="relative font-sans text-xs uppercase tracking-[.22em] text-[#C6A15B]">Through my lens</span><h3 className="relative text-5xl font-medium leading-none md:text-7xl">Finding beauty<br />in the ordinary.</h3><span className="relative inline-flex items-center gap-1 font-sans text-xs text-[#C6A15B]">View the gallery <ArrowUpRight size={18} /></span></a>
		</div>
		<div className="py-20 text-center text-4xl leading-none text-[#0F3D3E] md:text-6xl">Some stories are cooked. Some are captured. <span className="block text-[#C6A15B]">All are remembered.</span></div>
		<Culinary />
		<Photography/>
		</div>
	</section>;
}

export default BeyondCode;
