import { createAdminClient } from "@/lib/supabase/server";
import Link from "next/link";
import { FolderOpen, MessageSquare, Phone, TrendingUp, Plus } from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createAdminClient();

  const [projectsRes, inquiriesRes, contactsRes, unreadInqRes, unreadConRes] =
    await Promise.all([
      supabase.from("projects").select("id", { count: "exact", head: true }),
      supabase.from("inquiries").select("id", { count: "exact", head: true }),
      supabase.from("contacts").select("id", { count: "exact", head: true }),
      supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("is_read", false),
      supabase.from("contacts").select("id", { count: "exact", head: true }).eq("is_read", false),
    ]);

  const stats = [
    {
      label: "মোট প্রজেক্ট",
      value: projectsRes.count ?? 0,
      icon: FolderOpen,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      href: "/admin/projects",
    },
    {
      label: "অনুসন্ধান",
      value: inquiriesRes.count ?? 0,
      unread: unreadInqRes.count ?? 0,
      icon: MessageSquare,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      href: "/admin/inquiries",
    },
    {
      label: "যোগাযোগ / JV",
      value: contactsRes.count ?? 0,
      unread: unreadConRes.count ?? 0,
      icon: Phone,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      href: "/admin/contacts",
    },
  ];

  // Recent inquiries
  const { data: recentInquiries } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">ড্যাশবোর্ড</h1>
          <p className="text-slate-400 text-sm mt-1">Vitti Builders Admin Panel</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          নতুন প্রজেক্ট
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              {stat.unread ? (
                <span className="px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
                  {stat.unread} নতুন
                </span>
              ) : null}
            </div>
            <div className="text-3xl font-bold text-white">{stat.value}</div>
            <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent Inquiries */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h2 className="font-semibold text-white">সাম্প্রতিক অনুসন্ধান</h2>
          </div>
          <Link href="/admin/inquiries" className="text-xs text-emerald-400 hover:underline">
            সব দেখুন →
          </Link>
        </div>

        {recentInquiries && recentInquiries.length > 0 ? (
          <div className="divide-y divide-slate-800">
            {recentInquiries.map((inq) => (
              <div key={inq.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white text-sm">{inq.name}</span>
                    {!inq.is_read && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    📞 {inq.phone} · {inq.project_name || "General"}
                  </div>
                </div>
                <div className="text-xs text-slate-500">
                  {new Date(inq.created_at).toLocaleDateString("bn-BD")}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-12 text-center text-slate-500 text-sm">
            এখনো কোনো অনুসন্ধান আসেনি।
          </div>
        )}
      </div>
    </div>
  );
}
