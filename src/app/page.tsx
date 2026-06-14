"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Language, translations } from "@/utils/translations";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard, { ProjectData } from "@/components/ProjectCard";
import InquiryDialog from "@/components/InquiryDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  Users,
  Compass,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Send,
  Loader2,
  Calendar,
  Layers,
  MapPin,
  TrendingUp,
  Award,
  BookOpen,
  Phone
} from "lucide-react";

// Mock Projects database aligned with Memorandum/Articles data
const PROJECTS_DATA: ProjectData[] = [
  {
    id: "vitti-rose-garden",
    titleEn: "Vitti Rose Garden",
    titleBn: "ভিত্তি রোজ গার্ডেন",
    locationEn: "17, West Shewrapara, Mirpur, Dhaka-1206",
    locationBn: "১৭, পশ্চিম শেওড়াপাড়া, মিরপুর, ঢাকা-১২০৬",
    type: "apartment",
    status: "ongoing",
    sizeEn: "1,450 - 1,850 SFT",
    sizeBn: "১,৪৫০ - ১,৮৫০ বর্গফুট",
    priceEn: "Tk. 7,500 / SFT",
    priceBn: "৭,৫০০ টাকা / বর্গফুট",
    image: "/images/vitti_apartment_1.png",
    featuresEn: ["Smart Card Lock", "24/7 Full Generator", "Rooftop Community Hall", "Earthquake Resistant Frame"],
    featuresBn: ["স্মার্ট কার্ড লক", "২৪/৭ জেনারেটর সাপোর্ট", "ছাদ বাগান ও হল রুম", "ভূমিকম্প সহনশীল কাঠামো"]
  },
  {
    id: "vitti-green-city",
    titleEn: "Vitti Green City (Land Shares)",
    titleBn: "ভিত্তি গ্রীন সিটি (জমির শেয়ার)",
    locationEn: "240/D, Munda, Uttar Khan, Dhaka-1230",
    locationBn: "২৪০/ডি, মুণ্ডা, উত্তরখান, ঢাকা-১২৩০",
    type: "land",
    status: "ongoing",
    sizeEn: "3 Katha / Share",
    sizeBn: "৩ কাঠা / শেয়ার",
    priceEn: "Tk. 2,500,000 / Share",
    priceBn: "২৫,০০,০০০ টাকা / শেয়ার",
    image: "/images/vitti_land_1.png",
    featuresEn: ["RAJUK Approved Layout", "30ft Paved Road access", "Near Airport Link Road", "Instant Share Registration"],
    featuresBn: ["রাজউক অনুমোদিত লেআউট", "৩০ ফুট চওড়া পাকা রাস্তা", "এয়ারপোর্ট লিংক রোড সংলগ্ন", "তাৎক্ষণিক শেয়ার রেজিস্ট্রেশন"]
  },
  {
    id: "vitti-grand-plaza",
    titleEn: "Vitti Grand Plaza (Commercial)",
    titleBn: "ভিত্তি গ্র্যান্ড প্লাজা (বাণিজ্যিক)",
    locationEn: "654/1 Kafrul Ashidug, Dhaka Cantonment",
    locationBn: "৬৫৪/১ কাফরুল আশীদুর্গ, ঢাকা সেনানিবাস",
    type: "commercial",
    status: "upcoming",
    sizeEn: "2,500 - 6,000 SFT",
    sizeBn: "২,৫০০ - ৬,০০০ বর্গফুট",
    priceEn: "Tk. 18,000 / SFT",
    priceBn: "১৮,০০০ টাকা / বর্গফুট",
    image: "/images/vitti_commercial_1.png",
    featuresEn: ["Central HVAC System", "Triple High-Speed Lifts", "LTST Panel & PFI Switchgear", "Glass Curtain Wall Facade"],
    featuresBn: ["সেন্ট্রাল এসি ব্যবস্থা", "৩টি দ্রুতগতির লিফট", "এলটিএসটি প্যানেল ও সুইচ গিয়ার", "অভিজাত গ্লাস পর্দা ওয়াল"]
  },
  {
    id: "vitti-banyan-shade",
    titleEn: "Vitti Banyan Shade",
    titleBn: "ভিত্তি বটমূল ছায়া",
    locationEn: "Kafrul, Dhaka-1206",
    locationBn: "কাফরুল, ঢাকা-১২০৬",
    type: "apartment",
    status: "completed",
    sizeEn: "1,600 - 2,100 SFT",
    sizeBn: "১,৬০০ - ২,১০০ বর্গফুট",
    priceEn: "Tk. 8,200 / SFT",
    priceBn: "৮,২০০ টাকা / বর্গফুট",
    image: "/images/vitti_apartment_1.png",
    featuresEn: ["Luxurious Reception Lobby", "Double Basement Parking", "Imported Sanitary Fittings", "Solar Backup Lighting"],
    featuresBn: ["অভিজাত অভ্যর্থনা লাউঞ্জ", "দ্বিগুণ বেসমেন্ট পার্কিং", "আমদানিকৃত ফিটিংস", "সোলার পাওয়ার ব্যাকআপ"]
  },
  {
    id: "vitti-riverside-plots",
    titleEn: "Vitti Riverside Plots",
    titleBn: "ভিত্তি রিভারসাইড প্লট",
    locationEn: "Uttar Khan, Dhaka-1230",
    locationBn: "উত্তরখান, ঢাকা-১২৩০",
    type: "land",
    status: "upcoming",
    sizeEn: "5 Katha / Plot",
    sizeBn: "৫ কাঠা / প্লট",
    priceEn: "Tk. 4,500,000 / Plot",
    priceBn: "৪৫,০০,০০০ টাকা / প্লট",
    image: "/images/vitti_land_1.png",
    featuresEn: ["100% High Land Fill", "Lakefront Community Park", "Demarcated Boundaries", "Utility Grid Connection Ready"],
    featuresBn: ["১০০% ভরাট উচু ভূমি", "লেকফ্রন্ট পার্ক সুবিধা", "সীমানা প্রাচীর দিয়ে ঘেরা", "ইউটিলিটি সংযোগ প্রস্তুত"]
  }
];

