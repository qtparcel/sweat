import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sweat",
  description: "Workout Logger",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">


        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <ClerkLoading>
              <div className="fixed top-0 left-0 w-screen h-screen bg-white flex justify-center items-center">
                <p className="text-2xl font-bold text-gray-800">Loading...</p>
              </div>
            </ClerkLoading>
            <ClerkLoaded>
          {children}
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
