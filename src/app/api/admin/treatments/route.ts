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

// GET all treatments
export async function GET() {
  try {
    const db = await getDatabase();
    const treatments = await db
      .collection(COLLECTIONS.TREATMENTS)
      .find({})
      .sort({ num: 1 })
      .toArray();

    return NextResponse.json({ success: true, treatments, services: treatments });
  } catch (error) {
    console.error("Treatments GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch treatments" },
      { status: 500 }
    );
  }
}

// POST create new treatment
export async function POST(req: NextRequest) {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      shortTitle,
      slug,
      num,
      tagline,
      category,
      image,
      altText,
      duration,
      format,
      supervision,
      summary,
      clinicalPhilosophy,
      keyHighlights,
      graphicalImage,
      graphicalTitle,
      graphicalConcept,
      graphicalPoints,
      indicationsTitle,
      indications,
      journeySteps,
      whatToExpect,
      faqs,
    } = body;

    if (!title || !image) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: Title and Hero Image (.webp)" },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    // Auto-calculate num if not provided
    let calculatedNum = num;
    if (!calculatedNum) {
      const count = await db.collection(COLLECTIONS.TREATMENTS).countDocuments();
      calculatedNum = String(count + 1).padStart(2, "0");
    }

    // Auto-generate slug if not provided
    const calculatedSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const now = new Date().toISOString();

    const newTreatment = {
      slug: calculatedSlug,
      num: calculatedNum,
      title,
      shortTitle: shortTitle || title,
      tagline: tagline || "",
      category: category || "Clinical Care",
      image,
      altText: altText || `${title} consultation room at MANAM`,
      duration: duration || "45–60 mins (Initial) • 20–30 mins (Follow-up)",
      format: format || "In-Person (Rajkot) or Secure Online Video",
      supervision: supervision || "Dr. Bhoomi Raval, MD Psychiatry (Gold Medalist)",
      summary: summary || "",
      clinicalPhilosophy: clinicalPhilosophy || "",
      keyHighlights: Array.isArray(keyHighlights)
        ? keyHighlights.filter(Boolean)
        : typeof keyHighlights === "string"
        ? (keyHighlights as string).split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      graphicalImage: graphicalImage || image,
      graphicalTitle: graphicalTitle || "Clinical Principle & Healing Mechanism",
      graphicalConcept:
        graphicalConcept ||
        "Evidence-based interventions restore neurochemical harmony and cognitive resilience.",
      graphicalPoints:
        Array.isArray(graphicalPoints) && graphicalPoints.length > 0
          ? graphicalPoints
          : [
              {
                label: "Biological Balance",
                text: "Regulating neurotransmitter pathways and neural circuitry.",
              },
              {
                label: "Cognitive Alignment",
                text: "Empowering sustained emotional resilience and behavioral recovery.",
              },
            ],
      indicationsTitle: indicationsTitle || "When Is This Treatment Recommended?",
      indications:
        Array.isArray(indications) && indications.length > 0
          ? indications
          : [
              {
                title: "Persistent Symptoms",
                description:
                  "When emotional, cognitive, or biological symptoms interfere with daily functioning and peace of mind.",
              },
            ],
      journeySteps:
        Array.isArray(journeySteps) && journeySteps.length > 0
          ? journeySteps
          : [
              {
                step: "01",
                title: "Comprehensive Evaluation",
                description:
                  "In-depth clinical diagnostic consultation exploring symptoms, history, and goals.",
                duration: "45–60 Mins",
              },
              {
                step: "02",
                title: "Customized Protocol",
                description:
                  "Tailored medical and psychological care plan with ongoing progress monitoring.",
                duration: "Ongoing",
              },
            ],
      whatToExpect:
        Array.isArray(whatToExpect) && whatToExpect.length > 0
          ? whatToExpect
          : [
              "Confidential and stigma-free clinical setting",
              "Gold Medalist doctor oversight and evidence-based medicine",
              "Collaborative care decisions and regular progress reviews",
            ],
      faqs:
        Array.isArray(faqs) && faqs.length > 0
          ? faqs
          : [
              {
                q: `How do I know if ${shortTitle || title} is right for me?`,
                a: "During your initial consultation, Dr. Bhoomi Raval performs a comprehensive diagnostic assessment to determine the most effective and gentle treatment pathway for your specific condition.",
              },
            ],
      createdAt: now,
      updatedAt: now,
    };

    const result = await db.collection(COLLECTIONS.TREATMENTS).insertOne(newTreatment);

    try {
      revalidatePath("/treatments");
      revalidatePath(`/treatments/${calculatedSlug}`);
      revalidatePath("/treatments/[slug]", "page");
      revalidatePath("/");
    } catch (e) {
      console.error("Revalidate path error:", e);
    }

    return NextResponse.json({
      success: true,
      treatment: { ...newTreatment, _id: result.insertedId },
      message: "Treatment added successfully",
    });
  } catch (error) {
    console.error("Treatments POST error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create treatment" },
      { status: 500 }
    );
  }
}

// PUT update treatment details (by slug or _id)
export async function PUT(req: NextRequest) {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { slug, _id, ...updates } = body;

    if (!slug && !_id) {
      return NextResponse.json(
        { success: false, message: "Missing slug or _id to identify treatment" },
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

    let targetSlug = slug;
    if (!targetSlug && _id) {
      const existing = await db.collection(COLLECTIONS.TREATMENTS).findOne(query as any);
      if (existing) targetSlug = existing.slug;
    }

    const result = await db.collection(COLLECTIONS.TREATMENTS).updateOne(query as any, { $set: updates });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Treatment not found" },
        { status: 404 }
      );
    }

    try {
      revalidatePath("/treatments");
      if (targetSlug) {
        revalidatePath(`/treatments/${targetSlug}`);
      }
      revalidatePath("/treatments/[slug]", "page");
      revalidatePath("/");
    } catch (e) {
      console.error("Revalidate path error:", e);
    }

    return NextResponse.json({
      success: true,
      message: "Treatment updated successfully",
    });
  } catch (error) {
    console.error("Treatments PUT error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update treatment" },
      { status: 500 }
    );
  }
}

// DELETE treatment
export async function DELETE(req: NextRequest) {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (!id && !slug) {
      return NextResponse.json(
        { success: false, message: "Missing id or slug parameter" },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    let filter: Record<string, unknown> = {};
    if (id) {
      filter = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };
    } else if (slug) {
      filter = { slug };
    }

    let targetSlug = slug;
    if (!targetSlug && id) {
      const existing = await db.collection(COLLECTIONS.TREATMENTS).findOne(filter as any);
      if (existing) targetSlug = existing.slug;
    }

    await db.collection(COLLECTIONS.TREATMENTS).deleteOne(filter as any);

    try {
      revalidatePath("/treatments");
      if (targetSlug) {
        revalidatePath(`/treatments/${targetSlug}`);
      }
      revalidatePath("/treatments/[slug]", "page");
      revalidatePath("/");
    } catch (e) {
      console.error("Revalidate path error:", e);
    }

    return NextResponse.json({
      success: true,
      message: "Treatment deleted successfully",
    });
  } catch (error) {
    console.error("Treatments DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete treatment" },
      { status: 500 }
    );
  }
}
