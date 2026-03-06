import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InfraRed API Documentation",
  description: "Document extraction, fraud detection, and document collection APIs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 font-sans text-slate-1200 antialiased">
        {children}
      </body>
    </html>
  );
}
