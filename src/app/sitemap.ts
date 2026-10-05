import type { MetadataRoute } from "next";
import { servicesData } from "@/data/servicesData";
import { blogsData } from "@/data/blogsData";
import { getDatabase } from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/models";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://manammentalhealth.com";
  const baseUrl = siteUrl.replace(/\/+$/, "");
  const now = new Date();

  // Core static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/treatments`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/conditions`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/psychotherapy`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/awareness`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic treatment pages (static fallback + database)
  let treatmentSlugs = servicesData.map((s) => s.slug);
  try {
    const db = await getDatabase();
    const dbTreatments = await db
      .collection(COLLECTIONS.TREATMENTS)
      .find({}, { projection: { slug: 1 } })
      .toArray();
    if (dbTreatments && dbTreatments.length > 0) {
      const dbSlugs = dbTreatments.map((t) => t.slug).filter(Boolean);
      treatmentSlugs = Array.from(new Set([...treatmentSlugs, ...dbSlugs]));
    }
  } catch {
    // Fallback to static servicesData if DB is unreachable
  }

  const treatmentRoutes: MetadataRoute.Sitemap = treatmentSlugs.map((slug) => ({
    url: `${baseUrl}/treatments/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic blog pages (static fallback + database)
  let blogsList: { slug: string; updatedAt?: Date }[] = blogsData.map((b) => ({
    slug: b.slug,
  }));

  try {
    const db = await getDatabase();
    const dbBlogs = await db
      .collection(COLLECTIONS.BLOGS)
      .find({}, { projection: { slug: 1, updatedAt: 1, createdAt: 1 } })
      .toArray();

    if (dbBlogs && dbBlogs.length > 0) {
      const dbBlogMap = new Map<string, { slug: string; updatedAt?: Date }>();
      dbBlogs.forEach((b) => {
        if (b.slug) {
          dbBlogMap.set(b.slug, {
            slug: b.slug,
            updatedAt: b.updatedAt
              ? new Date(b.updatedAt)
              : b.createdAt
              ? new Date(b.createdAt)
              : undefined,
          });
        }
      });

      blogsList.forEach((b) => {
        if (!dbBlogMap.has(b.slug)) {
          dbBlogMap.set(b.slug, b);
        }
      });

      blogsList = Array.from(dbBlogMap.values());
    }
  } catch {
    // Fallback to static blogsData if DB is unreachable
  }

  const blogRoutes: MetadataRoute.Sitemap = blogsList.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: blog.updatedAt || now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...treatmentRoutes, ...blogRoutes];
}
