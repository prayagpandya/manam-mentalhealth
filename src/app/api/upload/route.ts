import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    // Check admin authentication
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    if (session?.value !== "manam_authenticated_admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please log in as admin." },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded." },
        { status: 400 }
      );
    }

    // 1. Extension and format verification
    const originalName = file.name || "";
    const lowerName = originalName.toLowerCase();
    const ext = path.extname(lowerName);

    const isWebpExt = ext === ".webp" || lowerName.endsWith(".webp");
    const isVideoExt = ext === ".mp4" || ext === ".webm" || lowerName.endsWith(".mp4") || lowerName.endsWith(".webm");
    const isImageMime = file.type.startsWith("image/");
    const isVideoMime = file.type.startsWith("video/");

    const isImage = isWebpExt || isImageMime;
    const isVideo = isVideoExt || isVideoMime;

    if (!isImage && !isVideo) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid file format. Only .webp images or .mp4 / .webm videos are allowed.",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (isImage) {
      // Magic bytes check (RIFF ... WEBP)
      if (buffer.length < 12) {
        return NextResponse.json(
          { success: false, message: "Corrupted or invalid image file." },
          { status: 400 }
        );
      }
      const riff = buffer.subarray(0, 4).toString("ascii");
      const webp = buffer.subarray(8, 12).toString("ascii");
      if (riff !== "RIFF" || webp !== "WEBP") {
        return NextResponse.json(
          {
            success: false,
            message: "File signature verification failed. Only valid .webp files are allowed.",
          },
          { status: 400 }
        );
      }
    }

    // Ensure uploads directory exists
    const uploadsDir = path.resolve(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Clean filename: timestamp + sanitized base
    const rawBase = path.basename(originalName, ext);
    const baseName = rawBase.replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase();
    const finalExt = ext || (isVideo ? ".mp4" : ".webp");
    const fileName = `${Date.now()}_${baseName || (isVideo ? "video" : "image")}${finalExt}`;
    const filePath = path.join(uploadsDir, fileName);

    // Write file to project folder
    fs.writeFileSync(filePath, buffer);

    // Public path stored in MongoDB
    const publicPath = `/uploads/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicPath,
      path: publicPath,
      fileName,
      size: buffer.length,
      fileType: isVideo ? "video" : "image",
      message: `${isVideo ? "Video" : "Image"} uploaded and stored successfully in project folder.`,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    const errMessage = error?.message || (typeof error === "string" ? error : "Failed to upload image.");
    return NextResponse.json(
      { success: false, message: `Upload error: ${errMessage}` },
      { status: 500 }
    );
  }
}
