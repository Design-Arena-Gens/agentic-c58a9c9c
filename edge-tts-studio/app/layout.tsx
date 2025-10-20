import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700'],
  subsets: ["latin"],
  variable: '--font-merriweather',
});

export const metadata: Metadata = {
  title: "Edge-TTS: Audiobook & Podcast Studio",
  description: "Premium TTS audiobook and podcast generator with 551 neural voices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${merriweather.variable}`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'bounce-in',
            style: {
              background: 'var(--slate-800)',
              color: 'var(--off-white)',
              border: '1px solid var(--warm-teal)',
            },
            success: {
              iconTheme: {
                primary: 'var(--viridian)',
                secondary: 'var(--off-white)',
              },
            },
            error: {
              iconTheme: {
                primary: 'var(--carmine)',
                secondary: 'var(--off-white)',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
