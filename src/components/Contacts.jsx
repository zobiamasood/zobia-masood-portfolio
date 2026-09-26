import { ArrowUpRight, Mail } from "lucide-react";
import { EditorialDoodles } from "./Doodles";

function Contacts() {
	return <section id="contact" data-contact-section className="relative overflow-hidden bg-[#0F3D3E] px-6 py-32 text-center text-white lg:px-10">
		<div data-contact-parallax className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full border border-[#A8B5A2]/20" />
		<EditorialDoodles className="-left-16 top-14 hidden h-44 w-64 opacity-60 lg:block" />
		<EditorialDoodles className="-right-16 bottom-8 hidden h-36 w-56 -rotate-12 opacity-40 lg:block" />
		<div className="relative mx-auto flex max-w-5xl flex-col items-center">
			<span data-contact-reveal className="font-sans text-xs uppercase tracking-[.22em] text-[#C6A15B]">06 / LET&apos;S CONNECT</span>
			<h2 data-contact-reveal className="my-4 max-w-4xl text-5xl font-medium leading-none tracking-tighter md:text-8xl">Let&apos;s build something <em className="text-[#C6A15B]">meaningful.</em></h2>
			<p data-contact-reveal className="max-w-xl font-sans leading-7 text-[#D4E0DC]">Have an idea, opportunity or project in mind? I&apos;d love to connect.</p>
			<a data-contact-reveal data-magnetic className="group my-8 inline-flex items-center gap-2 bg-[#C6A15B] px-5 py-4 font-sans text-sm text-[#0F3D3E] shadow-[0_14px_28px_rgba(0,0,0,.16)] transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_34px_rgba(0,0,0,.22)]" href="mailto:zobiamasood105@gmail.com"><Mail size={18} /> Email me <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" /></a>
			<div data-contact-reveal className="flex gap-8 font-sans text-sm text-[#A8B5A2]"><a className="transition-colors hover:text-white" href="https://github.com/zobiamasood">GitHub</a><a className="transition-colors hover:text-white" href="https://www.linkedin.com/in/zobia-masood-24251531a/">LinkedIn</a><a className="transition-colors hover:text-white" href="mailto:zobiamasood105@gmail.com">Email</a></div>
		</div>
	</section>;
}
export default Contacts;
