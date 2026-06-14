"use client";

import { useState } from "react";
import { Language, translations } from "@/utils/translations";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2 } from "lucide-react";

interface InquiryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  projectName: string;
  projectType: string;
}

export default function InquiryDialog({
  isOpen,
  onClose,
  lang,
  projectName,
  projectType,
}: InquiryDialogProps) {
  const t = translations[lang];
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({ name: "", phone: "", email: "", message: "" });
        onClose();
      }, 2500);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] bg-slate-900 border border-slate-800 text-white shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <span>{t.inquiryModal.title}</span>
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-sm mt-1">
            {t.inquiryModal.subtitle} <strong className="text-emerald-400 font-semibold">{projectName}</strong> ({projectType}).
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <CheckCircle2 className="h-16 w-16 text-emerald-400 animate-bounce" />
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">
                {lang === "en" ? "Thank You!" : "ধন্যবাদ!"}
              </h3>
              <p className="text-sm text-slate-400 max-w-xs mx-auto">
                {t.inquiryModal.success}
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {lang === "en" ? "Full Name" : "পূর্ণ নাম"} <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="name"
                required
                placeholder={lang === "en" ? "e.g. John Doe" : "যেমন: আব্দুর রহমান"}
                className="bg-slate-950 border-slate-800 text-white placeholder-slate-600 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {lang === "en" ? "Phone Number" : "মোবাইল নম্বর"} <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="phone"
                  required
                  type="tel"
                  placeholder={lang === "en" ? "e.g. 017XXXXXXXX" : "যেমন: ০১৭XXXXXXXX"}
                  className="bg-slate-950 border-slate-800 text-white placeholder-slate-600 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {lang === "en" ? "Email Address" : "ইমেইল ঠিকানা"}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={lang === "en" ? "e.g. name@example.com" : "যেমন: name@example.com"}
                  className="bg-slate-950 border-slate-800 text-white placeholder-slate-600 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {lang === "en" ? "Additional Notes (Optional)" : "অতিরিক্ত তথ্য (ঐচ্ছিক)"}
              </Label>
              <Textarea
                id="message"
                placeholder={
                  lang === "en"
                    ? "Let us know any specific preferences (floor level, budget, etc.)."
                    : "আপনার কোনো নির্দিষ্ট পছন্দ থাকলে তা আমাদের জানান (ফ্লোর লেভেল, বাজেট ইত্যাদি)।"
                }
                rows={3}
                className="bg-slate-950 border-slate-800 text-white placeholder-slate-600 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 resize-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="text-slate-400 hover:text-white hover:bg-slate-800"
              >
                {lang === "en" ? "Cancel" : "বাতিল করুন"}
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 px-6 min-w-[120px] shadow-lg shadow-emerald-500/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    <span>...</span>
                  </>
                ) : (
                  t.inquiryModal.submit
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
