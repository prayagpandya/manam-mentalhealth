import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "@/context/BookingContext";

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://manammentalhealth.com"),
  title: "MANAM | Dr. Bhoomi Raval - Consultant Psychiatrist (Gold Medalist)",
  description:
    "Pause. Reflect. Heal. Consultant Psychiatrist in Rajkot & Online Consultations. Psychiatric assessment, evidence-based treatment, and psychotherapy.",
  keywords: [
    "Dr. Bhoomi Raval",
    "Psychiatrist Rajkot",
    "MANAM Mental Health",
    "Psychotherapy Rajkot",
    "CBT",
    "Mental Health Consultation",
    "Psychiatrist Gold Medalist",
  ],
  icons: {
    icon: "/assets/manam-favicon.ico",
    shortcut: "/assets/manam-favicon.ico",
    apple: "/assets/manam-favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${plusJakartaSans.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen bg-[#F7F3EA] text-[#1D2A3A] font-sans antialiased selection:bg-[#2D5A47]/15 selection:text-[#182333]">
        <BookingProvider>
          {children}
        </BookingProvider>
      </body>
    </html>
  );
}
