import type { Metadata, Viewport } from "next";
import { Header } from "@/components/shared/Header";
import { BackgroundGlow } from "@/components/shared/BackgroundGlow";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pelunas: Perencana Pelunasan Utang Realistis",
  description:
    "Hitung urutan prioritas pelunasan paylater, kartu kredit, dan pinjol dengan strategi Snowball dan Avalanche yang transparan dan bebas penghakiman.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#10b981",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = localStorage.getItem('pelunas-debt-storage-v1');
                if (stored) {
                  const parsed = JSON.parse(stored);
                  if (parsed.state?.theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-[100dvh] text-foreground flex flex-col font-sans relative selection:bg-pelunas-500/20 selection:text-pelunas-300">
        <BackgroundGlow />
        <div className="relative z-[1] flex flex-col min-h-[100dvh]">
          <Header />
          <main className="flex-1 w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
