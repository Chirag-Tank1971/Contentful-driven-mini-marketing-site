import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Contentful-driven mini marketing site",
  description: "Mini marketing site powered by Next.js and Contentful.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50`}
      >
        <div className="flex min-h-screen justify-center px-4 py-8">
          <div className="flex w-full max-w-4xl flex-col">
            <header className="mb-8 flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
              <Link href="/" className="text-lg font-semibold tracking-tight">
              Contentful-driven mini marketing site

              </Link>
              <nav className="flex gap-4 text-sm font-medium text-zinc-600 dark:text-zinc-300">
                <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-50">
                  Home
                </Link>
                <Link href="/blog" className="hover:text-zinc-900 dark:hover:text-zinc-50">
                  Blog
                </Link>
              </nav>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="mt-12 border-t border-zinc-200 pt-4 text-xs text-zinc-500 dark:border-zinc-800">
              <p>Built with Next.js, Contentful, Tailwind, and shadcn-style UI.</p>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}

