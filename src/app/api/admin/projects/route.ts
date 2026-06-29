import { createAdminClient } from "@/lib/supabase/server";
import type { CreateProjectInput } from "@/types";

// POST /api/admin/projects — create new project (auth required)
export async function POST(request: Request) {
  try {
    const supabase = await createAdminClient();

    // Verify session
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: CreateProjectInput = await request.json();

    // Validate required fields
    if (!body.title_en || !body.title_bn || !body.type || !body.status) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("projects")
      .insert([{
        ...body,
        features_en: body.features_en ?? [],
        features_bn: body.features_bn ?? [],
        is_published: body.is_published ?? true,
        display_order: body.display_order ?? 0,
      }])
      .select()
      .single();

    if (error) {
      console.error("Error creating project:", error);
      return Response.json({ error: "Failed to create project" }, { status: 500 });
    }

    return Response.json({ data }, { status: 201 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
