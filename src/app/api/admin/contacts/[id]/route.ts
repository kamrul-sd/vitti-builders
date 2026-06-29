import { createAdminClient } from "@/lib/supabase/server";

// PUT /api/admin/contacts/[id] — update read status
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createAdminClient();

    // Verify session
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { is_read } = await request.json();

    const { data, error } = await supabase
      .from("contacts")
      .update({ is_read })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating contact:", error);
      return Response.json({ error: "Failed to update contact" }, { status: 500 });
    }

    return Response.json({ data });
  } catch (err) {
    console.error("Unexpected error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
