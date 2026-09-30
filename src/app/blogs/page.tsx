"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar, Search, BookOpen, User, Tag, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogsData, BlogPost } from "@/data/blogsData";
import { useBooking } from "@/context/BookingContext";

export default function BlogsPage() {
  const { openBooking } = useBooking();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [allBlogs, setAllBlogs] = useState<BlogPost[]>(blogsData);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.blogs && data.blogs.length > 0) {
          setAllBlogs(data.blogs);
        }
      })
      .catch((err) => console.error("Could not fetch dynamic blogs:", err));
  }, []);

  const categories = [
    "All",
    "Anxiety & Mood",
    "Mental Health Science",
    "Medication & Science",
    "Youth & Parenting",
    "Sleep & Wellness",
    "Women's Health",
  ];

  const filteredBlogs = allBlogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#F7F3EA] text-[#1D2A3A]">
      <Navbar onOpenBooking={() => openBooking("in-person")} />

      {/* Hero Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-[#EFE8DC] border-b border-[#DDD4C5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#D5CABE] text-xs font-semibold tracking-wider text-[#2D5A47] uppercase mb-4 shadow-2xs">
              <BookOpen className="w-3.5 h-3.5" />
              <span>CLINICAL ARTICLES & PSYCHIATRIC EDUCATION</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#162534] font-normal tracking-tight leading-tight">
              Mental Health Blogs & Insights
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#4E5D6E] leading-relaxed">
              Explore evidence-based psychiatry articles, biological explanations of mental wellness, and actionable coping tools authored by Dr. Bhoomi Raval (MD Psychiatry, Gold Medalist).
            </p>
          </div>

          {/* Search & Categories Bar */}
          <div className="mt-10 pt-8 border-t border-[#D9CEBF] flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#738294]" />
              <input
                type="text"
                placeholder="Search articles or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D5CABE] focus:border-[#2D5A47] focus:ring-1 focus:ring-[#2D5A47] rounded-full text-sm outline-none transition-all placeholder:text-[#8897A8]"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#2D5A47] text-white shadow-xs"
                      : "bg-white/80 text-[#4C5B6B] hover:bg-white border border-[#D8CEBF]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-20 bg-white/40 rounded-3xl border border-[#DDD4C5]">
              <p className="text-lg font-serif text-[#162534]">No articles found matching your search.</p>
              <p className="text-sm text-[#6C7C8E] mt-2">Try searching for different keywords or select &quot;All&quot; categories.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-5 px-5 py-2.5 rounded-full bg-[#2D5A47] text-white text-xs font-medium cursor-pointer"
              >
                Clear Search & Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, idx) => (
                <motion.div
                  key={blog.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="h-full"
                >
                  {/* Entire Card Clickable */}
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="bg-[#FAF6EE] rounded-2xl border border-[#E3D9CC] hover:border-[#2D5A47]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group h-full cursor-pointer"
                  >
                    {/* Blog Cover Image */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#ECE4D7]">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>

                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Category & Read Time */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#2D5A47]/10 text-[#2D5A47]">
                            {blog.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-[#758495]">
                            <Clock className="w-3.5 h-3.5" />
                            {blog.readTime}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-serif font-semibold text-[#162534] group-hover:text-[#2D5A47] transition-colors line-clamp-2 mb-3 leading-snug">
                          {blog.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-sm text-[#4E5D6E] leading-relaxed line-clamp-3 mb-5">
                          {blog.excerpt}
                        </p>
                      </div>

                      {/* Highlight Box */}
                      <div className="bg-white/80 rounded-xl p-3.5 border border-[#E7DFD2] mb-4 text-xs text-[#3E4D5D] space-y-1">
                        <span className="font-semibold text-[#2D5A47] flex items-center gap-1 text-[11px] uppercase tracking-wider">
                          <Sparkles className="w-3 h-3" />
                          Clinical Takeaway:
                        </span>
                        <p className="line-clamp-2 italic text-[#4B5968]">
                          &ldquo;{blog.keyTakeaways[0]}&rdquo;
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {blog.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 text-[11px] text-[#637282] bg-white/60 px-2 py-0.5 rounded-md border border-[#E5DDD0]"
                          >
                            <Tag className="w-2.5 h-2.5" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-6 sm:px-7 py-4 bg-[#F2ECE0] border-t border-[#E5DCD0] flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-[#6A798A]">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{blog.publishedDate}</span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2D5A47] group-hover:text-[#1F3D30] group-hover:translate-x-1 transition-all">
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="py-16 bg-[#162534] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif mb-4">
            Need Guidance Tailored to Your Journey?
          </h2>
          <p className="text-[#A4B8CE] max-w-2xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
            Reading articles is a wonderful first step, but personalized medical evaluation brings lasting healing. Consult Dr. Bhoomi Raval in-person in Rajkot or via secure online video consultation.
          </p>
          <button
            onClick={() => openBooking("in-person")}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#86C2A6] hover:bg-[#6FA88E] text-[#121E2B] font-semibold text-sm transition-all shadow-md cursor-pointer"
          >
            <span>Book a Confidential Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
