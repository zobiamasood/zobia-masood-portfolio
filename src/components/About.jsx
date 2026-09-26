import { ArrowUpRight } from "lucide-react";
import { EditorialDoodles } from "./Doodles";

function About() {
  return (
    <section id="about" className="relative bg-white py-24 lg:py-32">
      <EditorialDoodles className="-right-16 top-12 hidden h-40 w-60 opacity-50 lg:block" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section heading */}
        <div className="flex items-center gap-4 mb-14">
          <span className="text-sm tracking-[0.25em] text-[#C6A15B]">
            01 / ABOUT
          </span>
          <div className="h-px flex-1 bg-[#A8B5A2]/40" />
        </div>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-start">

          {/* Left */}
          <div>
            <p className="text-[#64748B] text-sm mb-4">
              A little introduction
            </p>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-[#0F3D3E]">
              Turning ideas into
              <span className="block text-[#C6A15B]">
                digital experiences.
              </span>
            </h2>
          </div>

          {/* Right */}
          <div>
            <p className="text-lg text-[#1F2933] leading-8">
              I'm Zobia Masood, a Frontend & MERN Stack Developer who enjoys creating
              clean, interactive and meaningful web experiences.
            </p>

            <p className="mt-6 text-[#64748B] leading-7">
              My journey started with frontend development and gradually grew
              into exploring React, Node.js, Express and MongoDB. I enjoy
              learning by building real projects and turning ideas into
              something people can actually use.
            </p>

            <a
              href="#projects"
              className="inline-flex items-center gap-2 mt-8 text-[#0F3D3E] font-medium group"
            >
              Explore my work
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </div>

        {/* Personal details */}
        <div className="grid sm:grid-cols-3 gap-5 mt-20" data-stagger-group>

          <div className="about-identity rounded-3xl bg-[#F7F5EF] p-7 border border-[#A8B5A2]/20">
            <p className="text-xs tracking-[0.2em] text-[#C6A15B]">DEVELOPER</p>
            <h3 className="mt-3 text-xl font-semibold text-[#0F3D3E]">Building with purpose.</h3>
            <p className="mt-2 text-sm text-[#64748B]">I create clean, responsive and interactive digital experiences using modern web technologies.</p>
          </div>

          <div className="about-identity rounded-3xl bg-[#F7F5EF] p-7 border border-[#A8B5A2]/20">
            <p className="text-xs tracking-[0.2em] text-[#C6A15B]">FOOD CREATOR</p>
            <h3 className="mt-3 text-xl font-semibold text-[#0F3D3E]">A quiet dream.</h3>
            <p className="mt-2 text-sm text-[#64748B]">Cooking has always held a special place in my heart - a creative little world where I experiment and dream.</p>
          </div>

          <div className="about-identity rounded-3xl bg-[#F7F5EF] p-7 border border-[#A8B5A2]/20">
            <p className="text-xs tracking-[0.2em] text-[#C6A15B]">MOMENT SEEKER</p>
            <h3 className="mt-3 text-xl font-semibold text-[#0F3D3E]">Finding beauty in the little things.</h3>
            <p className="mt-2 text-sm text-[#64748B]">I notice the quiet details around me - nature, light, skies, flowers and moments worth remembering.</p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;