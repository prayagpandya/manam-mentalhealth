import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/models";
import { blogsData } from "@/data/blogsData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDatabase();
    const blogs = await db
      .collection(COLLECTIONS.BLOGS)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    if (blogs && blogs.length > 0) {
      return NextResponse.json({ success: true, blogs });
    }
    return NextResponse.json({ success: true, blogs: blogsData });
  } catch (error) {
    console.error("Public Blogs GET error (falling back to static):", error);
    return NextResponse.json({ success: true, blogs: blogsData });
  }
}
