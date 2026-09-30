import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/models";
import { initialGalleryItems } from "@/data/galleryData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDatabase();
    const items = await db
      .collection(COLLECTIONS.GALLERY)
      .find({})
      .sort({ order: 1, createdAt: 1 })
      .toArray();

    if (items && items.length > 0) {
      return NextResponse.json({ success: true, items });
    }
    return NextResponse.json({ success: true, items: initialGalleryItems });
  } catch (error) {
    console.error("Public Gallery GET error (falling back to static):", error);
    return NextResponse.json({ success: true, items: initialGalleryItems });
  }
}
