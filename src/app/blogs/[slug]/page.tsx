import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Tag, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogsData, BlogPost } from "@/data/blogsData";
import { getDatabase } from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/models";

export const dynamicParams = true;

// Statically generate initial blog detail pages
export async function generateStaticParams() {
  return blogsData.map((blog) => ({
    slug: blog.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let blog: BlogPost | null = null;
  let allBlogs: BlogPost[] = blogsData;

  try {
    const db = await getDatabase();
    const dbBlog = await db.collection(COLLECTIONS.BLOGS).findOne({ slug });
    if (dbBlog) {
      blog = JSON.parse(JSON.stringify(dbBlog)) as BlogPost;
    }
    const dbAll = await db.collection(COLLECTIONS.BLOGS).find({}).toArray();
    if (dbAll && dbAll.length > 0) {
      allBlogs = JSON.parse(JSON.stringify(dbAll)) as BlogPost[];
    }
  } catch (e) {
    console.error("DB blog fetch fallback to static:", e);
  }

  if (!blog) {
    blog = blogsData.find((b) => b.slug === slug) || null;
  }

  if (!blog) {
    notFound();
  }

  // Related blogs (exclude current)
  const relatedBlogs = allBlogs.filter((b) => b.slug !== slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-[#F7F3EA] text-[#1D2A3A]">
      <Navbar />

      {/* Article Header */}
      <article className="pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Back */}
          <div className="flex items-center gap-2 text-xs text-[#6A7888] mb-8">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 font-medium text-[#2D5A47] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all blogs</span>
            </Link>
            <span>/</span>
            <span className="text-[#8898AA] capitalize">{blog.category}</span>
          </div>

          {/* Category & Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-[#2D5A47] text-white tracking-wide">
              {blog.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[#69798A]">
              <Clock className="w-3.5 h-3.5" />
              <span>{blog.readTime}</span>
            </div>
            <span className="text-neutral-300">•</span>
            <div className="flex items-center gap-1.5 text-xs text-[#69798A]">
              <Calendar className="w-3.5 h-3.5" />
              <span>{blog.publishedDate}</span>
            </div>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#162534] font-normal tracking-tight leading-[1.2] mb-6">
            {blog.title}
          </h1>

          {/* Excerpt / Lead */}
          <p className="text-lg sm:text-xl text-[#4A596B] leading-relaxed mb-8 font-light italic border-l-2 border-[#2D5A47] pl-4">
            {blog.excerpt}
          </p>

          {/* Author Card */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-[#EFE8DC] border border-[#DDD3C4] mb-8">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full overflow-hidden relative border border-[#2D5A47]/30 shrink-0 bg-[#2D5A47] text-white flex items-center justify-center font-serif font-semibold">
                BR
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#162534] leading-tight">
                  {blog.author.name}
                </h4>
                <p className="text-xs text-[#526374] mt-0.5">
                  {blog.author.role} • MANAM Mental Health Initiative
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-xs text-[#2D5A47] font-medium bg-white/70 px-3 py-1 rounded-full border border-[#D5CABE]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Medically Reviewed</span>
            </div>
          </div>

          {/* Featured Hero Cover Image */}
          <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-md border border-[#DDD3C4] mb-10 bg-[#ECE4D7]">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>

          {/* Key Clinical Takeaways Box */}
          <div className="bg-[#FAF4EA] rounded-2xl p-6 sm:p-8 border border-[#E0D5C5] mb-12 shadow-2xs">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#2D5A47] uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Key Clinical Takeaways</span>
            </div>
            <ul className="space-y-3">
              {blog.keyTakeaways.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#2E3C4D] leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-[#2D5A47]/10 text-[#2D5A47] flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Body Content */}
          <div className="space-y-10 text-[#243344] leading-relaxed">
            {blog.content.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-serif text-[#162534] font-semibold pt-2">
                  {section.heading}
                </h2>
                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-base sm:text-lg text-[#3A4B5D] leading-relaxed">
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </div>

          {/* Doctor's Clinical Note Quote */}
          <div className="my-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#2D5A47]/10 to-[#1F3D30]/5 border border-[#2D5A47]/25 relative">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#2D5A47] mb-2">
              Clinical Advice From Dr. Bhoomi Raval
            </div>
            <blockquote className="font-serif text-lg sm:text-xl text-[#162534] italic leading-relaxed">
              &ldquo;{blog.clinicalAdvice}&rdquo;
            </blockquote>
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-[#DDD4C5] flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#667788] flex items-center gap-1 mr-2">
              <Tag className="w-3.5 h-3.5" />
              Article Tags:
            </span>
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-[#445566] bg-white px-3 py-1 rounded-full border border-[#D5CABE]"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Consultation CTA Card */}
          <div className="mt-14 p-8 rounded-3xl bg-[#162534] text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <h3 className="text-2xl font-serif text-white mb-2">
                Have questions about your mental wellness?
              </h3>
              <p className="text-sm text-[#A8BED4] leading-relaxed">
                Connect directly with Dr. Bhoomi Raval at Kotak Hospital in Rajkot or book a confidential online video consultation.
              </p>
            </div>
            <Link
              href="/#clinic"
              className="px-6 py-3 rounded-full bg-[#86C2A6] hover:bg-[#6FA88E] text-[#121E2B] font-semibold text-xs whitespace-nowrap transition-all shadow-md shrink-0"
            >
              Book Consultation
            </Link>
          </div>

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <div className="mt-20 pt-12 border-t border-[#DCD4C5]">
              <h3 className="text-2xl font-serif text-[#162534] mb-6">
                Related Reading
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedBlogs.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blogs/${rel.slug}`}
                    className="rounded-2xl bg-[#FAF6EE] border border-[#E3D9CC] hover:border-[#2D5A47]/50 hover:shadow-md transition-all group flex flex-col justify-between overflow-hidden cursor-pointer"
                  >
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#ECE4D7]">
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-medium text-[#2D5A47] block mb-2">
                          {rel.category}
                        </span>
                        <h4 className="text-base font-serif font-semibold text-[#162534] group-hover:text-[#2D5A47] transition-colors line-clamp-2">
                          {rel.title}
                        </h4>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-xs text-[#6A7888]">
                        <span>{rel.readTime}</span>
                        <span className="inline-flex items-center gap-1 font-semibold text-[#2D5A47]">
                          Read <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </main>
  );
}
