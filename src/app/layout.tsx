import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VANTAGE — Opportunity Intelligence Platform",
  description:
    "AI-powered Opportunity Intelligence Platform that discovers, evaluates, connects, and prioritizes opportunities using historical intelligence, current signals, cross-domain analysis, future scenarios, and personal fit.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full bg-[#07090e] text-[#f8fafc] font-sans">
        {children}
      </body>
    </html>
  );
}
