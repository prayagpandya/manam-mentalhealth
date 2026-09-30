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

// GET all services
export async function GET() {
  try {
    const db = await getDatabase();
    const services = await db
      .collection(COLLECTIONS.SERVICES)
      .find({})
      .sort({ num: 1 })
      .toArray();

    return NextResponse.json({ success: true, services });
  } catch (error) {
    console.error("Services GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

// PUT update service details (by slug or _id)
export async function PUT(req: NextRequest) {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { slug, _id, ...updates } = body;

    if (!slug && !_id) {
      return NextResponse.json(
        { success: false, message: "Missing slug or _id to identify service" },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    updates.updatedAt = new Date().toISOString();

    let query: Record<string, unknown> = {};
    if (_id) {
      try {
        query = { _id: new ObjectId(_id) };
      } catch {
        query = { _id };
      }
    } else if (slug) {
      query = { slug };
    }

    const result = await db.collection(COLLECTIONS.SERVICES).updateOne(query as any, { $set: updates });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Service updated successfully",
    });
  } catch (error) {
    console.error("Services PUT error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update service" },
      { status: 500 }
    );
  }
}
