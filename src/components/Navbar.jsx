import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Beyond Code", href: "#beyond-code" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const current = links.findLast((link) => {
        const section = document.querySelector(link.href);
        return section && section.getBoundingClientRect().top <= 140;
      });
      if (current) setActiveLink(current.href);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <nav data-navbar className={`fixed left-0 top-0 z-50 w-full border-b border-[#A8B5A2]/30 bg-[#F7F5EF]/90 backdrop-blur-md transition-all duration-300 ${scrolled ? "py-1 shadow-lg" : ""}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <a
          href="#home"
          className="text-2xl font-bold text-[#0F3D3E]"
        >
          Zobia Masood<span className="text-[#C6A15B]">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              data-navbar-link
              className={`relative text-sm transition-colors after:absolute after:-bottom-2 after:left-0 after:h-px after:bg-[#C6A15B] after:transition-all ${activeLink === link.href ? "text-[#0F3D3E] after:w-full" : "text-[#1F2933] after:w-0 hover:text-[#0F3D3E] hover:after:w-full"}`}
            >
              {link.name}
            </a>
          ))}

          <a
            href="#contact"
            data-navbar-link
            className="px-5 py-2.5 rounded-full bg-[#0F3D3E] text-white text-sm hover:bg-[#C6A15B] transition-all"
          >
            Let’s Connect
          </a>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#0F3D3E]"
        >
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#F7F5EF] border-t border-[#A8B5A2]/30 px-6 py-5">
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-[#1F2933]"
              >
                {link.name}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="text-center px-5 py-3 rounded-full bg-[#0F3D3E] text-white"
            >
              Let’s Connect
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;