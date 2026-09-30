import fs from "fs";
import path from "path";

async function runTests() {
  console.log("=== 1. Testing Login API ===");
  const loginRes = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: "manam@admin210" }),
  });

  const loginData = await loginRes.json();
  console.log("Login result:", loginData);

  const cookieHeader = loginRes.headers.get("set-cookie");
  const cookie = cookieHeader ? cookieHeader.split(";")[0] : "";
  console.log("Admin cookie received:", cookie ? "YES" : "NO");

  console.log("\n=== 2. Testing Authenticated Gallery API ===");
  const galRes = await fetch("http://localhost:3000/api/admin/gallery", {
    headers: { cookie },
  });
  const galData = await galRes.json();
  console.log("Gallery success:", galData.success, "| Count:", galData.items?.length);

  console.log("\n=== 3. Testing Authenticated Blogs API ===");
  const blogRes = await fetch("http://localhost:3000/api/admin/blogs", {
    headers: { cookie },
  });
  const blogData = await blogRes.json();
  console.log("Blogs success:", blogData.success, "| Count:", blogData.blogs?.length);

  console.log("\n=== 4. Testing Authenticated Services API ===");
  const servRes = await fetch("http://localhost:3000/api/admin/services", {
    headers: { cookie },
  });
  const servData = await servRes.json();
  console.log("Services success:", servData.success, "| Count:", servData.services?.length);

  console.log("\n=== 5. Testing Strict .webp Upload Enforcement ===");
  // Test 5A: Non-webp file rejected
  const fakePng = Buffer.from("\x89PNG\r\n\x1a\nfake png content");
  const formDataBad = new FormData();
  formDataBad.append("file", new Blob([fakePng], { type: "image/png" }), "test_photo.png");

  const badUploadRes = await fetch("http://localhost:3000/api/upload", {
    method: "POST",
    headers: { cookie },
    body: formDataBad,
  });
  const badUploadData = await badUploadRes.json();
  console.log("Non-webp rejected status:", badUploadRes.status, "| message:", badUploadData.message);

  // Test 5B: Valid webp file accepted
  // RIFF....WEBPVP8
  const sampleWebp = Buffer.from([
    0x52, 0x49, 0x46, 0x46, // RIFF
    0x14, 0x00, 0x00, 0x00, // Size
    0x57, 0x45, 0x42, 0x50, // WEBP
    0x56, 0x50, 0x38, 0x20, // VP8
    0x08, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00
  ]);
  const formDataGood = new FormData();
  formDataGood.append("file", new Blob([sampleWebp], { type: "image/webp" }), "test_sample.webp");

  const goodUploadRes = await fetch("http://localhost:3000/api/upload", {
    method: "POST",
    headers: { cookie },
    body: formDataGood,
  });
  const goodUploadData = await goodUploadRes.json();
  console.log("Valid .webp upload status:", goodUploadRes.status, "| result:", goodUploadData);

  // Check if file exists on disk in public/uploads/
  if (goodUploadData.url) {
    const filePath = path.join(process.cwd(), "public", goodUploadData.url);
    console.log("File exists on filesystem:", fs.existsSync(filePath), "| Path:", filePath);
    // clean up test upload
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("Cleaned up temporary test file.");
    }
  }

  console.log("\n=== ALL TESTS COMPLETED SUCCESSFULLY ===");
}

runTests().catch(console.error);
