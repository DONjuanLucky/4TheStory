import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { CommandPalette } from "@/components/CommandPalette";
import { NotificationToast } from "@/components/NotificationToast";

export const metadata: Metadata = {
  title: "TribeCode — AI Platform",
  description: "Personal AI assistant platform powered by OpenClaw and Antfarm",
  icons: { icon: "/tribecode-icon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Sidebar />
        <CommandPalette />
        <NotificationToast />
        <main className="ml-64 min-h-screen">
          <div className="max-w-7xl mx-auto px-8 py-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
