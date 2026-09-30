import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/models";

async function verifyAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === "manam_authenticated_admin";
}

// GET all blogs
export async function GET() {
  try {
    const db = await getDatabase();
    const blogs = await db
      .collection(COLLECTIONS.BLOGS)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    console.error("Blogs GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST create new blog post
export async function POST(req: NextRequest) {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      slug,
      title,
      excerpt,
      category,
      image,
      readTime,
      publishedDate,
      author,
      tags,
      keyTakeaways,
      content,
      clinicalAdvice,
    } = body;

    if (!title || !category || !image) {
      return NextResponse.json(
        { success: false, message: "Missing required fields (title, category, image)" },
        { status: 400 }
      );
    }

    // Auto-generate slug if not provided
    const generatedSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const db = await getDatabase();
    const now = new Date().toISOString();

    const newBlog = {
      slug: generatedSlug,
      title,
      excerpt: excerpt || "",
      category,
      image,
      readTime: readTime || "5 min read",
      publishedDate:
        publishedDate ||
        new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        }),
      author: author || {
        name: "Dr. Bhoomi Raval",
        role: "Consultant Psychiatrist (Gold Medalist)",
        avatar: "/assets/dr_bhoomi_raval.webp",
      },
      tags: Array.isArray(tags) ? tags : (tags || "").split(",").map((t: string) => t.trim()).filter(Boolean),
      keyTakeaways: Array.isArray(keyTakeaways) ? keyTakeaways : [keyTakeaways].filter(Boolean),
      content: Array.isArray(content) ? content : [],
      clinicalAdvice: clinicalAdvice || "",
      createdAt: now,
      updatedAt: now,
    };

    const result = await db.collection(COLLECTIONS.BLOGS).insertOne(newBlog);

    return NextResponse.json({
      success: true,
      blog: { ...newBlog, _id: result.insertedId },
      message: "Blog post published successfully",
    });
  } catch (error) {
    console.error("Blogs POST error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create blog post" },
      { status: 500 }
    );
  }
}

// PUT update blog post
export async function PUT(req: NextRequest) {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { _id, ...updates } = body;

    if (!_id) {
      return NextResponse.json({ success: false, message: "Missing _id" }, { status: 400 });
    }

    const db = await getDatabase();
    updates.updatedAt = new Date().toISOString();

    const filter = ObjectId.isValid(_id) ? { _id: new ObjectId(_id) } : { _id };

    await db.collection(COLLECTIONS.BLOGS).updateOne(filter as any, { $set: updates });

    return NextResponse.json({
      success: true,
      message: "Blog post updated successfully",
    });
  } catch (error) {
    console.error("Blogs PUT error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

// DELETE blog post
export async function DELETE(req: NextRequest) {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "Missing id parameter" }, { status: 400 });
    }

    const db = await getDatabase();
    const filter = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };

    await db.collection(COLLECTIONS.BLOGS).deleteOne(filter as any);

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    console.error("Blogs DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
