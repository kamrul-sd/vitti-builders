import { createAdminClient } from "@/lib/supabase/server";
import ContactsList from "./ContactsList";
import type { Contact } from "@/types";

export default async function AdminContactsPage() {
  const supabase = await createAdminClient();
  const { data: contacts, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">যোগাযোগ ও প্রস্তাবনাসমূহ</h1>
        <p className="text-slate-400 text-sm mt-1">
          কাস্টমারদের সাধারণ যোগাযোগ এবং জমির মালিকদের যৌথ উদ্যোগ (JV) প্রস্তাবনার তালিকা।
        </p>
      </div>

      {error && (
        <div className="px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
          তথ্যের তালিকা লোড করতে সমস্যা হয়েছে।
        </div>
      )}

      <ContactsList initialContacts={(contacts || []) as Contact[]} />
    </div>
  );
}
