import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/mongodb";
import { COLLECTIONS, MongoReel } from "@/lib/models";
import { reelsData } from "@/data/reelsData";

import { execFile } from "child_process";
import path from "path";
import util from "util";

const execFileAsync = util.promisify(execFile);

export const dynamic = "force-dynamic";

export async function verifyAdminAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === "manam_authenticated_admin";
}

// GET /api/admin/reels
export async function GET() {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Please log in as admin." },
      { status: 401 }
    );
  }

  try {
    const db = await getDatabase();
    const collection = db.collection<MongoReel>(COLLECTIONS.REELS);

    const count = await collection.countDocuments();
    if (count === 0) {
      const initialReels = reelsData.map((r, i) => ({
        ...r,
        order: r.order ?? i + 1,
        isActive: r.isActive ?? true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      await collection.insertMany(initialReels);
    }

    const docs = await collection.find({}).sort({ order: 1 }).toArray();
    const plainDocs = JSON.parse(JSON.stringify(docs));

    return NextResponse.json({ success: true, reels: plainDocs });
  } catch (error) {
    console.error("Admin reels GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch reels." },
      { status: 500 }
    );
  }
}

// POST /api/admin/reels
export async function POST(req: NextRequest) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Please log in as admin." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { title, caption, videoUrl, thumbnailUrl, instagramUrl, order, isActive, duration } = body;

    let finalTitle = (title || "").trim();
    let finalCaption = (caption || "").trim();
    let finalVideoUrl = (videoUrl || "").trim();
    let finalThumbnailUrl = (thumbnailUrl || "").trim();
    let finalDuration = duration || "0:45";
    let finalViewsCount = "2.5k";

    // If no direct videoUrl provided, auto-import from Instagram URL
    if (!finalVideoUrl && instagramUrl && instagramUrl.includes("instagram.com")) {
      try {
        const scriptPath = path.join(process.cwd(), "scripts", "import_reel.py");
        const targetFolder = path.join(process.cwd(), "public", "uploads", "reels");
        const { stdout } = await execFileAsync("python", [scriptPath, instagramUrl.trim()], {
          timeout: 120000,
        });
        if (stdout && stdout.trim()) {
          const imported = JSON.parse(stdout.trim());
          if (imported.success) {
            finalVideoUrl = imported.videoUrl;
            finalThumbnailUrl = imported.thumbnailUrl || finalThumbnailUrl;
            if (!finalTitle) finalTitle = imported.title;
            if (!finalCaption) finalCaption = imported.caption;
            if (imported.duration) finalDuration = imported.duration;
            if (imported.viewsCount) finalViewsCount = imported.viewsCount;
          }
        }
      } catch (importErr) {
        console.error("Auto-import failed:", importErr);
      }
    }

    if (!finalVideoUrl) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Reel video URL or uploaded video is required. If providing an Instagram link, please ensure it is accessible.",
        },
        { status: 400 }
      );
    }

    if (!finalTitle) {
      finalTitle = "Instagram Reel by Dr. Bhoomi Raval";
    }

    const db = await getDatabase();
    const collection = db.collection<MongoReel>(COLLECTIONS.REELS);

    let nextOrder = Number(order);
    if (isNaN(nextOrder) || nextOrder <= 0) {
      const highest = await collection
        .find({})
        .sort({ order: -1 })
        .limit(1)
        .toArray();
      nextOrder = highest.length > 0 && highest[0].order ? highest[0].order + 1 : 1;
    }

    const newReel: MongoReel = {
      title: finalTitle,
      caption: finalCaption,
      videoUrl: finalVideoUrl,
      thumbnailUrl: finalThumbnailUrl || undefined,
      instagramUrl: (instagramUrl || "").trim() || "https://www.instagram.com/manam_mentalhealth/reels/",
      order: nextOrder,
      isActive: isActive !== false,
      duration: finalDuration,
      viewsCount: finalViewsCount,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await collection.insertOne(newReel);

    return NextResponse.json({
      success: true,
      reel: { ...newReel, _id: result.insertedId.toString() },
      message: "Reel added successfully!",
    });
  } catch (error) {
    console.error("Admin reels POST error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add reel." },
      { status: 500 }
    );
  }
}

// PUT /api/admin/reels
export async function PUT(req: NextRequest) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Please log in as admin." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { _id, id, title, caption, videoUrl, thumbnailUrl, instagramUrl, order, isActive, duration } = body;
    const targetId = _id || id;

    if (!targetId) {
      return NextResponse.json(
        { success: false, message: "Reel ID is required for update." },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const collection = db.collection<MongoReel>(COLLECTIONS.REELS);

    const updateFields: Partial<MongoReel> = {
      updatedAt: new Date().toISOString(),
    };

    if (title !== undefined) updateFields.title = title.trim();
    if (caption !== undefined) updateFields.caption = caption.trim();
    if (videoUrl !== undefined) updateFields.videoUrl = videoUrl.trim();
    if (thumbnailUrl !== undefined) updateFields.thumbnailUrl = thumbnailUrl.trim();
    if (instagramUrl !== undefined) updateFields.instagramUrl = instagramUrl.trim();
    if (order !== undefined) updateFields.order = Number(order) || 1;
    if (isActive !== undefined) updateFields.isActive = Boolean(isActive);
    if (duration !== undefined) updateFields.duration = duration;

    await collection.updateOne(
      { _id: new ObjectId(targetId) } as any,
      { $set: updateFields }
    );

    return NextResponse.json({
      success: true,
      message: "Reel updated successfully!",
    });
  } catch (error) {
    console.error("Admin reels PUT error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update reel." },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/reels
export async function DELETE(req: NextRequest) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Please log in as admin." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Reel ID is required for deletion." },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const collection = db.collection<MongoReel>(COLLECTIONS.REELS);

    await collection.deleteOne({ _id: new ObjectId(id) } as any);

    return NextResponse.json({
      success: true,
      message: "Reel deleted successfully!",
    });
  } catch (error) {
    console.error("Admin reels DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete reel." },
      { status: 500 }
    );
  }
}
