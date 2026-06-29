"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Building2,
  LayoutDashboard,
  FolderOpen,
  MessageSquare,
  Phone,
  LogOut,
  Plus,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "ড্যাশবোর্ড", icon: LayoutDashboard, exact: true },
  { href: "/admin/projects", label: "প্রজেক্টসমূহ", icon: FolderOpen, exact: false },
  { href: "/admin/inquiries", label: "অনুসন্ধান", icon: MessageSquare, exact: false },
  { href: "/admin/contacts", label: "যোগাযোগ / JV", icon: Phone, exact: false },
];

export default function AdminNav({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <Building2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="font-bold text-white text-sm">Vitti Builders</span>
              <span className="block text-[10px] text-emerald-400 font-semibold uppercase tracking-widest">
                Admin Panel
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin/projects/new"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:block">নতুন প্রজেক্ট</span>
            </Link>

            <div className="hidden sm:block text-xs text-slate-500 truncate max-w-[120px]">
              {userEmail}
            </div>

            <button
              id="admin-logout-btn"
              onClick={handleLogout}
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="লগআউট"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
