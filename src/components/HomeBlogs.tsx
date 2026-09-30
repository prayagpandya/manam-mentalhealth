"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar, BookOpen } from "lucide-react";
import { blogsData } from "@/data/blogsData";

export default function HomeBlogs() {
  // Show top 3 featured blogs on the home page
  const featuredBlogs = blogsData.slice(0, 3);

  return (
    <section id="blogs" className="py-20 md:py-28 bg-[#F7F3EA] border-b border-[#E3DACE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#DDD4C5]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#D5CABE] text-xs font-semibold tracking-wider text-[#2D5A47] uppercase mb-3 shadow-2xs">
              <BookOpen className="w-3.5 h-3.5" />
              <span>CLINICAL INSIGHTS & EDUCATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#162534] font-normal tracking-tight">
              Mental Health Blogs
            </h2>
            <p className="mt-3 text-base text-[#526172] max-w-2xl">
              Medical knowledge, neurochemical insights, and psychological coping tools authored by Dr. Bhoomi Raval (MD Psychiatry) to de-stigmatize mental wellness.
            </p>
          </div>

          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2D5A47] hover:bg-[#234738] text-white text-xs font-medium tracking-wide transition-all shadow-xs hover:shadow-md shrink-0 self-start md:self-auto"
          >
            <span>Explore All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Featured Blog Cards - Fully Clickable */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBlogs.map((blog, idx) => (
            <motion.div
              key={blog.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="h-full"
            >
              <Link
                href={`/blogs/${blog.slug}`}
                className="bg-[#FAF6EE] rounded-2xl border border-[#E3D9CC] hover:border-[#2D5A47]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group h-full cursor-pointer"
              >
                {/* Blog Image */}
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
                    <h3 className="text-xl font-serif font-semibold text-[#162534] group-hover:text-[#2D5A47] transition-colors line-clamp-2 mb-3 leading-snug">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-[#4E5D6E] leading-relaxed line-clamp-3 mb-5">
                      {blog.excerpt}
                    </p>
                  </div>

                  {/* Highlight Box */}
                  <div className="bg-white/80 rounded-xl p-3.5 border border-[#E7DFD2] mb-4 text-xs text-[#3E4D5D] space-y-1">
                    <span className="font-semibold text-[#2D5A47] block text-[11px] uppercase tracking-wider">
                      Key Highlight:
                    </span>
                    <p className="line-clamp-2 italic text-[#4B5968]">
                      &ldquo;{blog.keyTakeaways[0]}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Card Footer with Link */}
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
      </div>
    </section>
  );
}
