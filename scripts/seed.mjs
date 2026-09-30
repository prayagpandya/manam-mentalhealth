import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";

// Read .env manually
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const [key, ...vals] = trimmed.split("=");
      process.env[key.trim()] = vals.join("=").trim();
    }
  }
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("No MONGODB_URI found in .env!");
  process.exit(1);
}

// Dynamically import or load JSON/data
// Let's import the data from TypeScript files or transpile / parse them
async function main() {
  console.log("Connecting to MongoDB Atlas...");
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected successfully to MongoDB Atlas!");
    const db = client.db("manam_db");

    // 1. Gallery Collection
    console.log("Seeding gallery collection...");
    const galleryCol = db.collection("gallery");
    // Read initialGalleryItems from src/data/galleryData.ts
    // Let's write helper or read the exported data
    const galleryFile = fs.readFileSync(path.resolve(process.cwd(), "src/data/galleryData.ts"), "utf-8");
    const galleryJsonMatch = galleryFile.match(/initialGalleryItems:\s*GalleryItem\[\]\s*=\s*(\[[\s\S]*?\]);/);
    if (galleryJsonMatch) {
      // Evaluate or parse
      const items = eval(galleryJsonMatch[1]);
      await galleryCol.deleteMany({});
      const result = await galleryCol.insertMany(items.map(item => ({
        ...item,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })));
      console.log(`Inserted ${result.insertedCount} gallery items.`);
    }

    // 2. Blogs Collection
    console.log("Seeding blogs collection...");
    const blogsCol = db.collection("blogs");
    const blogsFile = fs.readFileSync(path.resolve(process.cwd(), "src/data/blogsData.ts"), "utf-8");
    const blogsJsonMatch = blogsFile.match(/blogsData:\s*BlogPost\[\]\s*=\s*(\[[\s\S]*?\]);/);
    if (blogsJsonMatch) {
      const items = eval(blogsJsonMatch[1]);
      await blogsCol.deleteMany({});
      const result = await blogsCol.insertMany(items.map(item => ({
        ...item,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })));
      console.log(`Inserted ${result.insertedCount} blog posts.`);
    }

    // 3. Services Collection
    console.log("Seeding services collection...");
    const servicesCol = db.collection("services");
    const servicesFile = fs.readFileSync(path.resolve(process.cwd(), "src/data/servicesData.ts"), "utf-8");
    const servicesJsonMatch = servicesFile.match(/servicesData:\s*ServiceDetail\[\]\s*=\s*(\[[\s\S]*?\]);/);
    if (servicesJsonMatch) {
      const items = eval(servicesJsonMatch[1]);
      await servicesCol.deleteMany({});
      const result = await servicesCol.insertMany(items.map(item => ({
        ...item,
        updatedAt: new Date().toISOString()
      })));
      console.log(`Inserted ${result.insertedCount} services.`);
    }

    console.log("Data seeding completed successfully!");
  } catch (err) {
    console.error("Error during seeding:", err);
  } finally {
    await client.close();
  }
}

main();
