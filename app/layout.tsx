import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Staad",
  description:
    "Staad — an online therapy platform giving therapists and clients an interactive workspace with real-time therapeutic modules. Therapy that moves with you.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
