import { createClient } from "@/lib/supabase/server";
import type { CreateInquiryInput } from "@/types";

// POST /api/inquiries — submit a project inquiry (public)
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body: CreateInquiryInput = await request.json();

    // Validate required fields
    if (!body.name || !body.phone) {
      return Response.json({ error: "Name and phone are required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("inquiries")
      .insert([{
        project_id: body.project_id ?? null,
        project_name: body.project_name ?? "",
        name: body.name.trim(),
        phone: body.phone.trim(),
        email: body.email?.trim() ?? "",
        message: body.message?.trim() ?? "",
      }])
      .select()
      .single();

    if (error) {
      console.error("Error saving inquiry:", error);
      return Response.json({ error: "Failed to submit inquiry" }, { status: 500 });
    }

    return Response.json({ data, success: true }, { status: 201 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
