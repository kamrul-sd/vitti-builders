import { createClient } from "@/lib/supabase/server";
import type { CreateContactInput } from "@/types";

// POST /api/contacts — submit contact form or JV proposal (public)
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body: CreateContactInput = await request.json();

    // Validate required fields
    if (!body.name || !body.phone || !body.type) {
      return Response.json({ error: "Name, phone, and type are required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("contacts")
      .insert([{
        type: body.type,
        name: body.name.trim(),
        phone: body.phone.trim(),
        email: body.email?.trim() ?? "",
        // contact form
        interest: body.interest?.trim() ?? "",
        message: body.message?.trim() ?? "",
        // JV proposal
        land_location: body.land_location?.trim() ?? "",
        land_size: body.land_size?.trim() ?? "",
        road_width: body.road_width?.trim() ?? "",
        notes: body.notes?.trim() ?? "",
      }])
      .select()
      .single();

    if (error) {
      console.error("Error saving contact:", error);
      return Response.json({ error: "Failed to submit" }, { status: 500 });
    }

    return Response.json({ data, success: true }, { status: 201 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
