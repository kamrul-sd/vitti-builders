import { createAdminClient } from "@/lib/supabase/server";
import InquiriesList from "./InquiriesList";
import type { Inquiry } from "@/types";

export default async function AdminInquiriesPage() {
  const supabase = await createAdminClient();
  const { data: inquiries, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">অনুসন্ধানসমূহ</h1>
        <p className="text-slate-400 text-sm mt-1">
          কাস্টমারদের প্রজেক্ট অনুসন্ধান এবং অনুরোধের তালিকা।
        </p>
      </div>

      {error && (
        <div className="px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
          অনুসন্ধানের তথ্য লোড করতে সমস্যা হয়েছে।
        </div>
      )}

      <InquiriesList initialInquiries={(inquiries || []) as Inquiry[]} />
    </div>
  );
}
