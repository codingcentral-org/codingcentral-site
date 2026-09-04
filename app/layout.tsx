import './globals.css';
import type { Metadata } from 'next';
import { Instrument_Serif, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/sonner';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

const display = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: {
    default: 'Coding Central',
    template: '%s | Coding Central',
  },
  description:
    'A next-gen platform for AI and emerging technologies. Articles, mentorship, and research for what comes next.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${display.variable} ${mono.variable} font-sans bg-[#f7f7f4] text-neutral-950`}
      >
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </div>
      </body>
    </html>
  );
}
