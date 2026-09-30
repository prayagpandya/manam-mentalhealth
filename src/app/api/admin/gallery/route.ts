import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/models";

async function verifyAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === "manam_authenticated_admin";
}

// GET all gallery items
export async function GET() {
  try {
    const db = await getDatabase();
    const items = await db
      .collection(COLLECTIONS.GALLERY)
      .find({})
      .sort({ order: 1, createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error("Gallery GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch gallery items" },
      { status: 500 }
    );
  }
}

// POST create gallery item
export async function POST(req: NextRequest) {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { src, location, order } = body;

    if (!src) {
      return NextResponse.json(
        { success: false, message: "Missing required photo (.webp)" },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const now = new Date().toISOString();
    const newItem = {
      src,
      location: (location || "").trim(),
      order: Number(order) || 99,
      createdAt: now,
      updatedAt: now,
    };

    const result = await db.collection(COLLECTIONS.GALLERY).insertOne(newItem);

    try {
      revalidatePath("/gallery");
      revalidatePath("/");
    } catch (e) {
      console.error("Revalidate path error:", e);
    }

    return NextResponse.json({
      success: true,
      item: { ...newItem, _id: result.insertedId },
      message: "Gallery photo added successfully",
    });
  } catch (error) {
    console.error("Gallery POST error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create gallery item" },
      { status: 500 }
    );
  }
}

// PUT update gallery item
export async function PUT(req: NextRequest) {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { _id, src, location, order } = body;

    if (!_id) {
      return NextResponse.json({ success: false, message: "Missing _id" }, { status: 400 });
    }

    const db = await getDatabase();
    const updates: Record<string, unknown> = {
      updatedAt: new Date().toISOString(),
    };

    if (src !== undefined) updates.src = src;
    if (location !== undefined) updates.location = location.trim();
    if (order !== undefined) updates.order = Number(order) || 0;

    const filter = ObjectId.isValid(_id) ? { _id: new ObjectId(_id) } : { _id };

    await db.collection(COLLECTIONS.GALLERY).updateOne(
      filter as any,
      {
        $set: updates,
        $unset: { title: "", category: "", categoryLabel: "", desc: "" },
      }
    );

    try {
      revalidatePath("/gallery");
      revalidatePath("/");
    } catch (e) {
      console.error("Revalidate path error:", e);
    }

    return NextResponse.json({
      success: true,
      message: "Gallery photo updated successfully",
    });
  } catch (error) {
    console.error("Gallery PUT error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update gallery item" },
      { status: 500 }
    );
  }
}

// DELETE gallery item
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

    await db.collection(COLLECTIONS.GALLERY).deleteOne(filter as any);

    try {
      revalidatePath("/gallery");
      revalidatePath("/");
    } catch (e) {
      console.error("Revalidate path error:", e);
    }

    return NextResponse.json({
      success: true,
      message: "Gallery photo deleted successfully",
    });
  } catch (error) {
    console.error("Gallery DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete gallery item" },
      { status: 500 }
    );
  }
}
