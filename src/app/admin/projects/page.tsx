import { createAdminClient } from "@/lib/supabase/server";
import Link from "next/link";
import DeleteProjectButton from "./DeleteProjectButton";
import { Plus, Pencil } from "lucide-react";
import type { Project } from "@/types";

const statusLabel: Record<string, string> = {
  ongoing: "চলমান",
  upcoming: "আসন্ন",
  completed: "সম্পন্ন",
};
const statusColor: Record<string, string> = {
  ongoing: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  upcoming: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  completed: "text-blue-400 bg-blue-500/10 border-blue-500/20",
};

export default async function AdminProjectsPage() {
  const supabase = await createAdminClient();
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">প্রজেক্টসমূহ</h1>
          <p className="text-slate-400 text-sm mt-1">
            মোট {projects?.length ?? 0}টি প্রজেক্ট
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          নতুন প্রজেক্ট
        </Link>
      </div>

      {error && (
        <div className="px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
          প্রজেক্ট লোড করতে সমস্যা হয়েছে।
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {projects && projects.length > 0 ? (
          <div className="divide-y divide-slate-800">
            {projects.map((project: Project) => (
              <div
                key={project.id}
                className="flex items-center gap-4 px-6 py-4 hover:bg-slate-800/50 transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-800 shrink-0">
                  {project.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.image_url}
                      alt={project.title_en}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">
                      No Image
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-white text-sm truncate">
                      {project.title_en}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${statusColor[project.status]}`}
                    >
                      {statusLabel[project.status]}
                    </span>
                    {!project.is_published && (
                      <span className="px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-700/50 border-slate-600">
                        Draft
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 truncate">
                    {project.location_en}
                  </div>
                  <div className="text-xs text-emerald-400 font-medium mt-0.5">
                    {project.price_en}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors border border-slate-700"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                  </Link>
                  <DeleteProjectButton projectId={project.id} projectName={project.title_en} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="text-slate-500 text-sm mb-4">কোনো প্রজেক্ট নেই।</div>
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              প্রথম প্রজেক্ট যোগ করুন
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
