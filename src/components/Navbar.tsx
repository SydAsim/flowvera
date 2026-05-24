import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles, ArrowRight, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface NavbarProps {
  onOpenAudit: (source?: string) => void;
  activeSection: string;
}

export default function Navbar({ onOpenAudit, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Start", href: "#hero", key: "hero" },
    { label: "Problems", href: "#problems", key: "problems" },
    { label: "Workflows", href: "#workflows", key: "workflows" },
    { label: "Services", href: "#services", key: "services" },
    { label: "Process", href: "#process", key: "process" },
    { label: "FAQ", href: "#faq", key: "faq" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-card-border shadow-lg py-4"
          : "bg-transparent py-6"
      }`}
      id="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]"></div>
          <span className="text-2xl font-bold tracking-tight text-foreground font-display">
            Flowvero
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
              className={`text-sm font-medium transition-colors hover:text-cyan-400 relative py-1 ${
                activeSection === item.key ? "text-cyan-400" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Action Button & Theme Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 rounded-full border border-card-border bg-card text-foreground hover:bg-muted transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            id="nav-cta-desktop"
            onClick={() => onOpenAudit("Navbar - Desktop")}
            className="px-6 py-2 bg-cyan-400 text-slate-950 font-semibold rounded-full hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-400/20 cursor-pointer text-sm"
          >
            Get Free Audit
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg border border-card-border bg-card hover:bg-muted text-foreground transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg border border-card-border bg-card hover:bg-muted text-foreground transition-colors cursor-pointer"
            id="mobile-nav-toggle"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-4 right-4 mt-2 p-6 bg-background/95 backdrop-blur-2xl rounded-2xl border border-card-border shadow-2xl z-50 flex flex-col gap-4 animate-in fade-in duration-300">
          <div className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className={`text-base font-medium py-2 px-3 rounded-lg transition-colors hover:bg-muted leading-tight ${
                  activeSection === item.key ? "text-cyan-400 bg-cyan-500/5" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <hr className="border-card-border my-1" />

          <button
            id="nav-cta-mobile"
            onClick={() => {
              setIsOpen(false);
              onOpenAudit("Navbar - Mobile");
            }}
            className="w-full text-center py-2.5 bg-cyan-400 text-slate-950 font-semibold rounded-full hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-400/20"
          >
            Get Free Audit
          </button>
        </div>
      )}
    </nav>
  );
}

