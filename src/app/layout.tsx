import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { Navbar } from "../components/layout/navbar";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-raw",
  weight: ["500", "600", "700"],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body-raw",
  weight: ["400", "500", "600"],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-raw",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Toolery — Fast tools for developers",
  description: "Fast, focused developer tools that run entirely in your browser.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${ibmPlexSans.variable} ${jetBrainsMono.variable}`}
    >
      <body className="font-body antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}