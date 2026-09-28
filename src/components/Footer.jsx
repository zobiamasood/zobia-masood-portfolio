
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { EditorialDoodles } from "./Doodles";

function Footer() {
  return (
    <footer
      data-footer-section
      className="relative overflow-hidden border-t border-[#C6A15B]/15 bg-[#062627] px-6 pb-8 pt-24 text-[#F7F5EF] shadow-[0_-18px_40px_rgba(6,38,39,.16)] lg:px-10 lg:pt-32"
    >
      <EditorialDoodles className="-right-12 top-12 hidden h-48 w-72 opacity-50 lg:block" />

      <div className="relative mx-auto max-w-6xl">

        {/* ================= FINAL NOTE ================= */}
        <div className="border-b border-[#A8B5A2]/30 pb-20">
          <span
            data-footer-reveal
            className="font-sans text-xs uppercase tracking-[.22em] text-[#C6A15B]"
          >
            A FINAL NOTE
          </span>

          <a
            data-footer-signature
            data-footer-reveal
            href="#home"
            className="group mt-5 block w-fit font-['Playfair_Display'] text-[clamp(4rem,14vw,11rem)] font-medium leading-[.8] tracking-[-.07em] text-[#F7F5EF] transition-transform duration-500 hover:scale-[1.015]"
          >
            Zobia<span className="text-[#C6A15B]">.</span>
          </a>

          <p
            data-footer-reveal
            className="mt-8 max-w-md font-sans leading-7 text-[#D4E0DC]"
          >
            Frontend &amp; MERN Stack Developer
          </p>

          <p
            data-footer-reveal
            className="mt-2 font-serif text-xl italic text-[#A8B5A2]"
          >
            Building with curiosity, creating with intention.
          </p>
        </div>

        {/* ================= FOOTER NAVIGATION ================= */}
        <div className="grid gap-10 border-b border-[#A8B5A2]/30 py-8 font-sans text-sm md:grid-cols-3">

          {/* FIND YOUR WAY — LEFT */}
          <div data-footer-reveal>
            <span className="mb-4 block text-xs uppercase tracking-[.18em] text-[#C6A15B]">
              Find your way
            </span>

            <nav className="flex flex-wrap gap-x-5 gap-y-3 text-[#D4E0DC]">
              <a
                className="transition-colors hover:text-[#C6A15B]"
                href="#home"
              >
                Home
              </a>

              <a
                className="transition-colors hover:text-[#C6A15B]"
                href="#about"
              >
                About
              </a>

              <a
                className="transition-colors hover:text-[#C6A15B]"
                href="#skills"
              >
                Skills
              </a>

              <a
                className="transition-colors hover:text-[#C6A15B]"
                href="#projects"
              >
                Projects
              </a>

              <a
                className="transition-colors hover:text-[#C6A15B]"
                href="#beyond-code"
              >
                Beyond Code
              </a>

              <a
                className="transition-colors hover:text-[#C6A15B]"
                href="#contact"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* SAY HELLO — CENTER */}
          <div
            data-footer-reveal
            className="md:justify-self-center"
          >
            <span className="mb-4 block text-xs uppercase tracking-[.18em] text-[#C6A15B]">
              Say hello
            </span>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-[#D4E0DC]">
              <a
                className="transition-colors hover:text-[#C6A15B]"
                href="https://www.linkedin.com/in/zobia-masood-24251531a"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>

              <a
                className="transition-colors hover:text-[#C6A15B]"
                href="https://github.com/zobiamasood"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>

              <a
                className="transition-colors hover:text-[#C6A15B]"
                href="mailto:zobiamasood105@gmail.com"
              >
                Email
              </a>
            </div>
          </div>

          {/* BACK TO TOP — RIGHT */}
          <div
            data-footer-reveal
            className="md:justify-self-end"
          >
            <a
              data-magnetic
              href="#home"
              className="inline-flex items-center gap-2 text-[#D4E0DC] transition-colors hover:text-[#C6A15B]"
            >
              Back to top
              <MoveUpRight size={16} />
            </a>
          </div>

        </div>

        {/* ================= GOLD LINE ================= */}
        <div
          data-footer-line
          className="h-px origin-left scale-x-0 bg-[#C6A15B]"
        />

        {/* ================= COPYRIGHT ================= */}
        <div
          data-footer-reveal
          className="flex flex-col gap-2 pt-5 font-sans text-xs text-[#A8B5A2] sm:flex-row sm:items-center sm:justify-between"
        >
          <span>
            &copy; 2026 Zobia Masood. All rights reserved.
          </span>

          <span>
            Frontend &amp; MERN Stack Developer{" "}
            <ArrowUpRight
              size={13}
              className="ml-1 inline text-[#C6A15B]"
            />
          </span>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
