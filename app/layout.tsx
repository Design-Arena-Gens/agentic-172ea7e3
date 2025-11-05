import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vietnamese Portrait Generator",
  description: "Generate photorealistic Vietnamese portraits with wild sunflowers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
