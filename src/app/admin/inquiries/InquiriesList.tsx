"use client";

import { useState } from "react";
import type { Inquiry } from "@/types";
import { CheckCircle2, Circle, Mail, Phone, Calendar, MessageSquare } from "lucide-react";

export default function InquiriesList({ initialInquiries }: { initialInquiries: Inquiry[] }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const toggleReadStatus = async (id: string, currentStatus: boolean) => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_read: !currentStatus }),
      });

      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, is_read: !currentStatus } : inq))
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

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      {inquiries.length > 0 ? (
        <div className="divide-y divide-slate-800">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className={`p-6 transition-colors ${
                inq.is_read ? "bg-slate-900/40" : "bg-slate-800/20"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                {/* Details */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-white text-base">
                      {inq.name}
                    </span>
                    {!inq.is_read && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                        নতুন
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-slate-400 text-xs font-medium">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      {inq.phone}
                    </span>
                    {inq.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        {inq.email}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {new Date(inq.created_at).toLocaleString("bn-BD")}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    <MessageSquare className="w-3.5 h-3.5" />
                    প্রজেক্ট: {inq.project_name || "General"}
                  </div>

                  {inq.message && (
                    <div className="text-slate-300 text-sm mt-3 bg-slate-950/50 p-4 rounded-xl border border-slate-800/60 leading-relaxed max-w-2xl whitespace-pre-line">
                      {inq.message}
                    </div>
                  )}
                </div>

                {/* Mark as read toggle */}
                <button
                  onClick={() => toggleReadStatus(inq.id, inq.is_read)}
                  disabled={loadingId === inq.id}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all shrink-0 self-start ${
                    inq.is_read
                      ? "bg-slate-950 hover:bg-slate-800 text-slate-500 border-slate-800"
                      : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20 hover:border-emerald-500/40"
                  }`}
                >
                  {inq.is_read ? (
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
          কোনো অনুসন্ধানের তথ্য পাওয়া যায়নি।
        </div>
      )}
    </div>
  );
}
