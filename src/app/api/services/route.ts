import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/models";
import { servicesData } from "@/data/servicesData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDatabase();
    const services = await db
      .collection(COLLECTIONS.SERVICES)
      .find({})
      .sort({ num: 1 })
      .toArray();

    if (services && services.length > 0) {
      return NextResponse.json({ success: true, services });
    }
    return NextResponse.json({ success: true, services: servicesData });
  } catch (error) {
    console.error("Public Services GET error (falling back to static):", error);
    return NextResponse.json({ success: true, services: servicesData });
  }
}
