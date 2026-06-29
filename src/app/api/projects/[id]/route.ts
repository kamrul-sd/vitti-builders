import { createClient } from "@/lib/supabase/server";

// GET /api/projects/[id] — fetch single project
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .eq("is_published", true)
      .single();

    if (error || !data) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    return Response.json({ data });
  } catch (err) {
    console.error("Unexpected error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
