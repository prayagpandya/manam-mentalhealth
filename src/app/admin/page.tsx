"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Eye,
  Check,
  AlertCircle,
  Upload,
  RefreshCw,
  ExternalLink,
  Images,
  BookOpen,
  Stethoscope,
  Sparkles,
  MapPin,
  Calendar,
  X,
  ShieldCheck,
  Tag,
  Clock,
  ArrowRight,
  ArrowLeft,
  Film,
  Play,
} from "lucide-react";
import InstagramIcon from "@/components/InstagramIcon";
import { MongoGalleryItem, MongoBlogPost, MongoServiceDetail, MongoTreatmentDetail, MongoReel } from "@/lib/models";

// Video File Uploader Component for Reels
function VideoUploadBox({
  currentVideo,
  onUploaded,
  label = "Upload Video (.mp4 / .webm)",
}: {
  currentVideo?: string;
  onUploaded: (url: string) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string>(currentVideo || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(currentVideo || "");
  }, [currentVideo]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const lower = file.name.toLowerCase();
    if (!lower.endsWith(".mp4") && !lower.endsWith(".webm")) {
      setError("Please select a valid .mp4 or .webm video file.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to upload video");
      }

      const uploadedUrl = data.url || data.path;
      setPreview(uploadedUrl);
      onUploaded(uploadedUrl);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload video";
      setError(msg);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A5568]">
        {label} <span className="text-[#2D5A47] font-bold">(*.mp4 / *.webm)</span>
      </label>

      <div className="flex items-center gap-3 p-3 border-2 border-dashed border-[#D5CABE] rounded-xl bg-[#FAF7F0] overflow-hidden">
        {preview ? (
          <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden border border-[#D5CABE] bg-black shrink-0 flex items-center justify-center">
            <video src={preview} className="w-full h-full object-cover" muted />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
              <Play className="w-5 h-5 text-white/90 fill-current" />
            </div>
          </div>
        ) : (
          <div className="w-16 h-20 sm:w-20 sm:h-24 rounded-lg bg-[#EFE8DC] border border-[#D5CABE] flex flex-col items-center justify-center text-[#8898AA] shrink-0 text-center p-1">
            <Film className="w-5 h-5 mb-1 text-[#8898AA]" />
            <span className="text-[9px]">No video</span>
          </div>
        )}

        <div className="flex-1 min-w-0 space-y-1.5">
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/mp4,video/webm,.mp4,.webm"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
              id={`upload-video-${label.replace(/[^a-zA-Z0-9]/g, "-")}`}
            />
            <label
              htmlFor={`upload-video-${label.replace(/[^a-zA-Z0-9]/g, "-")}`}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors shadow-2xs ${
                uploading
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[#2D5A47] text-white hover:bg-[#234737]"
              }`}
            >
              {uploading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Uploading video...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  <span>{preview ? "Replace Video" : "Upload Video File"}</span>
                </>
              )}
            </label>
          </div>

          {preview && (
            <p className="text-[10px] text-[#4A5568] truncate max-w-full font-mono bg-white/70 px-2 py-0.5 rounded border border-[#E0D8CB]">
              {preview}
            </p>
          )}

          {error && (
            <div className="flex items-center gap-1.5 text-[11px] text-red-600">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// WebP File Uploader Component with strict .webp enforcement
function WebpUploadBox({
  currentImage,
  onUploaded,
  label = "Upload Image (.webp only)",
}: {
  currentImage?: string;
  onUploaded: (url: string) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string>(currentImage || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(currentImage || "");
  }, [currentImage]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Strict client-side validation
    if (!file.name.toLowerCase().endsWith(".webp") || file.type !== "image/webp") {
      setError("STRICT REQUIREMENT: Only .webp files are allowed. Please convert or select a .webp image.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Upload failed");
      }

      setPreview(data.url);
      onUploaded(data.url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload image";
      setError(msg);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const cleanLabel = label.replace(/\s*\(\*\.webp.*?\)/gi, "").trim();

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A5568]">
        {cleanLabel} <span className="text-[#C29D59] font-bold">(*.webp)</span>
      </label>

      <div className="flex items-center gap-3 p-3 border-2 border-dashed border-[#D5CABE] rounded-xl bg-[#FAF7F0] overflow-hidden">
        {preview ? (
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-[#D5CABE] bg-[#EFE8DC] shrink-0">
            <Image src={preview} alt="Preview" fill className="object-cover" sizes="80px" />
          </div>
        ) : (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-[#EFE8DC] border border-[#D5CABE] flex flex-col items-center justify-center text-[#8898AA] shrink-0">
            <Upload className="w-5 h-5 mb-1 text-[#8898AA]" />
            <span className="text-[9px]">No image</span>
          </div>
        )}

        <div className="flex-1 min-w-0 space-y-1.5">
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".webp,image/webp"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
              id={`upload-${label.replace(/[^a-zA-Z0-9]/g, "-")}`}
            />
            <label
              htmlFor={`upload-${label.replace(/[^a-zA-Z0-9]/g, "-")}`}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors shadow-2xs ${
                uploading
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[#2D5A47] text-white hover:bg-[#234737]"
              }`}
            >
              {uploading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  <span>{preview ? "Replace Image" : "Upload .webp"}</span>
                </>
              )}
            </label>
          </div>

          {preview && (
            <p className="text-[10px] text-[#2D5A47] font-mono truncate max-w-full block" title={preview}>
              {preview.split("/").pop()}
            </p>
          )}

          {error && (
            <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="truncate">{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Active Tab: gallery | blogs | treatments | reels
  const [activeTab, setActiveTab] = useState<"gallery" | "blogs" | "treatments" | "reels">("gallery");

  // Data states
  const [galleryItems, setGalleryItems] = useState<MongoGalleryItem[]>([]);
  const [blogs, setBlogs] = useState<MongoBlogPost[]>([]);
  const [treatments, setTreatments] = useState<MongoTreatmentDetail[]>([]);
  const [reels, setReels] = useState<MongoReel[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Modals / forms
  const [editingGalleryItem, setEditingGalleryItem] = useState<MongoGalleryItem | null>(null);
  const [isNewGalleryOpen, setIsNewGalleryOpen] = useState(false);

  const [editingBlog, setEditingBlog] = useState<MongoBlogPost | null>(null);
  const [isNewBlogOpen, setIsNewBlogOpen] = useState(false);

  const [editingTreatment, setEditingTreatment] = useState<MongoTreatmentDetail | null>(null);
  const [isNewTreatmentOpen, setIsNewTreatmentOpen] = useState(false);

  const [editingReel, setEditingReel] = useState<MongoReel | null>(null);
  const [isNewReelOpen, setIsNewReelOpen] = useState(false);

  // 1. Initial auth check
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/check");
      const data = await res.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
        loadAllData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAuthChecked(true);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPassword("");
        loadAllData();
      } else {
        setLoginError(data.message || "Invalid admin password");
      }
    } catch {
      setLoginError("Failed to connect to authentication server");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsAuthenticated(false);
  };

  const showStatus = (text: string, type: "success" | "error" = "success") => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 4500);
  };

  // 2. Load all collection data
  const loadAllData = async () => {
    setLoadingData(true);
    try {
      const [galRes, blogRes, treatRes, reelRes] = await Promise.all([
        fetch("/api/admin/gallery"),
        fetch("/api/admin/blogs"),
        fetch("/api/admin/treatments"),
        fetch("/api/admin/reels"),
      ]);

      const [galData, blogData, treatData, reelData] = await Promise.all([
        galRes.json(),
        blogRes.json(),
        treatRes.json(),
        reelRes.json(),
      ]);

      if (galData.success) setGalleryItems(galData.items || []);
      if (blogData.success) setBlogs(blogData.blogs || []);
      if (treatData.success) setTreatments(treatData.treatments || treatData.services || []);
      if (reelData.success) setReels(reelData.reels || []);
    } catch (err) {
      console.error("Failed to load collection data:", err);
      showStatus("Could not fetch data from database", "error");
    } finally {
      setLoadingData(false);
    }
  };

  // --- GALLERY ACTIONS ---
  const handleSaveGalleryItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const itemData = {
      _id: editingGalleryItem?._id,
      src: (formData.get("src") as string) || editingGalleryItem?.src || "",
      location: ((formData.get("location") as string) || "").trim(),
    };

    if (!itemData.src) {
      showStatus("Please upload a .webp photo first", "error");
      return;
    }

    try {
      const method = editingGalleryItem ? "PUT" : "POST";
      const res = await fetch("/api/admin/gallery", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });
      const resData = await res.json();
      if (!res.ok || !resData.success) throw new Error(resData.message);

      showStatus(editingGalleryItem ? "Gallery photo updated!" : "New gallery photo added!");
      setEditingGalleryItem(null);
      setIsNewGalleryOpen(false);
      loadAllData();
      router.refresh();
    } catch (err: unknown) {
      showStatus(err instanceof Error ? err.message : "Error saving gallery photo", "error");
    }
  };

  const handleDeleteGalleryItem = async (id?: string) => {
    if (!id || !confirm("Are you sure you want to delete this gallery photo?")) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
      const resData = await res.json();
      if (!res.ok || !resData.success) throw new Error(resData.message);

      showStatus("Gallery item deleted successfully");
      loadAllData();
      router.refresh();
    } catch (err: unknown) {
      showStatus(err instanceof Error ? err.message : "Error deleting gallery item", "error");
    }
  };

  // --- BLOGS ACTIONS ---
  const handleSaveBlog = async (blogPayload: Partial<MongoBlogPost>) => {
    try {
      const isEdit = !!blogPayload._id;
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch("/api/admin/blogs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogPayload),
      });
      const resData = await res.json();
      if (!res.ok || !resData.success) throw new Error(resData.message);

      showStatus(isEdit ? "Blog post updated!" : "Blog published successfully!");
      setEditingBlog(null);
      setIsNewBlogOpen(false);
      loadAllData();
    } catch (err: unknown) {
      showStatus(err instanceof Error ? err.message : "Error saving blog post", "error");
    }
  };

  const handleDeleteBlog = async (id?: string) => {
    if (!id || !confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, { method: "DELETE" });
      const resData = await res.json();
      if (!res.ok || !resData.success) throw new Error(resData.message);

      showStatus("Blog post deleted successfully");
      loadAllData();
    } catch (err: unknown) {
      showStatus(err instanceof Error ? err.message : "Error deleting blog", "error");
    }
  };

  // --- TREATMENTS ACTIONS ---
  const handleSaveTreatment = async (treatmentPayload: Partial<MongoTreatmentDetail>) => {
    try {
      const isEdit = !!treatmentPayload._id;
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch("/api/admin/treatments", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(treatmentPayload),
      });
      const resData = await res.json();
      if (!res.ok || !resData.success) throw new Error(resData.message);

      showStatus(isEdit ? "Treatment details updated successfully!" : "New clinical treatment added successfully!");
      setEditingTreatment(null);
      setIsNewTreatmentOpen(false);
      loadAllData();
      router.refresh();
    } catch (err: unknown) {
      showStatus(err instanceof Error ? err.message : "Error saving treatment", "error");
    }
  };

  const handleDeleteTreatment = async (id?: string, slug?: string) => {
    if (!confirm("Are you sure you want to delete this clinical treatment?")) return;
    try {
      const param = id ? `id=${id}` : `slug=${slug}`;
      const res = await fetch(`/api/admin/treatments?${param}`, { method: "DELETE" });
      const resData = await res.json();
      if (!res.ok || !resData.success) throw new Error(resData.message);

      showStatus("Treatment deleted successfully");
      loadAllData();
      router.refresh();
    } catch (err: unknown) {
      showStatus(err instanceof Error ? err.message : "Error deleting treatment", "error");
    }
  };

  // --- REELS ACTIONS ---
  const handleSaveReel = async (reelPayload: Partial<MongoReel>) => {
    try {
      const isEdit = !!reelPayload._id;
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch("/api/admin/reels", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reelPayload),
      });
      const resData = await res.json();
      if (!res.ok || !resData.success) throw new Error(resData.message);

      showStatus(isEdit ? "Reel updated successfully!" : "New reel added successfully!");
      setEditingReel(null);
      setIsNewReelOpen(false);
      loadAllData();
    } catch (err: unknown) {
      showStatus(err instanceof Error ? err.message : "Error saving reel", "error");
    }
  };

  const handleDeleteReel = async (id?: string) => {
    if (!id || !confirm("Are you sure you want to delete this Instagram reel?")) return;
    try {
      const res = await fetch(`/api/admin/reels?id=${id}`, { method: "DELETE" });
      const resData = await res.json();
      if (!res.ok || !resData.success) throw new Error(resData.message);

      showStatus("Reel deleted successfully");
      loadAllData();
    } catch (err: unknown) {
      showStatus(err instanceof Error ? err.message : "Error deleting reel", "error");
    }
  };

  // Loading skeleton while checking auth
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#F7F3EA] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-[#2D5A47] animate-spin" />
          <p className="text-sm text-[#4E5D6E] font-medium">Checking administrative session...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, render Login Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#F7F3EA] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-[#DDD4C5] p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#E8E2D5] text-[#2D5A47] mb-4 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-serif text-[#162534] font-semibold">
              MANAM Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-[#6A7888] mt-1.5">
              Secure administrative access for Dr. Bhoomi Raval & clinical team
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D4D5E] mb-2">
                Administrator Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-3 rounded-xl border border-[#D5CABE] bg-[#FAF7F0] text-[#162534] placeholder-[#9AA5B1] focus:outline-none focus:ring-2 focus:ring-[#2D5A47] focus:border-transparent transition-all text-sm"
              />
            </div>

            {loginError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3.5 px-4 rounded-xl bg-[#2D5A47] text-white font-medium text-sm hover:bg-[#234737] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-70"
            >
              {loggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Verifying Credentials...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Enter Management Portal
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#EFE8DC] text-center text-xs text-[#8898AA]">
            Protected by MANAM RBAC &bull; Strictly authorized medical personnel only
          </div>
        </div>
      </main>
    );
  }

  // Authenticated Portal View
  return (
    <main className="min-h-screen bg-[#F7F3EA] text-[#1D2A3A]">
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#DDD4C5] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-serif text-xl font-bold tracking-tight text-[#162534]">
                MANAM
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-[#2D5A47] text-white rounded-md tracking-wider uppercase">
                Admin
              </span>
            </Link>
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#6A7888] pl-3 border-l border-[#DDD4C5]">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>MongoDB Connected</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#4E5D6E] hover:text-[#162534] hover:bg-[#FAF7F0] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">View Live Website</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 transition-colors border border-red-200 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Toast */}
        {statusMessage && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center justify-between shadow-sm border ${
              statusMessage.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              {statusMessage.type === "success" ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <span>{statusMessage.text}</span>
            </div>
            <button
              onClick={() => setStatusMessage(null)}
              className="p-1 rounded-md hover:bg-black/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Dashboard Title & Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-serif text-[#162534] font-semibold">
              Content & Clinic Management
            </h1>
            <p className="text-sm text-[#5A6878] mt-1">
              Direct live control over Gallery photos, Clinical Blogs, and Service details.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="inline-flex p-1 rounded-xl bg-[#EFE8DC] border border-[#D5CABE] self-start md:self-auto shadow-2xs">
            <button
              onClick={() => setActiveTab("gallery")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeTab === "gallery"
                  ? "bg-white text-[#2D5A47] shadow-xs font-semibold"
                  : "text-[#5A6878] hover:text-[#162534]"
              }`}
            >
              <Images className="w-4 h-4" />
              <span>Gallery</span>
              <span className="ml-1 px-1.5 py-0.2 bg-[#2D5A47]/10 text-[#2D5A47] rounded-full text-[11px]">
                {galleryItems.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("blogs")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeTab === "blogs"
                  ? "bg-white text-[#2D5A47] shadow-xs font-semibold"
                  : "text-[#5A6878] hover:text-[#162534]"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Blogs</span>
              <span className="ml-1 px-1.5 py-0.2 bg-[#2D5A47]/10 text-[#2D5A47] rounded-full text-[11px]">
                {blogs.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("treatments")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeTab === "treatments"
                  ? "bg-white text-[#2D5A47] shadow-xs font-semibold"
                  : "text-[#5A6878] hover:text-[#162534]"
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Treatments</span>
              <span className="ml-1 px-1.5 py-0.2 bg-[#2D5A47]/10 text-[#2D5A47] rounded-full text-[11px]">
                {treatments.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("reels")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeTab === "reels"
                  ? "bg-white text-[#2D5A47] shadow-xs font-semibold"
                  : "text-[#5A6878] hover:text-[#162534]"
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Reels</span>
              <span className="ml-1 px-1.5 py-0.2 bg-[#2D5A47]/10 text-[#2D5A47] rounded-full text-[11px]">
                {reels.length}
              </span>
            </button>
          </div>
        </div>

        {/* Loading Spinner */}
        {loadingData && (
          <div className="flex items-center justify-center p-12">
            <RefreshCw className="w-6 h-6 text-[#2D5A47] animate-spin mr-2" />
            <span className="text-sm text-[#5A6878]">Refreshing database contents...</span>
          </div>
        )}

        {/* TAB 1: GALLERY MANAGER */}
        {!loadingData && activeTab === "gallery" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#DDD4C5] shadow-xs">
              <div>
                <h2 className="text-lg font-semibold text-[#162534]">
                  Clinical Gallery Moments ({galleryItems.length} photos)
                </h2>
                <p className="text-xs text-[#6A7888] mt-0.5">
                  Upload photos from events, CMEs, campus lectures, and community drives. Only .webp format allowed.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingGalleryItem(null);
                  setIsNewGalleryOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2D5A47] text-white text-xs sm:text-sm font-medium hover:bg-[#234737] transition-all shadow-xs cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Gallery Photo</span>
              </button>
            </div>

            {/* Gallery Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item, idx) => (
                <div
                  key={item._id || idx}
                  className="bg-white rounded-2xl border border-[#DDD4C5] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
                >
                  <div className="relative aspect-4/3 w-full bg-[#EFE8DC]">
                    <Image
                      src={item.src}
                      alt={item.location || "Gallery photo"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={idx === 0}
                    />
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {item.location ? (
                        <div className="flex items-center gap-1.5 text-xs text-[#162534] font-medium">
                          <MapPin className="w-3.5 h-3.5 text-[#2D5A47] shrink-0" />
                          <span className="truncate">{item.location}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-[#8898AA] italic">No location specified</span>
                      )}
                      <div className="mt-2 text-[10px] text-[#8898AA] font-mono truncate">
                        Path: {item.src}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#EFE8DC] flex items-center justify-between">
                      <button
                        onClick={() => {
                          setEditingGalleryItem(item);
                          setIsNewGalleryOpen(true);
                        }}
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#2D5A47] hover:underline cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDeleteGalleryItem(item._id)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: BLOGS MANAGER */}
        {!loadingData && activeTab === "blogs" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#DDD4C5] shadow-xs">
              <div>
                <h2 className="text-lg font-semibold text-[#162534]">
                  Clinical Articles & Blogs ({blogs.length} articles)
                </h2>
                <p className="text-xs text-[#6A7888] mt-0.5">
                  Publish psychoeducational articles, clinical insights, and patient guides. All images must be .webp.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingBlog(null);
                  setIsNewBlogOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2D5A47] text-white text-xs sm:text-sm font-medium hover:bg-[#234737] transition-all shadow-xs cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Publish New Blog</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, idx) => (
                <div
                  key={blog._id || idx}
                  className="bg-white rounded-2xl border border-[#DDD4C5] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
                >
                  <div className="relative aspect-16/9 w-full bg-[#EFE8DC]">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={idx === 0}
                    />
                    <div className="absolute top-3 left-3 bg-[#2D5A47] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {blog.category}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-[#8898AA] mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {blog.publishedDate}
                        </span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {blog.readTime}
                        </span>
                      </div>

                      <h3 className="font-semibold text-base text-[#162534] line-clamp-2 leading-snug">
                        {blog.title}
                      </h3>

                      <p className="text-xs text-[#4E5D6E] mt-2 line-clamp-2">
                        {blog.excerpt}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1">
                        {blog.tags?.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] bg-[#FAF7F0] text-[#5A6878] border border-[#E8E2D5] px-2 py-0.5 rounded-md"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-[#EFE8DC] flex items-center justify-between">
                      <Link
                        href={`/blogs/${blog.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-xs text-[#4E5D6E] hover:text-[#162534]"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View live</span>
                      </Link>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            setEditingBlog(blog);
                            setIsNewBlogOpen(true);
                          }}
                          className="inline-flex items-center gap-1 text-xs font-medium text-[#2D5A47] hover:underline cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => handleDeleteBlog(blog._id)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-800 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: TREATMENTS MANAGER */}
        {!loadingData && activeTab === "treatments" && (
          isNewTreatmentOpen || editingTreatment ? (
            <TreatmentEditSection
              treatment={editingTreatment}
              onClose={() => {
                setIsNewTreatmentOpen(false);
                setEditingTreatment(null);
              }}
              onSave={handleSaveTreatment}
            />
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#DDD4C5] shadow-xs">
                <div>
                  <h2 className="text-lg font-semibold text-[#162534]">
                    Clinical Treatments Configuration ({treatments.length} core treatments)
                  </h2>
                  <p className="text-xs text-[#6A7888] mt-0.5">
                    Manage clinical treatments, add new clinical services, update summaries, and configure .webp visuals.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingTreatment(null);
                    setIsNewTreatmentOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2D5A47] text-white text-xs sm:text-sm font-medium hover:bg-[#234737] transition-all shadow-xs cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Treatment</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {treatments.map((treat, idx) => (
                  <div
                    key={treat._id || treat.slug || idx}
                    className="bg-white rounded-2xl border border-[#DDD4C5] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-xs font-mono font-bold text-[#C29D59]">
                            TREATMENT {treat.num}
                          </span>
                          <h3 className="font-semibold text-base text-[#162534] mt-0.5">
                            {treat.title}
                          </h3>
                          <p className="text-xs text-[#2D5A47] font-medium">{treat.tagline}</p>
                        </div>
                        <Link
                          href={`/treatments/${treat.slug}`}
                          target="_blank"
                          className="text-[#6A7888] hover:text-[#162534] p-1.5 rounded-lg hover:bg-[#FAF7F0]"
                          title="View Live Treatment Page"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </div>

                      <p className="text-xs text-[#4E5D6E] line-clamp-3">
                        {treat.summary}
                      </p>

                      {/* Images preview row */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="space-y-1">
                          <span className="text-[10px] font-semibold text-[#6A7888] uppercase">
                            Hero Image
                          </span>
                          <div className="relative aspect-4/3 rounded-lg overflow-hidden border border-[#D5CABE] bg-[#EFE8DC]">
                            <Image
                              src={treat.image}
                              alt={treat.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 200px"
                            />
                          </div>
                          <span className="text-[9px] font-mono text-[#8898AA] block truncate">
                            {treat.image}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] font-semibold text-[#6A7888] uppercase">
                            Graphical Diagram
                          </span>
                          <div className="relative aspect-4/3 rounded-lg overflow-hidden border border-[#D5CABE] bg-[#EFE8DC]">
                            <Image
                              src={treat.graphicalImage}
                              alt={treat.graphicalTitle || "Diagram"}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 200px"
                            />
                          </div>
                          <span className="text-[9px] font-mono text-[#8898AA] block truncate">
                            {treat.graphicalImage}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-[#EFE8DC] flex items-center justify-between">
                      <span className="text-xs text-[#6A7888]">
                        Format: <strong className="text-[#162534]">{treat.format}</strong>
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingTreatment(treat);
                            setIsNewTreatmentOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#2D5A47] text-white hover:bg-[#234737] transition-colors cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => handleDeleteTreatment(treat._id, treat.slug)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer border border-red-200"
                          title="Delete Treatment"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}

        {/* TAB 4: REELS MANAGER */}
        {!loadingData && activeTab === "reels" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#DDD4C5] shadow-xs">
              <div>
                <h2 className="text-lg font-semibold text-[#162534] flex items-center gap-2">
                  <Film className="w-5 h-5 text-[#2D5A47]" />
                  <span>Instagram Reels & Psychoeducation ({reels.length} reels)</span>
                </h2>
                <p className="text-xs text-[#6A7888] mt-0.5">
                  Manage client Instagram reels (@manam_mentalhealth), short video clips, captions, and display order.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/manam_mentalhealth/reels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#833AB4] bg-[#833AB4]/10 hover:bg-[#833AB4]/15 border border-[#833AB4]/20 transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[#E1306C]" />
                  <span>Open Instagram Feed</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => {
                    setEditingReel(null);
                    setIsNewReelOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-[#2D5A47] text-white hover:bg-[#234737] transition-all shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add New Reel</span>
                </button>
              </div>
            </div>

            {/* Reels Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {reels.map((reel, idx) => (
                <div
                  key={reel._id || idx}
                  className="bg-white rounded-3xl border border-[#DDD4C5] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* 9:16 Video Thumbnail Container */}
                    <div className="relative aspect-[9/16] w-full bg-[#0D1520] overflow-hidden">
                      <video
                        src={reel.videoUrl}
                        poster={reel.thumbnailUrl}
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold text-white">
                        <InstagramIcon className="w-3 h-3 text-[#FCAF45]" />
                        <span>#{reel.order}</span>
                      </div>

                      <div className="absolute top-3 right-3 flex items-center gap-1">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
                            reel.isActive !== false
                              ? "bg-emerald-500/80 text-white"
                              : "bg-red-500/80 text-white"
                          }`}
                        >
                          {reel.isActive !== false ? "Active" : "Draft"}
                        </span>
                      </div>

                      {/* Bottom Info overlay */}
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        {reel.duration && (
                          <span className="text-[10px] font-mono text-white/70 block mb-1">
                            Duration: {reel.duration}
                          </span>
                        )}
                        <h3 className="font-serif text-sm font-semibold text-white line-clamp-2 leading-snug">
                          {reel.title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <p className="text-xs text-[#5D6D7E] line-clamp-2 font-light">
                        {reel.caption || "No caption provided."}
                      </p>

                      <div className="pt-2 border-t border-[#EFE8DC] flex items-center justify-between text-[11px] text-[#788899]">
                        <span className="truncate max-w-[150px] font-mono text-[10px]">
                          {reel.videoUrl}
                        </span>
                        <a
                          href={reel.instagramUrl || "https://www.instagram.com/manam_mentalhealth/reels/"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#833AB4] hover:underline inline-flex items-center gap-0.5 font-medium"
                        >
                          <span>Instagram</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingReel(reel);
                        setIsNewReelOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#2D5A47] text-white hover:bg-[#234737] transition-colors cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDeleteReel(reel._id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer border border-red-200"
                      title="Delete Reel"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: GALLERY ADD / EDIT */}
      {isNewGalleryOpen && (
        <GalleryFormModal
          item={editingGalleryItem}
          onClose={() => {
            setIsNewGalleryOpen(false);
            setEditingGalleryItem(null);
          }}
          onSave={handleSaveGalleryItem}
        />
      )}

      {/* MODAL: BLOG ADD / EDIT */}
      {isNewBlogOpen && (
        <BlogFormModal
          blog={editingBlog}
          onClose={() => {
            setIsNewBlogOpen(false);
            setEditingBlog(null);
          }}
          onSave={handleSaveBlog}
        />
      )}


      {/* MODAL: REEL ADD / EDIT */}
      {(isNewReelOpen || editingReel) && (
        <ReelFormModal
          reel={editingReel}
          onClose={() => {
            setIsNewReelOpen(false);
            setEditingReel(null);
          }}
          onSave={handleSaveReel}
        />
      )}
    </main>
  );
}

// ==================== MODALS ====================

// 1. Gallery Form Modal
function GalleryFormModal({
  item,
  onClose,
  onSave,
}: {
  item: MongoGalleryItem | null;
  onClose: () => void;
  onSave: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const [imageUrl, setImageUrl] = useState(item?.src || "");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button outside card */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-11 right-0 sm:-right-12 sm:top-0 w-9 h-9 rounded-full bg-white/25 hover:bg-white/40 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-lg border border-white/30 hover:scale-105"
          title="Close (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-white rounded-2xl w-full border border-[#DDD4C5] shadow-2xl p-6 sm:p-8">
          <h2 className="text-xl font-serif font-bold text-[#162534] mb-1">
            {item ? "Edit Gallery Photo" : "Add New Gallery Photo"}
          </h2>
          <p className="text-xs text-[#6A7888] mb-6">
            Upload a .webp photograph and specify its location.
          </p>

          <form onSubmit={onSave} className="space-y-4">
            <input type="hidden" name="src" value={imageUrl} />

            {/* WebP Upload */}
            <WebpUploadBox
              currentImage={imageUrl}
              onUploaded={(url) => setImageUrl(url)}
              label="Photograph (*.webp only)"
            />

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D4D5E] mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                defaultValue={item?.location || ""}
                placeholder="e.g. PDU Medical College, Rajkot"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-[#FAF7F0] text-sm text-[#162534] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]"
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#EFE8DC]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#5A6878] hover:bg-[#FAF7F0] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-[#2D5A47] text-white hover:bg-[#234737] transition-all shadow-xs cursor-pointer"
              >
                {item ? "Update Photo" : "Save Photo"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// 2. Blog Form Modal
function BlogFormModal({
  blog,
  onClose,
  onSave,
}: {
  blog: MongoBlogPost | null;
  onClose: () => void;
  onSave: (payload: Partial<MongoBlogPost>) => void;
}) {
  const [title, setTitle] = useState(blog?.title || "");
  const [slug, setSlug] = useState(blog?.slug || "");
  const [excerpt, setExcerpt] = useState(blog?.excerpt || "");
  const [category, setCategory] = useState(blog?.category || "Anxiety & Mood");
  const [coverImage, setCoverImage] = useState(blog?.image || "");
  const [readTime, setReadTime] = useState(blog?.readTime || "5 min read");
  const [publishedDate, setPublishedDate] = useState(
    blog?.publishedDate ||
      new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })
  );
  const [tags, setTags] = useState(blog?.tags?.join(", ") || "");
  const [takeaways, setTakeaways] = useState<string[]>(
    blog?.keyTakeaways || [
      "Early psychiatric assessment prevents chronic neurochemical distress.",
      "Evidence-based cognitive restructuring yields long-term resilience.",
    ]
  );
  const [sections, setSections] = useState<
    { heading: string; paragraphs: string[] }[]
  >(
    blog?.content || [
      {
        heading: "Introduction & Clinical Overview",
        paragraphs: ["Write comprehensive paragraphs discussing this condition..."],
      },
    ]
  );
  const [clinicalAdvice, setClinicalAdvice] = useState(
    blog?.clinicalAdvice ||
      "If you or a loved one are experiencing persistent symptoms, schedule a confidential psychiatric evaluation with Dr. Bhoomi Raval."
  );

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!blog) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !coverImage) {
      alert("Please enter title and upload a .webp cover image.");
      return;
    }

    onSave({
      _id: blog?._id,
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category,
      image: coverImage,
      readTime,
      publishedDate,
      excerpt,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      keyTakeaways: takeaways.filter(Boolean),
      content: sections,
      clinicalAdvice,
      author: blog?.author || {
        name: "Dr. Bhoomi Raval",
        role: "Consultant Psychiatrist (Gold Medalist)",
        avatar: "/assets/dr_bhoomi_raval.webp",
      },
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button outside card */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-11 right-0 sm:-right-12 sm:top-0 w-9 h-9 rounded-full bg-white/25 hover:bg-white/40 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-lg border border-white/30 hover:scale-105"
          title="Close (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-white rounded-2xl w-full border border-[#DDD4C5] shadow-2xl p-6 sm:p-8 max-h-[85vh] sm:max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-serif font-bold text-[#162534] mb-1">
            {blog ? "Edit Article" : "Write New Clinical Article"}
          </h2>
          <p className="text-xs text-[#6A7888] mb-6">
            Publish an evidence-based clinical article. Featured image must be in .webp format.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Cover image uploader */}
            <WebpUploadBox
              currentImage={coverImage}
              onUploaded={(url) => setCoverImage(url)}
              label="Cover Featured Image (.webp)"
            />

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D4D5E] mb-1">
                Article Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Managing Executive Dysfunction: A Guide to Adult ADHD"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-[#FAF7F0] text-sm text-[#162534] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D4D5E] mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-[#FAF7F0] text-sm text-[#162534] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]"
                >
                  <option value="Anxiety & Mood">Anxiety & Mood</option>
                  <option value="Workplace Wellness">Workplace Wellness</option>
                  <option value="Neurodiversity & ADHD">Neurodiversity & ADHD</option>
                  <option value="Clinical Insights">Clinical Insights</option>
                  <option value="Relationships & Family">Relationships & Family</option>
                  <option value="De-Addiction">De-Addiction</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D4D5E] mb-1">
                  URL Slug (Auto-generated)
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-[#FAF7F0] text-xs font-mono text-[#162534]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D4D5E] mb-1">
                  Reading Time
                </label>
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="5 min read"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-[#FAF7F0] text-sm text-[#162534] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D4D5E] mb-1">
                  Published Date
                </label>
                <input
                  type="text"
                  value={publishedDate}
                  onChange={(e) => setPublishedDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-[#FAF7F0] text-sm text-[#162534] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D4D5E] mb-1">
                Article Excerpt / Teaser
              </label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Short 2-sentence preview of the article shown on blog cards..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-[#FAF7F0] text-sm text-[#162534] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D4D5E] mb-1">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Psychiatry, ADHD, MentalHealth, SelfCare"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-[#FAF7F0] text-sm text-[#162534] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]"
              />
            </div>

            {/* Key Takeaways */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#3D4D5E]">
                  Key Clinical Takeaways (Bullet points)
                </label>
                <button
                  type="button"
                  onClick={() => setTakeaways([...takeaways, ""])}
                  className="text-xs text-[#2D5A47] font-medium hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> Add bullet
                </button>
              </div>
              {takeaways.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const copy = [...takeaways];
                      copy[idx] = e.target.value;
                      setTakeaways(copy);
                    }}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-[#D5CABE] bg-[#FAF7F0] text-xs text-[#162534]"
                    placeholder="Key takeaway..."
                  />
                  {takeaways.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setTakeaways(takeaways.filter((_, i) => i !== idx))}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Article Sections */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#3D4D5E]">
                  Article Content Sections
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setSections([
                      ...sections,
                      { heading: "New Section", paragraphs: ["Paragraph text..."] },
                    ])
                  }
                  className="text-xs text-[#2D5A47] font-medium hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> Add Section
                </button>
              </div>

              <div className="space-y-3">
                {sections.map((sec, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 border border-[#D5CABE] rounded-xl bg-[#FAF7F0] space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={sec.heading}
                        onChange={(e) => {
                          const copy = [...sections];
                          copy[sIdx].heading = e.target.value;
                          setSections(copy);
                        }}
                        placeholder="Section Heading"
                        className="flex-1 px-3 py-1.5 rounded-lg border border-[#D5CABE] bg-white text-xs font-semibold text-[#162534]"
                      />
                      {sections.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setSections(sections.filter((_, i) => i !== sIdx))
                          }
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <textarea
                      rows={3}
                      value={sec.paragraphs.join("\n\n")}
                      onChange={(e) => {
                        const copy = [...sections];
                        copy[sIdx].paragraphs = e.target.value
                          .split("\n\n")
                          .map((p) => p.trim())
                          .filter(Boolean);
                        setSections(copy);
                      }}
                      placeholder="Enter paragraphs (separate paragraphs with blank lines)..."
                      className="w-full px-3 py-2 rounded-lg border border-[#D5CABE] bg-white text-xs text-[#162534]"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D4D5E] mb-1">
                Clinical Advice / Disclaimer Box
              </label>
              <textarea
                rows={2}
                value={clinicalAdvice}
                onChange={(e) => setClinicalAdvice(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-[#FAF7F0] text-sm text-[#162534] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]"
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#EFE8DC]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#5A6878] hover:bg-[#FAF7F0] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-[#2D5A47] text-white hover:bg-[#234737] transition-all shadow-xs cursor-pointer"
              >
                {blog ? "Update Article" : "Publish Article"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// 3. Dedicated Treatment Edit & Add Section (In-page view, No popup)
function TreatmentEditSection({
  treatment,
  onClose,
  onSave,
}: {
  treatment: MongoTreatmentDetail | null;
  onClose: () => void;
  onSave: (payload: Partial<MongoTreatmentDetail>) => void;
}) {
  const isEdit = !!treatment;

  const [title, setTitle] = useState(treatment?.title || "");
  const [shortTitle, setShortTitle] = useState(treatment?.shortTitle || "");
  const [tagline, setTagline] = useState(treatment?.tagline || "");
  const [category, setCategory] = useState(treatment?.category || "Clinical Care");
  const [duration, setDuration] = useState(
    treatment?.duration || "45–60 mins (Initial) • 20–30 mins (Follow-up)"
  );
  const [format, setFormat] = useState(
    treatment?.format || "In-Person (Rajkot) or Secure Online Video"
  );
  const [supervision, setSupervision] = useState(
    treatment?.supervision || "Dr. Bhoomi Raval, MD Psychiatry (Gold Medalist)"
  );
  const [heroImage, setHeroImage] = useState(treatment?.image || "");
  const [graphicalImage, setGraphicalImage] = useState(treatment?.graphicalImage || "");
  const [graphicalTitle, setGraphicalTitle] = useState(
    treatment?.graphicalTitle || "Clinical Principle & Healing Mechanism"
  );
  const [graphicalConcept, setGraphicalConcept] = useState(
    treatment?.graphicalConcept || ""
  );
  const [graphicalPoints, setGraphicalPoints] = useState<{ label: string; text: string }[]>(
    treatment?.graphicalPoints && treatment.graphicalPoints.length > 0
      ? treatment.graphicalPoints
      : [
          {
            label: "Identifying Triggers",
            text: "Distinguishing between situational life stressors and biological neurochemical vulnerabilities.",
          },
          {
            label: "Mind-Body Dialogue",
            text: "Understanding how emotional anxiety directly creates physical muscle tension, rapid heartbeats, and fatigue.",
          },
          {
            label: "Clear Recovery Blueprint",
            text: "Crafting a structured, step-by-step roadmap from confusion to emotional equilibrium and resilience.",
          },
        ]
  );
  const [summary, setSummary] = useState(treatment?.summary || "");
  const [clinicalPhilosophy, setClinicalPhilosophy] = useState(
    treatment?.clinicalPhilosophy || ""
  );
  const [highlights, setHighlights] = useState<string[]>(
    treatment?.keyHighlights && treatment.keyHighlights.length > 0
      ? treatment.keyHighlights
      : [
          "Comprehensive diagnostic psychiatric consultation",
          "Evidence-based therapeutic interventions and medication management",
        ]
  );

  // Journey Steps State (What to Expect Step-by-Step)
  const [journeySteps, setJourneySteps] = useState<
    { step: string; title: string; description: string; duration: string }[]
  >(
    treatment?.journeySteps && treatment.journeySteps.length > 0
      ? treatment.journeySteps
      : [
          {
            step: "01",
            title: "Initial Diagnostic Consultation",
            description:
              "Comprehensive evaluation exploring emotional history, symptom onset, and personalized clinical goals.",
            duration: "45–60 mins",
          },
          {
            step: "02",
            title: "Personalized Protocol",
            description:
              "Tailored evidence-based medical and psychological care plan with ongoing progress monitoring.",
            duration: "Ongoing",
          },
        ]
  );

  // FAQs State
  const [faqs, setFaqs] = useState<{ q: string; a: string }[]>(
    treatment?.faqs && treatment.faqs.length > 0
      ? treatment.faqs
      : [
          {
            q: "How do I know if this treatment is right for me?",
            a: "During your initial consultation, Dr. Bhoomi Raval performs a comprehensive diagnostic assessment to determine the most effective and gentle care pathway for you.",
          },
          {
            q: "How many sessions are typically required?",
            a: "Treatment duration varies based on the specific condition and recovery progress. A personalized roadmap will be discussed in your consultation.",
          },
        ]
  );

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Treatment title is required.");
      return;
    }

    if (!heroImage.trim()) {
      setError("Hero image (.webp only) is required. Please upload an image.");
      return;
    }

    onSave({
      ...(treatment?._id ? { _id: treatment._id } : {}),
      ...(treatment?.slug ? { slug: treatment.slug } : {}),
      title: title.trim(),
      shortTitle: shortTitle.trim() || title.trim(),
      tagline: tagline.trim(),
      category: category.trim(),
      duration: duration.trim(),
      format: format.trim(),
      supervision: supervision.trim(),
      image: heroImage.trim(),
      graphicalImage: graphicalImage.trim() || heroImage.trim(),
      graphicalTitle: graphicalTitle.trim(),
      graphicalConcept: graphicalConcept.trim(),
      graphicalPoints: graphicalPoints.filter(
        (p) => p.label.trim() || p.text.trim()
      ),
      summary: summary.trim(),
      clinicalPhilosophy: clinicalPhilosophy.trim(),
      keyHighlights: highlights.map((h) => h.trim()).filter(Boolean),
      journeySteps: journeySteps.filter(
        (s) => s.title.trim() || s.description.trim()
      ),
      faqs: faqs.filter((f) => f.q.trim() || f.a.trim()),
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-[#DDD4C5] p-6 sm:p-10 shadow-xs space-y-8">
      {/* Top Header & Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DDD4C5]">
        <div className="space-y-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#D5CABE] bg-[#FAF7F0] hover:bg-[#EFE8DC] text-xs font-semibold text-[#162534] transition-all cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#2D5A47]" />
            <span>Back to Treatments</span>
          </button>

          <div>
            {isEdit ? (
              <>
                <span className="text-xs font-mono font-bold text-[#C29D59]">
                  TREATMENT {treatment.num}
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#162534]">
                  Edit Treatment: {treatment.title}
                </h2>
                <p className="text-xs text-[#6A7888]">
                  Update clinical descriptions, pathway steps, FAQs, and .webp visuals.
                </p>
              </>
            ) : (
              <>
                <span className="text-xs font-mono font-bold text-[#2D5A47] uppercase tracking-wider">
                  New Treatment Service
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#162534]">
                  Add New Clinical Treatment
                </h2>
                <p className="text-xs text-[#6A7888]">
                  Provide treatment details, pathway steps, FAQs, and upload high-quality .webp images.
                </p>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-[#5A6878] hover:bg-[#FAF7F0] transition-colors cursor-pointer border border-transparent hover:border-[#D5CABE]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-[#2D5A47] text-white hover:bg-[#234737] transition-all shadow-xs cursor-pointer flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>{isEdit ? "Save Treatment Changes" : "Add Clinical Treatment"}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-200">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* SECTION 1: CORE SPECIFICATIONS */}
        <div className="p-6 rounded-2xl border border-[#DDD4C5] bg-[#FAF7F0] space-y-5">
          <div className="border-b border-[#E8E2D5] pb-3">
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#2D5A47] block">
              Section 1: General Specifications
            </span>
            <h3 className="text-base font-semibold text-[#162534]">
              Basic Clinical Information
            </h3>
          </div>

          {/* Title & Short Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D4D5E] mb-1">
                Treatment Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Adult ADHD & Executive Functioning"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-white text-sm text-[#162534] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D4D5E] mb-1">
                Short / Navigation Title
              </label>
              <input
                type="text"
                value={shortTitle}
                onChange={(e) => setShortTitle(e.target.value)}
                placeholder="e.g. Adult ADHD"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-white text-sm text-[#162534] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]"
              />
            </div>
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D4D5E] mb-1">
              Tagline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Comprehensive psychiatric diagnosis and restorative care"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-white text-sm text-[#162534] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]"
            />
          </div>

          {/* Category & Format */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D4D5E] mb-1">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Clinical Care"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-white text-sm text-[#162534] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D4D5E] mb-1">
                Consultation Format
              </label>
              <input
                type="text"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                placeholder="In-Person (Rajkot) or Secure Online Video"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-white text-sm text-[#162534] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]"
              />
            </div>
          </div>

          {/* Duration & Lead Supervision */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D4D5E] mb-1">
                Session Duration
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="45–60 mins (Initial) • 20–30 mins (Follow-up)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-white text-sm text-[#162534] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D4D5E] mb-1">
                Clinical Supervision & Lead Doctor
              </label>
              <input
                type="text"
                value={supervision}
                onChange={(e) => setSupervision(e.target.value)}
                placeholder="Dr. Bhoomi Raval, MD Psychiatry (Gold Medalist)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-white text-sm text-[#162534] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: IMAGES (.WEBP ONLY) */}
        <div className="p-6 rounded-2xl border border-[#DDD4C5] bg-[#FAF7F0] space-y-5">
          <div className="border-b border-[#E8E2D5] pb-3">
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#2D5A47] block">
              Section 2: Treatment Visuals
            </span>
            <h3 className="text-base font-semibold text-[#162534]">
              High-Resolution Visual Assets (.webp only)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <WebpUploadBox
              currentImage={heroImage}
              onUploaded={(url) => setHeroImage(url)}
              label="Hero Image (.webp)"
            />

            <WebpUploadBox
              currentImage={graphicalImage}
              onUploaded={(url) => setGraphicalImage(url)}
              label="Graphical Concept Diagram (.webp)"
            />
          </div>
        </div>

        {/* SECTION 3: OVERVIEW & PHILOSOPHY */}
        <div className="p-6 rounded-2xl border border-[#DDD4C5] bg-[#FAF7F0] space-y-5">
          <div className="border-b border-[#E8E2D5] pb-3">
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#2D5A47] block">
              Section 3: Clinical Content
            </span>
            <h3 className="text-base font-semibold text-[#162534]">
              Summary, Philosophy & Highlights
            </h3>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D4D5E] mb-1">
              Treatment Summary Overview
            </label>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Provide an overview of this treatment, symptoms addressed, and therapeutic process..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-white text-sm text-[#162534] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D4D5E] mb-1">
              Clinical Philosophy
            </label>
            <textarea
              rows={3}
              value={clinicalPhilosophy}
              onChange={(e) => setClinicalPhilosophy(e.target.value)}
              placeholder="Our clinical philosophy for this treatment..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-white text-sm text-[#162534] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]"
            />
          </div>

          {/* Highlights */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#3D4D5E]">
                Key Clinical Highlights
              </label>
              <button
                type="button"
                onClick={() => setHighlights([...highlights, ""])}
                className="text-xs text-[#2D5A47] font-medium hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Highlight
              </button>
            </div>
            <div className="space-y-2">
              {highlights.map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={hl}
                    onChange={(e) => {
                      const copy = [...highlights];
                      copy[idx] = e.target.value;
                      setHighlights(copy);
                    }}
                    className="flex-1 px-3.5 py-2 rounded-xl border border-[#D5CABE] bg-white text-xs sm:text-sm text-[#162534]"
                    placeholder="Clinical highlight..."
                  />
                  {highlights.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setHighlights(highlights.filter((_, i) => i !== idx))}
                      className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 cursor-pointer"
                      title="Remove Highlight"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 4: HOW HEALING WORKS */}
        <div className="p-6 rounded-2xl border border-[#DDD4C5] bg-[#FAF7F0] space-y-5">
          <div className="border-b border-[#E8E2D5] pb-3">
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#2D5A47] block">
              Section 4: Diagram Mechanism
            </span>
            <h3 className="text-base font-semibold text-[#162534]">
              How Healing Works Breakdown Cards
            </h3>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D4D5E] mb-1">
              Healing Section Heading
            </label>
            <input
              type="text"
              value={graphicalTitle}
              onChange={(e) => setGraphicalTitle(e.target.value)}
              placeholder="e.g. From Emotional Overwhelm to Structured Clarity"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-white text-sm text-[#162534] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D4D5E] mb-1">
              Concept Educational Explanation (Paragraph)
            </label>
            <textarea
              rows={3}
              value={graphicalConcept}
              onChange={(e) => setGraphicalConcept(e.target.value)}
              placeholder="e.g. When experiencing mental distress, thoughts, worries, and physical tensions often feel like an overwhelming tangled knot..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-white text-sm text-[#162534] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#3D4D5E]">
                Healing Mechanism Breakdown Cards
              </label>
              <button
                type="button"
                onClick={() =>
                  setGraphicalPoints([
                    ...graphicalPoints,
                    { label: "", text: "" },
                  ])
                }
                className="text-xs text-[#2D5A47] font-medium hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Breakdown Card
              </button>
            </div>

            <div className="space-y-3">
              {graphicalPoints.map((point, ptIdx) => (
                <div
                  key={ptIdx}
                  className="p-4 border border-[#D5CABE] rounded-xl bg-white space-y-2 shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-3">
                    <input
                      type="text"
                      value={point.label}
                      onChange={(e) => {
                        const copy = [...graphicalPoints];
                        copy[ptIdx] = { ...copy[ptIdx], label: e.target.value };
                        setGraphicalPoints(copy);
                      }}
                      placeholder="Card Title (e.g. Identifying Triggers, Mind-Body Dialogue)"
                      className="flex-1 px-3 py-2 rounded-lg border border-[#D5CABE] bg-[#FAF7F0] text-xs font-semibold text-[#162534]"
                    />
                    {graphicalPoints.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setGraphicalPoints(
                            graphicalPoints.filter((_, i) => i !== ptIdx)
                          )
                        }
                        className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 cursor-pointer shrink-0"
                        title="Remove Card"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <textarea
                    rows={2}
                    value={point.text}
                    onChange={(e) => {
                      const copy = [...graphicalPoints];
                      copy[ptIdx] = { ...copy[ptIdx], text: e.target.value };
                      setGraphicalPoints(copy);
                    }}
                    placeholder="Card Description..."
                    className="w-full px-3 py-2 rounded-lg border border-[#D5CABE] bg-[#FAF7F0] text-xs text-[#162534]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 5: STEP-BY-STEP CARE PATHWAY (JOURNEY STEPS) */}
        <div className="p-6 rounded-2xl border border-[#DDD4C5] bg-[#FAF7F0] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E2D5] pb-3">
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#2D5A47] block">
                Section 5: Care Journey Steps
              </span>
              <h3 className="text-base font-semibold text-[#162534]">
                What to Expect Step-by-Step Pathway
              </h3>
              <p className="text-xs text-[#6A7888] mt-0.5">
                Control the clinical pathway steps displayed on the treatment detail page (Step 01, Step 02, etc.).
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const nextNum = String(journeySteps.length + 1).padStart(2, "0");
                setJourneySteps([
                  ...journeySteps,
                  { step: nextNum, title: "", description: "", duration: "" },
                ]);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2D5A47] text-white text-xs font-medium hover:bg-[#234737] transition-all cursor-pointer shadow-xs shrink-0 self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Journey Step</span>
            </button>
          </div>

          <div className="space-y-4">
            {journeySteps.map((stepItem, sIdx) => (
              <div
                key={sIdx}
                className="p-4 sm:p-5 border border-[#D5CABE] rounded-2xl bg-white space-y-3 shadow-2xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  {/* Step Number */}
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#6A7888] mb-1">
                      Step #
                    </label>
                    <input
                      type="text"
                      value={stepItem.step}
                      onChange={(e) => {
                        const copy = [...journeySteps];
                        copy[sIdx] = { ...copy[sIdx], step: e.target.value };
                        setJourneySteps(copy);
                      }}
                      placeholder="01"
                      className="w-full px-3 py-2 rounded-lg border border-[#D5CABE] bg-[#FAF7F0] text-xs font-mono font-bold text-[#C29D59]"
                    />
                  </div>

                  {/* Step Title */}
                  <div className="sm:col-span-6">
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#6A7888] mb-1">
                      Step Title
                    </label>
                    <input
                      type="text"
                      value={stepItem.title}
                      onChange={(e) => {
                        const copy = [...journeySteps];
                        copy[sIdx] = { ...copy[sIdx], title: e.target.value };
                        setJourneySteps(copy);
                      }}
                      placeholder="e.g. Pre-Anesthetic Clearance & Workup"
                      className="w-full px-3 py-2 rounded-lg border border-[#D5CABE] bg-[#FAF7F0] text-xs font-semibold text-[#162534]"
                    />
                  </div>

                  {/* Duration / Timing */}
                  <div className="sm:col-span-3">
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#6A7888] mb-1">
                      Timing / Duration
                    </label>
                    <input
                      type="text"
                      value={stepItem.duration}
                      onChange={(e) => {
                        const copy = [...journeySteps];
                        copy[sIdx] = { ...copy[sIdx], duration: e.target.value };
                        setJourneySteps(copy);
                      }}
                      placeholder="e.g. 45–60 mins / Pre-Procedure"
                      className="w-full px-3 py-2 rounded-lg border border-[#D5CABE] bg-[#FAF7F0] text-xs text-[#2D5A47] font-medium"
                    />
                  </div>

                  {/* Delete Button */}
                  <div className="sm:col-span-1 flex justify-end items-end sm:pt-4">
                    {journeySteps.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setJourneySteps(journeySteps.filter((_, i) => i !== sIdx))
                        }
                        className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 cursor-pointer"
                        title="Delete Step"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Step Description */}
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#6A7888] mb-1">
                    Step Clinical Description
                  </label>
                  <textarea
                    rows={2}
                    value={stepItem.description}
                    onChange={(e) => {
                      const copy = [...journeySteps];
                      copy[sIdx] = { ...copy[sIdx], description: e.target.value };
                      setJourneySteps(copy);
                    }}
                    placeholder="Waking up naturally in recovery under close nurse observation. Ready for light breakfast within 45–60 minutes..."
                    className="w-full px-3 py-2 rounded-lg border border-[#D5CABE] bg-[#FAF7F0] text-xs text-[#162534] leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 6: FAQS CONTENT */}
        <div className="p-6 rounded-2xl border border-[#DDD4C5] bg-[#FAF7F0] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E2D5] pb-3">
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#2D5A47] block">
                Section 6: Treatment FAQs
              </span>
              <h3 className="text-base font-semibold text-[#162534]">
                Frequently Asked Questions & Answers
              </h3>
              <p className="text-xs text-[#6A7888] mt-0.5">
                Control questions and answers displayed in the FAQ section of this treatment page.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setFaqs([...faqs, { q: "", a: "" }]);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2D5A47] text-white text-xs font-medium hover:bg-[#234737] transition-all cursor-pointer shadow-xs shrink-0 self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add FAQ Question</span>
            </button>
          </div>

          <div className="space-y-4">
            {faqs.map((faqItem, fIdx) => (
              <div
                key={fIdx}
                className="p-4 sm:p-5 border border-[#D5CABE] rounded-2xl bg-white space-y-3 shadow-2xs"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#6A7888] mb-1">
                      Question #{fIdx + 1}
                    </label>
                    <input
                      type="text"
                      value={faqItem.q}
                      onChange={(e) => {
                        const copy = [...faqs];
                        copy[fIdx] = { ...copy[fIdx], q: e.target.value };
                        setFaqs(copy);
                      }}
                      placeholder="e.g. Does modern ECT hurt or cause convulsions?"
                      className="w-full px-3 py-2 rounded-lg border border-[#D5CABE] bg-[#FAF7F0] text-xs sm:text-sm font-semibold text-[#162534]"
                    />
                  </div>

                  {faqs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setFaqs(faqs.filter((_, i) => i !== fIdx))}
                      className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 cursor-pointer shrink-0 mt-4"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#6A7888] mb-1">
                    Clinical Answer
                  </label>
                  <textarea
                    rows={3}
                    value={faqItem.a}
                    onChange={(e) => {
                      const copy = [...faqs];
                      copy[fIdx] = { ...copy[fIdx], a: e.target.value };
                      setFaqs(copy);
                    }}
                    placeholder="Provide a detailed, compassionate clinical response..."
                    className="w-full px-3 py-2 rounded-lg border border-[#D5CABE] bg-[#FAF7F0] text-xs sm:text-sm text-[#162534] leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#DDD4C5]">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#D5CABE] bg-[#FAF7F0] hover:bg-[#EFE8DC] text-xs font-semibold text-[#162534] transition-all cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#2D5A47]" />
            <span>Back to Treatments</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-[#5A6878] hover:bg-[#FAF7F0] transition-colors cursor-pointer border border-[#D5CABE]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-[#2D5A47] text-white hover:bg-[#234737] transition-all shadow-xs cursor-pointer flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{isEdit ? "Save Treatment Changes" : "Add Clinical Treatment"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// 4. Instagram Reel Form Modal
function ReelFormModal({
  reel,
  onClose,
  onSave,
}: {
  reel: MongoReel | null;
  onClose: () => void;
  onSave: (reelPayload: Partial<MongoReel>) => void;
}) {
  const [videoUrl, setVideoUrl] = useState(reel?.videoUrl || "");
  const [thumbnailUrl, setThumbnailUrl] = useState(reel?.thumbnailUrl || "");
  const [title, setTitle] = useState(reel?.title || "");
  const [caption, setCaption] = useState(reel?.caption || "");
  const [instagramUrl, setInstagramUrl] = useState(
    reel?.instagramUrl || ""
  );
  const [viewsCount, setViewsCount] = useState(reel?.viewsCount || "");
  const [duration, setDuration] = useState(reel?.duration || "");
  const [order, setOrder] = useState<number>(reel?.order ?? 1);
  const [isActive, setIsActive] = useState<boolean>(reel?.isActive ?? true);
  const [validationError, setValidationError] = useState<string | null>(null);

  const [fetchingFromInsta, setFetchingFromInsta] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const isEdit = !!reel?._id;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleFetchFromInsta = async (customUrl?: string) => {
    const targetUrl = (customUrl || instagramUrl || "").trim();
    if (!targetUrl || !targetUrl.includes("instagram.com")) {
      setValidationError("Please paste a valid Instagram Reel link (e.g. https://www.instagram.com/reel/...).");
      return;
    }

    setValidationError(null);
    setFetchingFromInsta(true);
    setImportStatus("Connecting to Instagram & downloading original reel video...");

    try {
      const res = await fetch("/api/admin/reels/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch reel from Instagram");
      }

      const r = data.reel;
      if (r.videoUrl) setVideoUrl(r.videoUrl);
      if (r.thumbnailUrl) setThumbnailUrl(r.thumbnailUrl);
      if (r.title && (!title || title.startsWith("Video by") || title === "Instagram Reel")) {
        setTitle(r.title);
      }
      if (r.caption) setCaption(r.caption);
      if (r.duration) setDuration(r.duration);
      if (r.viewsCount) setViewsCount(r.viewsCount);
      setImportStatus("✅ Original Instagram reel video & details downloaded successfully!");
      setTimeout(() => setImportStatus(null), 5000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error importing from Instagram";
      setValidationError(msg);
      setImportStatus(null);
    } finally {
      setFetchingFromInsta(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    let activeVideo = videoUrl.trim();
    let activeTitle = title.trim();
    let activeThumb = thumbnailUrl.trim();
    let activeCaption = caption.trim();

    // If admin pasted Instagram link but didn't click Fetch, auto-fetch during submit
    if (!activeVideo && instagramUrl.trim() && instagramUrl.includes("instagram.com")) {
      setFetchingFromInsta(true);
      setImportStatus("Auto-importing reel from Instagram link...");
      try {
        const res = await fetch("/api/admin/reels/import", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: instagramUrl.trim() }),
        });
        const data = await res.json();
        if (res.ok && data.success && data.reel) {
          activeVideo = data.reel.videoUrl || activeVideo;
          activeThumb = data.reel.thumbnailUrl || activeThumb;
          if (!activeTitle) activeTitle = data.reel.title;
          if (!activeCaption) activeCaption = data.reel.caption;
        }
      } catch (err) {
        console.error("Auto import error:", err);
      } finally {
        setFetchingFromInsta(false);
        setImportStatus(null);
      }
    }

    if (!activeVideo && !instagramUrl.trim()) {
      setValidationError("Please enter an Instagram Reel link or upload a video.");
      return;
    }

    onSave({
      _id: reel?._id,
      title: activeTitle || "Instagram Reel by Dr. Bhoomi Raval",
      caption: activeCaption,
      videoUrl: activeVideo,
      thumbnailUrl: activeThumb || undefined,
      instagramUrl: instagramUrl.trim() || "https://www.instagram.com/manam_mentalhealth/reels/",
      viewsCount: viewsCount.trim() || undefined,
      duration: duration.trim() || undefined,
      order: Number(order) || 0,
      isActive,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button outside card */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-11 right-0 sm:-right-12 sm:top-0 w-9 h-9 rounded-full bg-white/25 hover:bg-white/40 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-lg border border-white/30 hover:scale-105"
          title="Close (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-white rounded-2xl w-full border border-[#DDD4C5] shadow-2xl p-6 sm:p-8 max-h-[85vh] sm:max-h-[90vh] overflow-y-auto">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-pink-100 text-[#E1306C]">
              <InstagramIcon className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-serif font-bold text-[#162534]">
              {isEdit ? "Edit Instagram Reel" : "Add Instagram Reel"}
            </h2>
          </div>
          <p className="text-xs text-[#6A7888] mb-6">
            Simply paste any reel link from @manam_mentalhealth. The system will automatically download and display the authentic video.
          </p>

          {validationError && (
            <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 1. Quick Instagram Link Import (Primary Action) */}
            <div className="p-4 rounded-2xl bg-linear-to-br from-[#FAF0F5] via-[#FFF9F5] to-[#F7F3EA] border-2 border-[#E1306C]/30 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#162534] flex items-center gap-1.5">
                  <InstagramIcon className="w-4 h-4 text-[#E1306C]" />
                  <span>Instagram Reel Link</span>
                  <span className="text-[10px] font-semibold text-[#E1306C] lowercase">(paste & auto-import)</span>
                </label>
                <span className="text-[10px] bg-[#E1306C]/10 text-[#E1306C] font-semibold px-2 py-0.5 rounded-full">
                  1-Click Auto Import
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  placeholder="https://www.instagram.com/reel/..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-white text-sm text-[#162534] focus:outline-none focus:ring-2 focus:ring-[#E1306C]"
                />
                <button
                  type="button"
                  onClick={() => handleFetchFromInsta()}
                  disabled={fetchingFromInsta || !instagramUrl.trim()}
                  className="px-4 py-2.5 rounded-xl bg-linear-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] hover:opacity-90 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0"
                >
                  {fetchingFromInsta ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Fetching Reel...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Fetch from Instagram</span>
                    </>
                  )}
                </button>
              </div>

              {importStatus && (
                <p className="text-xs text-[#2D5A47] font-medium flex items-center gap-1.5 pt-1">
                  <span>{importStatus}</span>
                </p>
              )}
              <p className="text-[11px] text-[#718096] font-light">
                Paste any reel URL from <strong>@manam_mentalhealth</strong>. We automatically download the high-resolution video and thumbnail.
              </p>
            </div>

            {/* Video Preview if available */}
            {videoUrl && (
              <div className="p-3 rounded-xl bg-[#0D1520] text-white flex items-center gap-4">
                <div className="relative w-16 h-24 rounded-lg overflow-hidden bg-black shrink-0 border border-white/20">
                  <video
                    src={videoUrl}
                    poster={thumbnailUrl}
                    className="w-full h-full object-cover"
                    muted
                    autoPlay
                    loop
                    playsInline
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/80 text-white">
                      Downloaded Video Active
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-white truncate">
                    {title || "Reel Video Ready"}
                  </p>
                  <p className="text-[11px] text-white/70 font-mono truncate">
                    {videoUrl}
                  </p>
                </div>
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D4D5E] mb-1">
                Reel Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 3 Signs of High-Functioning Anxiety"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-[#FAF7F0] text-sm text-[#162534] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]"
              />
            </div>

            {/* Caption */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D4D5E] mb-1">
                Caption / Psychoeducation Summary
              </label>
              <textarea
                rows={3}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Brief summary of the reel..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-[#FAF7F0] text-sm text-[#162534] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]"
              />
            </div>

            {/* Metrics & Ordering Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D4D5E] mb-1">
                  Views Badge
                </label>
                <input
                  type="text"
                  value={viewsCount}
                  onChange={(e) => setViewsCount(e.target.value)}
                  placeholder="e.g. 14.8K"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-[#FAF7F0] text-sm text-[#162534] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D4D5E] mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 0:45"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-[#FAF7F0] text-sm text-[#162534] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D4D5E] mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  min={1}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABE] bg-[#FAF7F0] text-sm text-[#162534] focus:outline-none focus:ring-2 focus:ring-[#2D5A47]"
                />
              </div>
            </div>

            {/* Visibility Toggle */}
            <div className="flex items-center gap-3 pt-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D5A47]"></div>
              </label>
              <span className="text-xs font-medium text-[#3D4D5E]">
                {isActive ? "Visible on Homepage" : "Hidden (Draft)"}
              </span>
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#EFE8DC]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#5A6878] hover:bg-[#FAF7F0] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={fetchingFromInsta}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-[#2D5A47] text-white hover:bg-[#234737] transition-all shadow-xs cursor-pointer flex items-center gap-2 disabled:opacity-50"
              >
                {fetchingFromInsta ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing Reel...</span>
                  </>
                ) : (
                  <span>{isEdit ? "Save Reel Changes" : "Publish Reel"}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
