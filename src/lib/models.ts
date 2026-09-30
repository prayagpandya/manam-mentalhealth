export interface MongoGalleryItem {
  _id?: string;
  src: string;
  location: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface MongoBlogPost {
  _id?: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  readTime: string;
  publishedDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
  keyTakeaways: string[];
  content: {
    heading: string;
    paragraphs: string[];
  }[];
  clinicalAdvice: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MongoServiceDetail {
  _id?: string;
  slug: string;
  num: string;
  title: string;
  shortTitle: string;
  tagline: string;
  category: string;
  image: string;
  altText: string;
  duration: string;
  format: string;
  supervision: string;
  summary: string;
  clinicalPhilosophy: string;
  keyHighlights: string[];
  graphicalImage: string;
  graphicalTitle: string;
  graphicalConcept: string;
  graphicalPoints: { label: string; text: string }[];
  indicationsTitle: string;
  indications: {
    title: string;
    description: string;
  }[];
  journeySteps: {
    step: string;
    title: string;
    description: string;
    duration: string;
  }[];
  whatToExpect: string[];
  faqs: {
    q: string;
    a: string;
  }[];
  nextSlug?: string;
  prevSlug?: string;
  updatedAt?: string;
}

export type MongoTreatmentDetail = MongoServiceDetail;

export interface MongoReel {
  _id?: string;
  title: string;
  caption: string;
  videoUrl: string;
  thumbnailUrl?: string;
  instagramUrl?: string;
  order: number;
  isActive: boolean;
  duration?: string;
  viewsCount?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const COLLECTIONS = {
  GALLERY: "gallery",
  BLOGS: "blogs",
  SERVICES: "treatments",
  TREATMENTS: "treatments",
  REELS: "reels",
} as const;
