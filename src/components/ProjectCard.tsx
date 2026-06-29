"use client";

import Image from "next/image";
import { Language, translations } from "@/utils/translations";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Layout, Calendar, Layers } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  lang: Language;
  onInquire: (project: Project) => void;
}

export default function ProjectCard({ project, lang, onInquire }: ProjectCardProps) {
  const t = translations[lang];

  // Helper values
  const title = lang === "en" ? project.title_en : project.title_bn;
  const location = lang === "en" ? project.location_en : project.location_bn;
  const size = lang === "en" ? project.size_en : project.size_bn;
  const price = lang === "en" ? project.price_en : project.price_bn;

  const statusLabels = {
    ongoing: t.projects.status.ongoing,
    upcoming: t.projects.status.upcoming,
    completed: t.projects.status.completed,
  };

  const statusColors = {
    ongoing: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
    upcoming: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
    completed: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
  };

  const typeLabels = {
    apartment: t.projects.types.apartment,
    land: t.projects.types.land,
    commercial: t.projects.types.commercial,
  };

  return (
    <Card className="bg-card border-border text-foreground overflow-hidden flex flex-col group hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-emerald-950/10 dark:hover:shadow-emerald-950/25 hover:-translate-y-1">
      {/* Project Image & Badge */}
      <div className="relative h-64 w-full overflow-hidden shrink-0">
        <Image
          src={project.image_url || "/images/placeholder.png"}
          alt={title}
          fill
          sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          priority={false}
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${statusColors[project.status]}`}>
            {statusLabels[project.status]}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-slate-800/80 uppercase tracking-widest w-fit">
            {typeLabels[project.type]}
          </span>
        </div>
      </div>

      <CardHeader className="p-6 pb-0 flex-1">
        {/* Title */}
        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white line-clamp-1 mb-2 font-sans group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
          {title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-4">
          <MapPin className="h-3.5 w-3.5 mr-1 text-emerald-500 dark:text-emerald-400 shrink-0" />
          <span className="line-clamp-1">{location}</span>
        </div>

        {/* Specs Details */}
        <div className="grid grid-cols-2 gap-y-3.5 gap-x-2 border-t border-slate-200 dark:border-slate-800/60 pt-4 text-xs">
          <div className="flex items-center space-x-2">
            <Layout className="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0" />
            <div>
              <span className="block text-[10px] text-slate-500 font-semibold uppercase tracking-wider leading-none mb-1">
                {t.projects.type}
              </span>
              <span className="text-slate-700 dark:text-slate-300 font-medium">{typeLabels[project.type]}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Layers className="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0" />
            <div>
              <span className="block text-[10px] text-slate-500 font-semibold uppercase tracking-wider leading-none mb-1">
                {t.projects.size}
              </span>
              <span className="text-slate-700 dark:text-slate-300 font-medium">{size}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 col-span-2">
            <Calendar className="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0" />
            <div>
              <span className="block text-[10px] text-slate-500 font-semibold uppercase tracking-wider leading-none mb-1">
                {t.projects.price}
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">{price}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 pt-4 pb-0">
        {/* Short bullet features */}
        <div className="flex flex-wrap gap-1.5">
          {(lang === "en" ? project.features_en : project.features_bn).slice(0, 2).map((feat, idx) => (
            <span
              key={idx}
              className="text-[10px] bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded"
            >
              {feat}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-6">
        <Button
          onClick={() => onInquire(project)}
          className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 dark:hover:bg-emerald-500 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-white border border-slate-200 dark:border-slate-700/60 hover:border-emerald-500 dark:hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
        >
          {t.projects.viewDetails}
        </Button>
      </CardFooter>
    </Card>
  );
}
