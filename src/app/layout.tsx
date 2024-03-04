import type { Metadata } from "next";
import "./globals.css";
import "reactflow/dist/style.css";

import { Inter as FontSans } from "next/font/google";
import { cn } from "@/shared/ui/utils";
import { AppProvider } from "./_providers/app-provider";
import { Toaster } from "@/shared/ui/toaster";

export const metadata: Metadata = {
  title: "Micro courses",
  description:
    "Изучай только то, что тебе нужно. Ищи на карте, составляй роадмап",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        {/* polifils */}
        <script
          src="https://unpkg.com/@ungap/global-this@0.4.4/min.js"
          noModule
          async
        ></script>
      </head>

      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontSans.variable,
        )}
      >
        <AppProvider>{children}</AppProvider>
        <Toaster />
      </body>
    </html>
  );
}
