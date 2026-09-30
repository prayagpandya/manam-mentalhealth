import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/models";
import { servicesData } from "@/data/servicesData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDatabase();
    const treatments = await db
      .collection(COLLECTIONS.TREATMENTS)
      .find({})
      .sort({ num: 1 })
      .toArray();

    if (treatments && treatments.length > 0) {
      return NextResponse.json({ success: true, treatments, services: treatments });
    }
    return NextResponse.json({ success: true, treatments: servicesData, services: servicesData });
  } catch (error) {
    console.error("Public Treatments GET error (falling back to static):", error);
    return NextResponse.json({ success: true, treatments: servicesData, services: servicesData });
  }
}
