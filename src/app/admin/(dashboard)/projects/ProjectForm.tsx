"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/types";
import {
  Upload,
  X,
  Loader2,
  Plus,
  Trash2,
  ImageIcon,
} from "lucide-react";
import Image from "next/image";

interface ProjectFormProps {
  initialData?: Project;
  mode: "new" | "edit";
}

interface FormState {
  id?: string;
  title_en: string;
  title_bn: string;
  location_en: string;
  location_bn: string;
  type: Project["type"];
  status: Project["status"];
  size_en: string;
  size_bn: string;
  price_en: string;
  price_bn: string;
  image_url: string;
  features_en: string[];
  features_bn: string[];
  is_published: boolean;
  display_order: number;
}

const emptyForm: FormState = {
  title_en: "",
  title_bn: "",
  location_en: "",
  location_bn: "",
  type: "apartment",
  status: "ongoing",
  size_en: "",
  size_bn: "",
  price_en: "",
  price_bn: "",
  image_url: "",
  features_en: ["", "", "", ""],
  features_bn: ["", "", "", ""],
  is_published: true,
  display_order: 0,
};

export default function ProjectForm({ initialData, mode }: ProjectFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>(() => {
    if (initialData) {
      return {
        id: initialData.id,
        title_en: initialData.title_en || "",
        title_bn: initialData.title_bn || "",
        location_en: initialData.location_en || "",
        location_bn: initialData.location_bn || "",
        type: initialData.type || "apartment",
        status: initialData.status || "ongoing",
        size_en: initialData.size_en || "",
        size_bn: initialData.size_bn || "",
        price_en: initialData.price_en || "",
        price_bn: initialData.price_bn || "",
        image_url: initialData.image_url || "",
        features_en: [...(initialData.features_en || []), "", "", "", ""].slice(0, 4),
        features_bn: [...(initialData.features_bn || []), "", "", "", ""].slice(0, 4),
        is_published: initialData.is_published ?? true,
        display_order: initialData.display_order ?? 0,
      };
    }
    return emptyForm;
  });

  const [imagePreview, setImagePreview] = useState<string>(initialData?.image_url ?? "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) {
        setError(result.error ?? "Image upload failed");
        return;
      }

      setForm((prev) => ({ ...prev, image_url: result.url }));
      setImagePreview(result.url);
    } catch {
      setError("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const updateFeature = (
    lang: "en" | "bn",
    index: number,
    value: string
  ) => {
    const key = lang === "en" ? "features_en" : "features_bn";
    setForm((prev) => {
      const updated = [...prev[key]];
      updated[index] = value;
      return { ...prev, [key]: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const payload = {
        ...form,
        features_en: form.features_en.filter((f) => f.trim() !== ""),
        features_bn: form.features_bn.filter((f) => f.trim() !== ""),
      };

      const url =
        mode === "edit" && initialData
          ? `/api/admin/projects/${initialData.id}`
          : "/api/admin/projects";

      const res = await fetch(url, {
        method: mode === "edit" ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        setError(result.error ?? "Failed to save project");
        return;
      }

      router.push("/admin/projects");
      router.refresh();
    } catch {
      setError("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
          {error}
        </div>
      )}

      {/* Section: Basic Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
        <h2 className="font-semibold text-white text-base border-b border-slate-800 pb-3">
          মূল তথ্য
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="শিরোনাম (English)" required>
            <input
              type="text"
              required
              placeholder="e.g. Vitti Rose Garden"
              value={form.title_en}
              onChange={(e) => setForm({ ...form, title_en: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="শিরোনাম (বাংলা)" required>
            <input
              type="text"
              required
              placeholder="যেমন: ভিত্তি রোজ গার্ডেন"
              value={form.title_bn}
              onChange={(e) => setForm({ ...form, title_bn: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="অবস্থান (English)">
            <input
              type="text"
              placeholder="e.g. 17, West Shewrapara, Mirpur"
              value={form.location_en}
              onChange={(e) => setForm({ ...form, location_en: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="অবস্থান (বাংলা)">
            <input
              type="text"
              placeholder="যেমন: পশ্চিম শেওড়াপাড়া, মিরপুর"
              value={form.location_bn}
              onChange={(e) => setForm({ ...form, location_bn: e.target.value })}
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Field label="ধরণ" required>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as Project["type"] })}
              className={selectClass}
            >
              <option value="apartment">Apartment (আবাসিক)</option>
              <option value="land">Land Share (জমি)</option>
              <option value="commercial">Commercial (বাণিজ্যিক)</option>
            </select>
          </Field>
          <Field label="অবস্থা" required>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as Project["status"] })}
              className={selectClass}
            >
              <option value="ongoing">Ongoing (চলমান)</option>
              <option value="upcoming">Upcoming (আসন্ন)</option>
              <option value="completed">Completed (সম্পন্ন)</option>
            </select>
          </Field>
          <Field label="Display Order">
            <input
              type="number"
              min={0}
              value={form.display_order}
              onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      {/* Section: Pricing & Size */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
        <h2 className="font-semibold text-white text-base border-b border-slate-800 pb-3">
          সাইজ ও মূল্য
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Size (English)">
            <input
              type="text"
              placeholder="e.g. 1,450 - 1,850 SFT"
              value={form.size_en}
              onChange={(e) => setForm({ ...form, size_en: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="Size (বাংলা)">
            <input
              type="text"
              placeholder="যেমন: ১,৪৫০ - ১,৮৫০ বর্গফুট"
              value={form.size_bn}
              onChange={(e) => setForm({ ...form, size_bn: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="Price (English)">
            <input
              type="text"
              placeholder="e.g. Tk. 7,500 / SFT"
              value={form.price_en}
              onChange={(e) => setForm({ ...form, price_en: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="Price (বাংলা)">
            <input
              type="text"
              placeholder="যেমন: ৭,৫০০ টাকা / বর্গফুট"
              value={form.price_bn}
              onChange={(e) => setForm({ ...form, price_bn: e.target.value })}
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      {/* Section: Image Upload */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
        <h2 className="font-semibold text-white text-base border-b border-slate-800 pb-3">
          প্রজেক্ট ছবি
        </h2>
        <div className="space-y-4">
          {imagePreview ? (
            <div className="relative w-full h-56 rounded-xl overflow-hidden border border-slate-700">
              <Image
                src={imagePreview}
                alt="Project preview"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview("");
                  setForm((prev) => ({ ...prev, image_url: "" }));
                }}
                className="absolute top-2 right-2 p-1.5 bg-slate-900/80 rounded-lg text-slate-300 hover:text-rose-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full h-40 border-2 border-dashed border-slate-700 hover:border-emerald-500/50 rounded-xl flex flex-col items-center justify-center gap-3 text-slate-500 hover:text-slate-300 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
                  <span className="text-sm">আপলোড হচ্ছে...</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-10 h-10" />
                  <div className="text-center">
                    <div className="text-sm font-medium">ছবি আপলোড করুন</div>
                    <div className="text-xs mt-0.5">JPEG, PNG, WebP · সর্বোচ্চ 5MB</div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-medium">
                    <Upload className="w-3.5 h-3.5" />
                    ফাইল বেছে নিন
                  </div>
                </>
              )}
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>

      {/* Section: Features */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
        <h2 className="font-semibold text-white text-base border-b border-slate-800 pb-3">
          বৈশিষ্ট্যসমূহ (সর্বোচ্চ ৪টি)
        </h2>
        <div className="space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder={`Feature ${i + 1} (English)`}
                value={form.features_en[i] ?? ""}
                onChange={(e) => updateFeature("en", i, e.target.value)}
                className={inputClass}
              />
              <input
                type="text"
                placeholder={`বৈশিষ্ট্য ${i + 1} (বাংলা)`}
                value={form.features_bn[i] ?? ""}
                onChange={(e) => updateFeature("bn", i, e.target.value)}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Section: Visibility */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.is_published}
            onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
            className="w-4 h-4 accent-emerald-500"
          />
          <div>
            <div className="text-white font-medium text-sm">Published (প্রকাশিত)</div>
            <div className="text-slate-400 text-xs mt-0.5">
              Unchecked হলে website এ দেখা যাবে না (Draft হিসেবে থাকবে)
            </div>
          </div>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-medium transition-colors"
        >
          বাতিল
        </button>
        <button
          type="submit"
          id="save-project-btn"
          disabled={saving || uploading}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              সংরক্ষণ হচ্ছে...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              {mode === "edit" ? "আপডেট করুন" : "প্রজেক্ট যোগ করুন"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

// Helper Components
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        {label} {required && <span className="text-rose-400">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm";

const selectClass =
  "w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm appearance-none";
