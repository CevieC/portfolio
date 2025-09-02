import type { Metadata } from "next";
import "./globals.css";
import { JetBrains_Mono } from "next/font/google";

const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Ceci // Portfolio",
  description: "Monochrome tech-portfolio with a terminal chatbot.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${jetbrains.variable} bg-neutral-950 text-neutral-200 font-mono`}>
        {children}
      </body>
    </html>
  );
}