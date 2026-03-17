import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AWS Mainframe Conference — Schedule",
  description:
    "Two-day conference schedule for AWS Mainframe Modernization sessions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
