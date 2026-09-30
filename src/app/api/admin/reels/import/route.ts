import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "../route";
import { execFile } from "child_process";
import path from "path";
import util from "util";

const execFileAsync = util.promisify(execFile);

export async function POST(req: NextRequest) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Please log in as admin." },
      { status: 401 }
    );
  }

  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { success: false, message: "Please provide a valid Instagram Reel link." },
        { status: 400 }
      );
    }

    const scriptPath = path.join(process.cwd(), "scripts", "import_reel.py");
    const targetFolder = path.join(process.cwd(), "public", "uploads", "reels");

    // Execute python script to extract and download reel
    const { stdout, stderr } = await execFileAsync("python", [scriptPath, url.trim()], {
      timeout: 120000,
    });

    if (!stdout || !stdout.trim()) {
      console.error("import_reel.py empty output. stderr:", stderr);
      return NextResponse.json(
        {
          success: false,
          message: stderr || "Could not retrieve reel details from Instagram.",
        },
        { status: 500 }
      );
    }

    const result = JSON.parse(stdout.trim());
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.error || "Failed to parse reel from Instagram URL.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      reel: result,
      message: "Instagram reel successfully imported and downloaded!",
    });
  } catch (error: unknown) {
    console.error("Reel import error:", error);
    const msg = error instanceof Error ? error.message : "Error importing Instagram reel";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
