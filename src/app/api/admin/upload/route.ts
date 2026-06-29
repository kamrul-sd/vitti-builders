import { createAdminClient } from "@/lib/supabase/server";

// POST /api/admin/upload — upload project image to Supabase Storage
export async function POST(request: Request) {
  try {
    const supabase = await createAdminClient();

    // Verify session
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      return Response.json({ error: "Only JPEG, PNG, and WebP images are allowed" }, { status: 400 });
    }

    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      return Response.json({ error: "File size must be under 5MB" }, { status: 400 });
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `project-${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("project-images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (error) {
      console.error("Storage upload error:", error);
      return Response.json({ error: "Failed to upload image" }, { status: 500 });
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from("project-images")
      .getPublicUrl(data.path);

    return Response.json({ url: publicUrl }, { status: 201 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
