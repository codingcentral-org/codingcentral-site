'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { articles } from '@/lib/guides';
import { cn } from '@/lib/utils';

const featured = articles[0];
const more = articles.slice(1, 4);

export function HeroDesktop() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setProgress(1);
      return;
    }

    let frame = 0;
    const update = () => {
      const node = stageRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const total = Math.max(rect.height - window.innerHeight, 1);
      const next = Math.min(Math.max(-rect.top / total, 0), 1);
      setProgress(next);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reduceMotion]);

  const reveal = easeOutCubic(progress);
  const rotateX = 26 - reveal * 26;
  const rotateY = -10 + reveal * 10;
  const scale = 0.88 + reveal * 0.12;
  const translateY = 64 - reveal * 64;

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || reveal < 0.55) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -5, y: x * 7 });
  };

  const handleLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <>
      <section className="bg-[#f7f7f4]">
        <div className="site-container pb-8 pt-16 sm:pb-10 sm:pt-20 lg:pt-24">
          <div className="max-w-2xl">
            <h1 className="display-title text-neutral-950">Coding Central</h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
              A platform for AI and emerging technologies. Clear writing, mentorship, and room to
              explore what comes next.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/courses"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Browse courses
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/tutoring"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-neutral-300 bg-transparent px-5 text-sm font-medium text-neutral-900 transition hover:bg-white/70"
              >
                Find mentorship
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div ref={stageRef} className="relative h-[120vh] bg-[#f7f7f4]">
        <div className="sticky top-14 flex min-h-[min(58vh,560px)] items-center overflow-hidden py-3 sm:py-5">
          <div className="site-container w-full">
            <div className="relative mx-auto aspect-[2.2/1] min-h-[320px] w-full max-w-6xl overflow-hidden rounded-[1.5rem] border border-black/5 sm:min-h-[380px] sm:rounded-[2rem]">
              <div
                className="absolute inset-0 scale-105 bg-cover bg-center"
                style={{ backgroundImage: "url('/hero-atmosphere-refined.jpg')" }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 bg-gradient-to-b from-black/[0.04] via-transparent to-black/10"
                aria-hidden="true"
              />

              <div
                className="relative flex h-full items-center justify-center px-3 py-5 sm:px-6 sm:py-6"
                style={{ perspective: '1600px' }}
              >
                <div
                  className="w-full max-w-[900px] will-change-transform"
                  style={{
                    transform: `translateY(${translateY}px) rotateX(${rotateX + tilt.x}deg) rotateY(${rotateY + tilt.y}deg) scale(${scale})`,
                    transformStyle: 'preserve-3d',
                    transition: reduceMotion ? undefined : 'transform 80ms linear',
                  }}
                  onMouseMove={handleMove}
                  onMouseLeave={handleLeave}
                >
                  <LibraryWindow />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function LibraryWindow() {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[1.25rem] border border-black/10 bg-white',
        'shadow-[0_40px_100px_-36px_rgba(15,23,42,0.65),0_16px_36px_-20px_rgba(15,23,42,0.35)]'
      )}
    >
      <div className="flex items-center gap-3 border-b border-neutral-200 bg-[#fafaf8] px-4 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg bg-white px-3 py-1 ring-1 ring-black/5">
          <img src="/codingcentral_logo.jpg" alt="" className="h-4 w-4 rounded-[3px] object-contain" />
          <p className="truncate font-mono text-[11px] text-neutral-500">codingcentral.org/courses</p>
        </div>
        <Link
          href="/courses"
          className="hidden text-[12px] font-medium text-neutral-600 transition hover:text-neutral-950 sm:inline"
        >
          View all
        </Link>
      </div>

      <div className="grid bg-white md:grid-cols-[1.2fr_0.9fr]">
        <Link
          href={`/courses/${featured.slug}`}
          className="group border-b border-neutral-200 p-3.5 sm:p-4 md:border-b-0 md:border-r"
        >
          <div className="overflow-hidden rounded-xl border border-black/5 bg-neutral-100">
            <img
              src={featured.cover}
              alt=""
              className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-400">
            <span>{featured.topic}</span>
            <span>{featured.readTime}</span>
          </div>
          <h2 className="mt-1.5 font-display text-[1.25rem] leading-snug tracking-[-0.02em] text-neutral-950 sm:text-[1.4rem]">
            {featured.title}
          </h2>
          <p className="mt-1.5 line-clamp-2 text-[13px] leading-5 text-neutral-600">
            {featured.description}
          </p>
          <p className="mt-2 text-[12px] text-neutral-500">
            {featured.author}, {featured.role}
          </p>
        </Link>

        <div className="flex flex-col p-3.5 sm:p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">
            Courses
          </p>
          <p className="mt-1 font-display text-[1.25rem] leading-none tracking-[-0.02em] text-neutral-950">
            Featured courses
          </p>

          <ul className="mt-3 flex-1 space-y-1.5">
            {more.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/courses/${item.slug}`}
                  className="group flex items-center gap-3 rounded-xl p-1.5 transition hover:bg-neutral-50"
                >
                  <div className="h-10 w-14 shrink-0 overflow-hidden rounded-lg border border-black/5 bg-neutral-100">
                    <img src={item.cover} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium tracking-[-0.01em] text-neutral-950">
                      {item.title}
                    </p>
                    <p className="mt-0.5 truncate text-[12px] text-neutral-500">
                      {item.author}
                      <span className="text-neutral-400">, </span>
                      {item.role}
                    </p>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-neutral-300 transition group-hover:translate-x-0.5 group-hover:text-neutral-950" />
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/courses"
            className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-neutral-950 transition hover:gap-2"
          >
            Browse courses
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return reduced;
}
