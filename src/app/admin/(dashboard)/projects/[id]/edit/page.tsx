import { createAdminClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ProjectForm from "../../ProjectForm";
import type { Project } from "@/types";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createAdminClient();

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">প্রজেক্ট সম্পাদনা করুন</h1>
        <p className="text-slate-400 text-sm mt-1">
          প্রজেক্টের তথ্য পরিবর্তন করে সংরক্ষণ করুন।
        </p>
      </div>

      <div className="max-w-4xl">
        <ProjectForm mode="edit" initialData={project as Project} />
      </div>
    </div>
  );
}
