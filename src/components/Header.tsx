"use client";

import { useState, useEffect } from "react";
import { Language, translations } from "@/utils/translations";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function Header({ lang, setLang }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-lg py-3"
          : "bg-white/45 dark:bg-transparent backdrop-blur-md dark:backdrop-blur-none border-b border-slate-200/10 dark:border-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection("home")}>
            <div className="mr-3 flex items-center justify-center bg-gradient-to-br from-emerald-400 to-teal-600 w-10 h-10 rounded-lg shadow-md shadow-emerald-500/20">
              {/* Custom SVG Logo representation: Architectural V and Foundation Shape */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path
                  d="M12 3L4 9V17L12 21L20 17V9L12 3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 8L7 12H17L12 8Z"
                  fill="currentColor"
                />
                <path
                  d="M12 21V12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight font-sans flex items-center gap-1 transition-colors duration-300 text-slate-900 dark:text-white">
                VITTI <span className="text-emerald-600 dark:text-emerald-400 font-light">BUILDERS</span>
              </span>
              <span className="block text-[9px] uppercase tracking-widest font-bold leading-none transition-colors duration-300 text-slate-700 dark:text-slate-400">
                {lang === "en" ? "Foundation of Trust" : "বিশ্বস্ততার ভিত্তি"}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-sm font-semibold hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-slate-900 dark:text-slate-200"
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-sm font-semibold hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-slate-900 dark:text-slate-200"
            >
              {t.nav.projects}
            </button>
            <button
              onClick={() => scrollToSection("landowners")}
              className="text-sm font-semibold hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-slate-900 dark:text-slate-200"
            >
              {t.nav.landowners}
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-semibold hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-slate-900 dark:text-slate-200"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-semibold hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-slate-900 dark:text-slate-200"
            >
              {t.nav.contact}
            </button>
          </nav>

          {/* Language Toggle & CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="border-0 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 flex items-center gap-2 transition-colors duration-300 text-slate-900 dark:text-slate-200 font-semibold"
            >
              <Globe className="h-4 w-4" />
              <span>{lang === "en" ? "বাংলা" : "English"}</span>
            </Button>

            <ThemeToggle />

            <Button
              onClick={() => scrollToSection("landowners")}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-lg shadow-emerald-500/25"
            >
              {t.hero.ctaPartner}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="border-0 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 p-2 transition-colors duration-300 text-slate-900 dark:text-slate-200"
            >
              <Globe className="h-5 w-5" />
            </Button>

            <ThemeToggle />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="border-0 hover:text-emerald-600 dark:hover:text-white p-2 transition-colors duration-300 text-slate-900 dark:text-slate-200"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="px-4 pt-2 pb-6 space-y-3">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left py-2 px-3 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-all"
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="block w-full text-left py-2 px-3 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-all"
            >
              {t.nav.projects}
            </button>
            <button
              onClick={() => scrollToSection("landowners")}
              className="block w-full text-left py-2 px-3 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-all"
            >
              {t.nav.landowners}
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left py-2 px-3 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-all"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left py-2 px-3 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-all"
            >
              {t.nav.contact}
            </button>
            <div className="pt-2 px-3">
              <Button
                onClick={() => scrollToSection("landowners")}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
              >
                {t.hero.ctaPartner}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
