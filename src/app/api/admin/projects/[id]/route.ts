import { createAdminClient } from "@/lib/supabase/server";

async function getAuthenticatedAdmin() {
  const supabase = await createAdminClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return { supabase: null, user: null };
  return { supabase, user };
}

// PUT /api/admin/projects/[id] — update project (auth required)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { supabase, user } = await getAuthenticatedAdmin();
    if (!user || !supabase) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const { data, error } = await supabase
      .from("projects")
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating project:", error);
      return Response.json({ error: "Failed to update project" }, { status: 500 });
    }

    return Response.json({ data });
  } catch (err) {
    console.error("Unexpected error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/admin/projects/[id] — delete project (auth required)
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { supabase, user } = await getAuthenticatedAdmin();
    if (!user || !supabase) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting project:", error);
      return Response.json({ error: "Failed to delete project" }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Unexpected error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
