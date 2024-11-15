import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Provider from "@/lib/provider";
import { ThemeProvider } from "next-themes";

const geistSans = localFont({
  src: "/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Saas Application",
  description: "Saas Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} ${geistMono.className}`}>
        <ThemeProvider attribute="class">
        <Provider>
          {children}

          <Toaster richColors closeButton />
        </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
