import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import EnrollmentModal from "./EnrollmentModal";

const navLinks = [
  { label: "Wochenplan", href: "#schedule" },
  { label: "Preise", href: "#pricing" },
  { label: "Bring a Friend", href: "#bring-a-friend" },
  { label: "Events", href: "#events" },
  { label: "Kontakt", href: "#contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-card"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="font-display font-black text-xl uppercase tracking-tight"
        >
          <span className="text-gradient-zumba">Groupfitness</span>
          <span className={`ml-1 font-handwritten text-lg font-light tracking-wider normal-case transition-colors ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>by</span>
          <span className={`ml-1 font-handwritten text-lg font-light tracking-wider normal-case transition-colors ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>Katja</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className={`px-3 py-1.5 rounded-full text-sm font-display font-semibold transition-colors hover:text-primary ${
                scrolled ? "text-foreground/70" : "text-primary-foreground/80"
              }`}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-2 gradient-zumba px-5 py-2 rounded-full text-sm font-display font-bold text-primary-foreground shadow-glow hover:scale-105 transition-transform"
          >
            Probelektion buchen
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? "text-foreground hover:bg-muted" : "text-primary-foreground hover:bg-white/10"
          }`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menü öffnen"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border px-4 pb-4"
          >
            <nav className="flex flex-col gap-1 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="px-4 py-3 rounded-xl text-sm font-display font-semibold text-foreground/80 hover:text-primary hover:bg-muted transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setMenuOpen(false); setIsModalOpen(true); }}
                className="mt-2 gradient-zumba px-5 py-3 rounded-full text-sm font-display font-bold text-primary-foreground text-center shadow-glow w-full"
              >
                Probelektion buchen
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>

    <EnrollmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;
