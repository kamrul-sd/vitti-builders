"use client";

import { useState } from "react";
import type { Contact } from "@/types";
import { CheckCircle2, Circle, Mail, Phone, Calendar, BadgePercent, Building, Eye } from "lucide-react";

export default function ContactsList({ initialContacts }: { initialContacts: Contact[] }) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [filter, setFilter] = useState<"all" | "contact" | "jv_proposal">("all");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const toggleReadStatus = async (id: string, currentStatus: boolean) => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_read: !currentStatus }),
      });

      if (res.ok) {
        setContacts((prev) =>
          prev.map((c) => (c.id === id ? { ...c, is_read: !currentStatus } : c))
        );
      } else {
        alert("Failed to update status");
      }
    } catch {
      alert("Failed to update status");
    } finally {
      setLoadingId(null);
    }
  };

  const filteredContacts = contacts.filter((c) => {
    if (filter === "all") return true;
    return c.type === filter;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-2">
        {(
          [
            { value: "all", label: "সব বার্তা" },
            { value: "contact", label: "সাধারণ যোগাযোগ" },
            { value: "jv_proposal", label: "যৌথ উদ্যোগ (JV)" },
          ] as const
        ).map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
              filter === item.value
                ? "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/10"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {filteredContacts.length > 0 ? (
          <div className="divide-y divide-slate-800">
            {filteredContacts.map((c) => (
              <div
                key={c.id}
                className={`p-6 transition-colors ${
                  c.is_read ? "bg-slate-900/40" : "bg-slate-800/20"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-white text-base">
                        {c.name}
                      </span>
                      {!c.is_read && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                          নতুন
                        </span>
                      )}
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          c.type === "jv_proposal"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                            : "bg-slate-800 text-slate-300 border-slate-700"
                        }`}
                      >
                        {c.type === "jv_proposal" ? "Joint Venture" : "Contact"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-slate-400 text-xs font-medium">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        {c.phone}
                      </span>
                      {c.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-slate-500" />
                          {c.email}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        {new Date(c.created_at).toLocaleString("bn-BD")}
                      </span>
                    </div>

                    {c.type === "contact" ? (
                      /* Contact Form Message */
                      <div className="space-y-2">
                        {c.interest && (
                          <div className="text-xs text-slate-400">
                            আগ্রহী: <span className="text-emerald-400 font-semibold">{c.interest}</span>
                          </div>
                        )}
                        {c.message && (
                          <div className="text-slate-300 text-sm bg-slate-950/50 p-4 rounded-xl border border-slate-800/60 leading-relaxed max-w-2xl whitespace-pre-line">
                            {c.message}
                          </div>
                        )}
                      </div>
                    ) : (
                      /* JV Proposal Details */
                      <div className="space-y-3 pt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl bg-slate-950/50 p-4 rounded-xl border border-slate-800/60 text-xs">
                          <div>
                            <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">
                              জমির অবস্থান
                            </span>
                            <span className="text-slate-300 font-medium">{c.land_location}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">
                              জমির পরিমাণ
                            </span>
                            <span className="text-slate-300 font-medium">{c.land_size}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">
                              রাস্তার প্রশস্ততা
                            </span>
                            <span className="text-slate-300 font-medium">{c.road_width}</span>
                          </div>
                        </div>
                        {c.notes && (
                          <div className="text-slate-300 text-sm bg-slate-950/30 p-4 rounded-xl border border-slate-800/40 leading-relaxed max-w-2xl whitespace-pre-line">
                            <strong>অতিরিক্ত বিবরণ:</strong> {c.notes}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Mark as read toggle */}
                  <button
                    onClick={() => toggleReadStatus(c.id, c.is_read)}
                    disabled={loadingId === c.id}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all shrink-0 self-start ${
                      c.is_read
                        ? "bg-slate-950 hover:bg-slate-800 text-slate-500 border-slate-800"
                        : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20 hover:border-emerald-500/40"
                    }`}
                  >
                    {c.is_read ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        পঠিত (Mark Unread)
                      </>
                    ) : (
                      <>
                        <Circle className="w-4 h-4" />
                        পঠিত চিহ্নিত করুন
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-slate-500 text-sm">
            কোনো বার্তার তথ্য পাওয়া যায়নি।
          </div>
        )}
      </div>
    </div>
  );
}
