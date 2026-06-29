import { createClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";

// GET /api/projects — fetch all published projects
// Optional query params: ?status=ongoing&type=apartment
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = request.nextUrl;
    const status = searchParams.get("status");
    const type = searchParams.get("type");

    let query = supabase
      .from("projects")
      .select("*")
      .eq("is_published", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (status && status !== "all") {
      query = query.eq("status", status);
    }
    if (type && type !== "all") {
      query = query.eq("type", type);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching projects:", error);
      return Response.json({ error: "Failed to fetch projects" }, { status: 500 });
    }

    return Response.json({ data });
  } catch (err) {
    console.error("Unexpected error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
