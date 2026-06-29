import ProjectForm from "../ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">নতুন প্রজেক্ট তৈরি করুন</h1>
        <p className="text-slate-400 text-sm mt-1">
          সব তথ্য পূরণ করে নতুন প্রজেক্ট পাবলিশ করুন।
        </p>
      </div>

      <div className="max-w-4xl">
        <ProjectForm mode="new" />
      </div>
    </div>
  );
}
