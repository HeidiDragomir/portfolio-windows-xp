import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Heidi Dragomir – Portfolio (Windows XP)",
  description:
    "Heidi Dragomir – .NET Systems Developer / Fullstack Developer. An interactive Windows XP–style portfolio.",
  icons: {
    icon: "/assets/Windows%20XP%20Icons/My%20Computer.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // The desktop is a fixed OS surface — disable user zoom/pan so it can't be
  // dragged around on touch devices.
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
