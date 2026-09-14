'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Courses', href: '/courses' },
  { name: 'Research', href: '/research' },
  { name: 'Events', href: '/events' },
  { name: 'Mentorship', href: '/tutoring' },
  { name: 'About', href: '/about' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-200',
        scrolled
          ? 'border-b border-black/[0.07] bg-[#f7f7f4]/94 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.4)] backdrop-blur-xl'
          : 'border-b border-black/[0.04] bg-[#f7f7f4]/85 backdrop-blur-md'
      )}
    >
      <nav className="site-container" aria-label="Main navigation">
        <div className="grid h-14 grid-cols-[1fr_auto] items-center gap-4 sm:h-16 md:grid-cols-[1fr_auto_1fr]">
          <Link
            href="/"
            className="group flex items-center gap-2.5 justify-self-start"
            onClick={() => setIsMenuOpen(false)}
          >
            <img
              src="/codingcentral_logo.jpg"
              alt=""
              className="h-7 w-7 rounded-[7px] object-contain ring-1 ring-black/5 transition group-hover:ring-black/10"
            />
            <span className="text-[15px] font-semibold tracking-[-0.03em] text-neutral-950">
              Coding Central
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative rounded-full px-3 py-1.5 text-[13px] tracking-[-0.01em] transition',
                    active
                      ? 'font-medium text-neutral-950'
                      : 'text-neutral-500 hover:bg-black/[0.03] hover:text-neutral-950'
                  )}
                >
                  {item.name}
                  {active && (
                    <span
                      className="absolute inset-x-3 -bottom-[11px] h-px bg-neutral-950 sm:-bottom-[13px]"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center justify-self-end gap-2">
            <Link
              href="/courses"
              className="hidden h-9 items-center rounded-full bg-neutral-950 px-4 text-[13px] font-medium tracking-[-0.01em] text-white transition hover:bg-neutral-800 md:inline-flex"
            >
              Explore
            </Link>
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="grid h-9 w-9 place-items-center rounded-full border border-black/5 bg-white/80 text-neutral-950 transition hover:bg-white md:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div id="mobile-menu" className="border-t border-black/5 pb-4 pt-2 md:hidden">
            <div className="grid gap-1 rounded-2xl border border-black/5 bg-white p-2">
              {navItems.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'rounded-xl px-3 py-2.5 text-sm tracking-[-0.01em]',
                      active
                        ? 'bg-neutral-950 font-medium text-white'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Link
                href="/courses"
                className="mt-1 rounded-xl bg-neutral-950 px-3 py-2.5 text-center text-sm font-medium text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
