"use client";

import { Language, translations } from "@/utils/translations";
import { Mail, Phone, MapPin, Building, ShieldCheck } from "lucide-react";

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const t = translations[lang];
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
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
    <footer className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-900 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center cursor-pointer" onClick={() => scrollToSection("home")}>
              <div className="mr-3 flex items-center justify-center bg-gradient-to-br from-emerald-400 to-teal-600 w-9 h-9 rounded-lg shadow-md shadow-emerald-500/20">
                <svg
                  width="20"
                  height="20"
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
                  <path d="M12 8L7 12H17L12 8Z" fill="currentColor" />
                  <path d="M12 21V12" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white font-sans transition-colors duration-300">
                VITTI <span className="text-emerald-600 dark:text-emerald-400 font-light">BUILDERS</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-500 leading-relaxed">
              {lang === "en"
                ? "Delivering state-of-the-art structural stability, design excellence, and transparent property development solutions."
                : "বাংলাদেশে আধুনিক ডিজাইন, কাঠামোগত নিরাপত্তা ও স্বচ্ছ ভূমি উন্নয়ন নিশ্চিত করে আবাসন সেবা প্রদান।"
              }
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-600 dark:text-emerald-400/95 bg-emerald-500/10 dark:bg-emerald-950/20 border border-emerald-500/20 dark:border-emerald-900/30 px-3 py-1.5 rounded-full w-fit">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>
                {lang === "en" ? "Incorporated under Companies Act 1994" : "কোম্পানি আইন ১৯৯৪ এর অধীনে নিবন্ধিত"}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4 transition-colors duration-300">
              {lang === "en" ? "Navigation" : "নেভিগেশন"}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {t.nav.projects}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("landowners")}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {t.nav.landowners}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Corporate Details */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4 transition-colors duration-300">
              {lang === "en" ? "Legal & Corporate" : "আইনি ও কর্পোরেট"}
            </h3>
            <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-500 leading-relaxed">
              <li className="flex items-start">
                <Building className="h-4 w-4 mr-2 text-slate-500 dark:text-slate-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-800 dark:text-slate-300 font-semibold transition-colors duration-300">Vitti Builders Limited</strong><br />
                  {lang === "en" ? "Reg. No: A Private Limited Company by Shares" : "রেজিঃ নং: একটি শেয়ার দ্বারা সীমিত প্রাইভেট কোম্পানি"}<br />
                  {lang === "en" ? "Authorized Capital: Tk. 20,000,000/-" : "অনুমোদিত মূলধন: ২,০০,০০,০০০/- টাকা"}
                </span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-slate-500 dark:text-slate-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-800 dark:text-slate-300 font-semibold transition-colors duration-300">{t.contact.office}</strong><br />
                  {lang === "en" ? "Kafrul / Shewrapara, Mirpur, Dhaka-1206, Bangladesh" : "কাফরুল / শেওড়াপাড়া, মিরপুর, ঢাকা-১২০৬, বাংলাদেশ"}
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4 transition-colors duration-300">
              {t.contact.title}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-emerald-600 dark:text-emerald-400" />
                <a href="tel:+8801700000000" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  +880 1700-000000
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-emerald-600 dark:text-emerald-400" />
                <a href="mailto:info@vittibuilders.com" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  info@vittibuilders.com
                </a>
              </li>
              <li className="pt-2 text-xs text-slate-500 dark:text-slate-600 leading-relaxed">
                {lang === "en"
                  ? "Open Hours: Sat - Thu (10:00 AM - 6:00 PM)"
                  : "খোলা থাকার সময়: শনি - বৃহস্পতি (সকাল ১০:০০ - সন্ধ্যা ৬:০০)"}
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 dark:border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-600 text-center md:text-left">
            &copy; {currentYear} Vitti Builders Limited. {lang === "en" ? "All rights reserved." : "সর্বস্বত্ব সংরক্ষিত।"}
          </p>
          <div className="flex space-x-6 text-xs text-slate-500 dark:text-slate-600">
            <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              {lang === "en" ? "Terms & Conditions" : "শর্তাবলী"}
            </a>
            <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              {lang === "en" ? "Privacy Policy" : "গোপনীয়তা নীতি"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
