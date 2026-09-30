import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { COLLECTIONS, MongoReel } from "@/lib/models";
import { reelsData } from "@/data/reelsData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection<MongoReel>(COLLECTIONS.REELS);

    const count = await collection.countDocuments();
    const hasOldPlaceholders = await collection.findOne({
      videoUrl: { $regex: "reel_1\\.webm" },
    });

    if (count === 0 || hasOldPlaceholders) {
      if (hasOldPlaceholders) {
        await collection.deleteMany({
          videoUrl: { $regex: "reel_[0-9]\\.webm" },
        });
      }
      // Seed authentic Dr. Bhoomi reels into MongoDB
      const initialReels = reelsData.map((r, i) => ({
        ...r,
        order: r.order ?? i + 1,
        isActive: r.isActive ?? true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      await collection.insertMany(initialReels);
    }

    const docs = await collection
      .find({ isActive: { $ne: false } })
      .sort({ order: 1 })
      .toArray();

    const plainReels = JSON.parse(JSON.stringify(docs));
    return NextResponse.json({ success: true, reels: plainReels });
  } catch (error) {
    console.error("Error fetching reels from DB:", error);
    return NextResponse.json({
      success: true,
      reels: reelsData,
      fallback: true,
    });
  }
}
