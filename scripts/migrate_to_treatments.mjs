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
  console.error("MONGODB_URI not found in .env");
  process.exit(1);
}

async function migrate() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas.");

    const db = client.db("manam_db");
    const servicesCollection = db.collection("services");
    const treatmentsCollection = db.collection("treatments");

    // Fetch existing documents from services collection
    const existingServices = await servicesCollection.find({}).toArray();
    console.log(`Found ${existingServices.length} items in 'services' collection.`);

    if (existingServices.length > 0) {
      for (const item of existingServices) {
        const { _id, ...rest } = item;
        await treatmentsCollection.updateOne(
          { slug: item.slug },
          {
            $set: {
              ...rest,
              updatedAt: new Date().toISOString(),
            },
          },
          { upsert: true }
        );
      }
    }

    const count = await treatmentsCollection.countDocuments();
    console.log(`Successfully migrated and populated 'treatments' collection with ${count} treatments.`);
  } catch (error) {
    console.error("Migration error:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

migrate();