export default function Home() {
  const [lang, setLang] = useState<Language>("bn"); // Defaulting to Bengali since target market is BD and bilingual is preferred
  const t = translations[lang];

  // Hero carousel state
  const [heroIndex, setHeroIndex] = useState(0);
  const heroSlides = [
    {
      image: "/images/vitti_apartment_1.png",
      title: t.hero.apartmentsTitle,
      desc: t.hero.apartmentsDesc,
      ctaText: t.hero.ctaInquire,
      section: "projects"
    },
    {
      image: "/images/vitti_land_1.png",
      title: t.hero.landTitle,
      desc: t.hero.landDesc,
      ctaText: t.hero.ctaInquire,
      section: "projects"
    },
    {
      image: "/images/vitti_commercial_1.png",
      title: t.hero.commercialTitle,
      desc: t.hero.commercialDesc,
      ctaText: t.hero.ctaPartner,
      section: "landowners"
    }
  ];

  // Auto-play hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handlePrevSlide = () => {
    setHeroIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setHeroIndex((prev) => (prev + 1) % heroSlides.length);
  };

  // Projects filtering state
  const [projectFilter, setProjectFilter] = useState<"all" | "ongoing" | "upcoming" | "completed">("all");
  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (projectFilter === "all") return true;
    return p.status === projectFilter;
  });

  // Inquiry modal state
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedInquiryProject, setSelectedInquiryProject] = useState<ProjectData | null>(null);

  const openInquiry = (project: ProjectData) => {
    setSelectedInquiryProject(project);
    setInquiryOpen(true);
  };

  // Landowner J/V form state
  const [jvForm, setJvForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    size: "",
    roadWidth: "",
    notes: ""
  });
  const [jvLoading, setJvLoading] = useState(false);
  const [jvSuccess, setJvSuccess] = useState(false);

  const handleJvSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jvForm.name || !jvForm.phone || !jvForm.location) return;

    setJvLoading(true);
    setTimeout(() => {
      setJvLoading(false);
      setJvSuccess(true);
      setJvForm({
        name: "",
        phone: "",
        email: "",
        location: "",
        size: "",
        roadWidth: "",
        notes: ""
      });
      setTimeout(() => setJvSuccess(false), 4000);
    }, 1500);
  };

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    interest: "flat",
    message: ""
  });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) return;

    setContactLoading(true);
    setTimeout(() => {
      setContactLoading(false);
      setContactSuccess(true);
      setContactForm({
        name: "",
        phone: "",
        interest: "flat",
        message: ""
      });
      setTimeout(() => setContactSuccess(false), 4000);
    }, 1500);
  };

  // Scroll anchor helper
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
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      {/* Header */}
      <Header lang={lang} setLang={setLang} />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Carousel with Fade Animation */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === heroIndex ? "opacity-35 z-0" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover object-center"
            />
            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20" />
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/25 px-4 py-1.5 rounded-full text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide uppercase animate-pulse">
            <Building2 className="h-4 w-4 shrink-0" />
            <span>{lang === "en" ? "Real Estate Developers" : "রিয়েল এস্টেট ডেভেলপার"}</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-none font-sans drop-shadow-md">
            {heroSlides[heroIndex].title}
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
            {heroSlides[heroIndex].desc}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => scrollToSection(heroSlides[heroIndex].section)}
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold px-8 py-6 rounded-lg shadow-lg shadow-emerald-500/20 w-full sm:w-auto"
            >
              {heroSlides[heroIndex].ctaText}
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              variant="outline"
              size="lg"
              className="text-white border-slate-700 hover:bg-slate-900 hover:border-slate-500 px-8 py-6 rounded-lg w-full sm:w-auto"
            >
              {t.nav.contact}
            </Button>
          </div>
        </div>

        {/* Carousel Nav Controls */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/40 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all z-20"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/40 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all z-20"
          aria-label="Next Slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-0 right-0 flex items-center justify-center space-x-2.5 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setHeroIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === heroIndex ? "w-8 bg-emerald-400" : "w-2 bg-slate-700"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Quick Credentials / Stats Grid */}
      <section className="relative z-20 bg-slate-900 border-y border-slate-800/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4 space-y-1.5 border-r border-slate-800 last:border-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-white">Tk. 2 Crore</div>
              <div className="text-xs sm:text-sm text-slate-400 font-semibold uppercase tracking-wider">
                {lang === "en" ? "Authorized Capital" : "অনুমোদিত মূলধন"}
              </div>
            </div>
            <div className="p-4 space-y-1.5 border-r border-slate-800 last:border-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">100%</div>
              <div className="text-xs sm:text-sm text-slate-400 font-semibold uppercase tracking-wider">
                {lang === "en" ? "Legal Transparency" : "আইনি স্বচ্ছতা"}
              </div>
            </div>
            <div className="p-4 space-y-1.5 border-r border-slate-800 last:border-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-white">RAJUK</div>
              <div className="text-xs sm:text-sm text-slate-400 font-semibold uppercase tracking-wider">
                {lang === "en" ? "Compliant Standards" : "অনুমোদিত কাঠামো"}
              </div>
            </div>
            <div className="p-4 space-y-1.5">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">Joint Venture</div>
              <div className="text-xs sm:text-sm text-slate-400 font-semibold uppercase tracking-wider">
                {lang === "en" ? "Landowner Focus" : "যৌথ উদ্যোগ পার্টনার"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-sans text-white">
              {t.services.title}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto rounded-full" />
            <p className="text-slate-400 text-base leading-relaxed">
              {t.services.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1: Apartments */}
            <div className="bg-slate-900/50 border border-slate-800/80 p-8 rounded-2xl flex flex-col items-start gap-4 hover:border-slate-700/80 transition-all group">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                {t.services.apartments}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t.services.apartmentsDesc}
              </p>
            </div>

            {/* Service 2: Land Shares */}
            <div className="bg-slate-900/50 border border-slate-800/80 p-8 rounded-2xl flex flex-col items-start gap-4 hover:border-slate-700/80 transition-all group">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                {t.services.land}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t.services.landDesc}
              </p>
            </div>

            {/* Service 3: Joint Ventures */}
            <div className="bg-slate-900/50 border border-slate-800/80 p-8 rounded-2xl flex flex-col items-start gap-4 hover:border-slate-700/80 transition-all group">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                {t.services.ventures}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t.services.venturesDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase Section */}
      <section id="projects" className="py-24 bg-slate-900/35 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-sans text-white">
              {t.projects.title}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto rounded-full" />
            <p className="text-slate-400 text-base leading-relaxed">
              {t.projects.subtitle}
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex justify-center mb-12">
            <Tabs value={projectFilter} onValueChange={(val) => setProjectFilter(val as any)} className="w-fit">
              <TabsList className="bg-slate-900 border border-slate-800 p-1 rounded-xl">
                <TabsTrigger value="all" className="rounded-lg px-5 py-2 text-xs sm:text-sm text-slate-400 data-[state=active]:bg-emerald-500 data-[state=active]:text-white transition-all">
                  {t.projects.all}
                </TabsTrigger>
                <TabsTrigger value="ongoing" className="rounded-lg px-5 py-2 text-xs sm:text-sm text-slate-400 data-[state=active]:bg-emerald-500 data-[state=active]:text-white transition-all">
                  {t.projects.status.ongoing}
                </TabsTrigger>
                <TabsTrigger value="upcoming" className="rounded-lg px-5 py-2 text-xs sm:text-sm text-slate-400 data-[state=active]:bg-emerald-500 data-[state=active]:text-white transition-all">
                  {t.projects.status.upcoming}
                </TabsTrigger>
                <TabsTrigger value="completed" className="rounded-lg px-5 py-2 text-xs sm:text-sm text-slate-400 data-[state=active]:bg-emerald-500 data-[state=active]:text-white transition-all">
                  {t.projects.status.completed}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  lang={lang}
                  onInquire={openInquiry}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-500 text-sm">
              {lang === "en" ? "No projects found in this category." : "এই ক্যাটাগরিতে কোনো প্রজেক্ট পাওয়া যায়নি।"}
            </div>
          )}
        </div>
      </section>

      {/* Landowners / Joint Venture Portal */}
      <section id="landowners" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Why Us Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-xs sm:text-sm font-bold text-emerald-400 uppercase tracking-widest block">
                  {t.landowner.title}
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans leading-tight">
                  {lang === "en" ? "Turn Your Plot Into a Landmark" : "আপনার মূল্যবান জমিকে দৃষ্টিনন্দন ল্যান্ডমার্কে রূপ দিন"}
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full" />
                <p className="text-slate-400 text-base leading-relaxed">
                  {t.landowner.subtitle}
                </p>
              </div>

              <div className="space-y-5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Award className="h-5 w-5 text-emerald-400" />
                  <span>{t.landowner.whyUs}</span>
                </h3>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-semibold text-sm">{t.landowner.reason1Title}</h4>
                      <p className="text-slate-400 text-xs sm:text-sm mt-0.5">{t.landowner.reason1Desc}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-semibold text-sm">{t.landowner.reason2Title}</h4>
                      <p className="text-slate-400 text-xs sm:text-sm mt-0.5">{t.landowner.reason2Desc}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-semibold text-sm">{t.landowner.reason3Title}</h4>
                      <p className="text-slate-400 text-xs sm:text-sm mt-0.5">{t.landowner.reason3Desc}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Proposal Form Card */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/10 to-transparent pointer-events-none rounded-tr-2xl" />
              
              <div className="space-y-2 mb-6">
                <h3 className="text-xl font-bold text-white">{t.landowner.formTitle}</h3>
                <p className="text-xs text-slate-400">{t.landowner.formSubtitle}</p>
              </div>

              {jvSuccess ? (
                <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 animate-in zoom-in-95 duration-200">
                  <CheckCircle className="h-16 w-16 text-emerald-400" />
                  <p className="text-sm text-emerald-400 font-semibold max-w-xs">
                    {t.landowner.success}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleJvSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="jv-name" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {t.landowner.name} <span className="text-rose-500">*</span>
                      </label>
                      <Input
                        id="jv-name"
                        required
                        placeholder={lang === "en" ? "e.g. John Doe" : "যেমন: আব্দুর রহমান"}
                        className="bg-slate-950 border-slate-800 text-white placeholder-slate-600 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
                        value={jvForm.name}
                        onChange={(e) => setJvForm({ ...jvForm, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="jv-phone" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {t.landowner.phone} <span className="text-rose-500">*</span>
                      </label>
                      <Input
                        id="jv-phone"
                        required
                        type="tel"
                        placeholder={lang === "en" ? "e.g. 017XXXXXXXX" : "যেমন: ০১৭XXXXXXXX"}
                        className="bg-slate-950 border-slate-800 text-white placeholder-slate-600 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
                        value={jvForm.phone}
                        onChange={(e) => setJvForm({ ...jvForm, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="jv-location" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {t.landowner.location} <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      id="jv-location"
                      required
                      placeholder={lang === "en" ? "e.g. West Shewrapara, Mirpur" : "যেমন: পশ্চিম শেওড়াপাড়া, মিরপুর"}
                      className="bg-slate-950 border-slate-800 text-white placeholder-slate-600 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
                      value={jvForm.location}
                      onChange={(e) => setJvForm({ ...jvForm, location: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="jv-size" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {t.landowner.size}
                      </label>
                      <Input
                        id="jv-size"
                        placeholder={lang === "en" ? "e.g. 5 Katha" : "যেমন: ৫ কাঠা"}
                        className="bg-slate-950 border-slate-800 text-white placeholder-slate-600 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
                        value={jvForm.size}
                        onChange={(e) => setJvForm({ ...jvForm, size: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="jv-road" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {t.landowner.roadWidth}
                      </label>
                      <Input
                        id="jv-road"
                        placeholder={lang === "en" ? "e.g. 20 Feet" : "যেমন: ২০ ফুট"}
                        className="bg-slate-950 border-slate-800 text-white placeholder-slate-600 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
                        value={jvForm.roadWidth}
                        onChange={(e) => setJvForm({ ...jvForm, roadWidth: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="jv-notes" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {t.landowner.notes}
                    </label>
                    <Textarea
                      id="jv-notes"
                      rows={3}
                      placeholder={lang === "en" ? "Any special directions, land type, corner plot info, etc." : "জমির ধরণ, কর্নার প্লট কি না বা অন্য কোনো বিশেষ তথ্য।"}
                      className="bg-slate-950 border-slate-800 text-white placeholder-slate-600 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 resize-none"
                      value={jvForm.notes}
                      onChange={(e) => setJvForm({ ...jvForm, notes: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={jvLoading}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-6 rounded-lg font-bold border-0 shadow-lg shadow-emerald-500/20"
                  >
                    {jvLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      t.landowner.submit
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About Us & Profile Section */}
      <section id="about" className="py-24 bg-slate-900/35 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column: Background Info */}
            <div className="space-y-6">
              <span className="text-xs sm:text-sm font-bold text-emerald-400 uppercase tracking-widest block">
                {lang === "en" ? "Foundation & History" : "প্রতিষ্ঠা ও ইতিহাস"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-sans">
                {t.about.title}
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full" />
              <div className="text-slate-400 text-sm leading-relaxed space-y-4">
                <p>{t.about.desc1}</p>
                <p>{t.about.desc2}</p>
              </div>
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                <h4 className="text-white font-semibold text-sm flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-emerald-400" />
                  <span>{lang === "en" ? "Vitti Objectives Highlights" : "ভিত্তি এর লক্ষ্য ও উদ্দেশ্যসমূহ"}</span>
                </h4>
                <ul className="text-xs text-slate-500 space-y-1.5 list-disc pl-4 leading-relaxed">
                  <li>{lang === "en" ? "Multi-storied residential building & commercial plaza construction" : "বহুতল আবাসিক ও বাণিজ্যিক ভবন এবং শপিং প্লাজা নির্মাণ"}</li>
                  <li>{lang === "en" ? "Real Estate contractors, land developers & engineers" : "রিয়েল এস্টেট ঠিকাদার, ভূমি উন্নয়নকারী ও পরামর্শক প্রকৌশলী"}</li>
                  <li>{lang === "en" ? "Agro-biased production and building materials trade (Cement, Tile, fittings)" : "অ্যাগ্রো ভিত্তিক উৎপাদন ও নির্মাণ সামগ্রী বিপণন (সিমেন্ট, টাইলস, ফিটিংস)"}</li>
                  <li>{lang === "en" ? "Power plants equipment and cables distribution" : "পাওয়ার প্লান্টের সরঞ্জাম এবং ক্যাবল সরবরাহ ও ইনস্টলেশন"}</li>
                </ul>
              </div>
            </div>

            {/* Right Column: Board of Directors Profiles */}
            <div className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                  {t.about.leadership}
                </h3>
                <p className="text-xs text-slate-400">
                  {lang === "en" ? "Experienced corporate leaders directing Vitti's growth" : "অভিজ্ঞ বোর্ড পর্ষদ যা ভিত্তি এর নির্ভরযোগ্য অগ্রগতি নিশ্চিত করছে"}
                </p>
              </div>

              <div className="space-y-6">
                {t.about.directors.map((dir, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900 border border-slate-800/80 p-6 rounded-xl flex flex-col sm:flex-row items-start gap-4 hover:border-slate-700 transition-colors"
                  >
                    {/* Stylized Initial Logo for Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700/60 rounded-xl flex items-center justify-center text-emerald-400 font-extrabold text-lg shrink-0 shadow">
                      {dir.name.split(" ").slice(-1)[0][0] || "D"}
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                        <h4 className="text-white font-bold text-base">{dir.name}</h4>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 px-2 py-0.5 rounded w-fit">
                          {dir.role}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed mt-1.5">
                        {dir.bio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Contact Info card */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-xs sm:text-sm font-bold text-emerald-400 uppercase tracking-widest block">
                  {lang === "en" ? "Immediate Assistance" : "তাৎক্ষণিক সহায়তা"}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white font-sans">
                  {t.contact.subtitle}
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800/80 p-6 rounded-xl space-y-3">
                  <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{t.contact.office}</h4>
                    <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
                      {lang === "en" ? "Kafrul / Shewrapara, Mirpur, Dhaka-1206, Bangladesh" : "কাফরুল / শেওড়াপাড়া, মিরপুর, ঢাকা-১২০৬, বাংলাদেশ"}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800/80 p-6 rounded-xl space-y-3">
                  <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{t.contact.phone}</h4>
                    <p className="text-slate-400 text-xs sm:text-sm mt-1">
                      <a href="tel:+8801700000000" className="hover:text-emerald-400 transition-colors">
                        +880 1700-000000
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Graphical Map representation in UI instead of default frame */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl h-64 relative overflow-hidden flex flex-col justify-end p-6">
                {/* SVG Abstract Grid Pattern mimicking city roads */}
                <div className="absolute inset-0 opacity-15">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    {/* Add glowing circles representing project locations */}
                    <circle cx="150" cy="80" r="10" fill="#10B981" />
                    <line x1="150" y1="80" x2="300" y2="180" stroke="#10B981" strokeWidth="2" strokeDasharray="5,5" />
                    <circle cx="300" cy="180" r="8" fill="#14B8A6" />
                    <circle cx="80" cy="200" r="6" fill="#10B981" />
                  </svg>
                </div>
                
                <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
                  <div className="bg-emerald-500 text-slate-950 font-bold px-3 py-1 rounded text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/35">
                    Dhaka Cantonment
                  </div>
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping mt-1" />
                </div>

                <div className="relative z-10 space-y-1.5 bg-slate-950/80 backdrop-blur-md border border-slate-800/80 p-4 rounded-xl">
                  <h4 className="text-white font-bold text-xs">
                    {lang === "en" ? "Corporate Coverage Area" : "কর্পোরেট কভারেজ এলাকা"}
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {lang === "en" ? "Covering prime spots including Mirpur, Shewrapara, Kafrul, and Uttar Khan." : "মিরপুর, শেওড়াপাড়া, কাফরুল ও উত্তরখান সহ ঢাকার শীর্ষস্থানীয় সকল জোনে আমাদের কাজ চলছে।"}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Message Form Card */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">{t.contact.formTitle}</h3>

              {contactSuccess ? (
                <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 animate-in zoom-in-95 duration-200">
                  <CheckCircle className="h-16 w-16 text-emerald-400" />
                  <p className="text-sm text-emerald-400 font-semibold">
                    {t.contact.success}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {t.contact.name} <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      id="contact-name"
                      required
                      placeholder={lang === "en" ? "e.g. John Doe" : "যেমন: আব্দুর রহমান"}
                      className="bg-slate-950 border-slate-800 text-white placeholder-slate-600 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-phone" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {t.contact.phone} <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      id="contact-phone"
                      required
                      type="tel"
                      placeholder={lang === "en" ? "e.g. 017XXXXXXXX" : "যেমন: ০১৭XXXXXXXX"}
                      className="bg-slate-950 border-slate-800 text-white placeholder-slate-600 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-interest" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {t.contact.interest}
                    </label>
                    <select
                      id="contact-interest"
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                      value={contactForm.interest}
                      onChange={(e) => setContactForm({ ...contactForm, interest: e.target.value })}
                    >
                      <option value="flat">{t.contact.interestOptions.flat}</option>
                      <option value="share">{t.contact.interestOptions.share}</option>
                      <option value="joint">{t.contact.interestOptions.joint}</option>
                      <option value="other">{t.contact.interestOptions.other}</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-msg" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {t.contact.msg}
                    </label>
                    <Textarea
                      id="contact-msg"
                      rows={4}
                      placeholder={lang === "en" ? "Write your query here..." : "আপনার বার্তাটি এখানে লিখুন..."}
                      className="bg-slate-950 border-slate-800 text-white placeholder-slate-600 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 resize-none"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={contactLoading}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-6 rounded-lg font-bold border-0 shadow-lg shadow-emerald-500/20"
                  >
                    {contactLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      t.contact.submit
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Project Inquiry Dialog */}
      {selectedInquiryProject && (
        <InquiryDialog
          isOpen={inquiryOpen}
          onClose={() => setInquiryOpen(false)}
          lang={lang}
          projectName={lang === "en" ? selectedInquiryProject.titleEn : selectedInquiryProject.titleBn}
          projectType={
            selectedInquiryProject.type === "apartment"
              ? t.projects.types.apartment
              : selectedInquiryProject.type === "land"
              ? t.projects.types.land
              : t.projects.types.commercial
          }
        />
      )}
    </div>
  );
}
