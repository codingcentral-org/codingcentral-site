import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { HeroDesktop } from '@/components/home/hero-desktop';
import { articles } from '@/lib/guides';

const pillars = [
  {
    title: 'Articles',
    description: 'Professional writing across AI, systems, security, product, and emerging tech.',
    href: '/learn',
  },
  {
    title: 'Mentorship',
    description: 'Connect industry mentors with people building careers in computer science.',
    href: '/tutoring',
  },
  {
    title: 'Research',
    description: 'A coming space for innovation in AI and emerging technologies.',
    href: '/research',
  },
];

const featured = articles.slice(0, 6);

export default function Home() {
  return (
    <>
      <HeroDesktop />

      <section className="section-space border-t border-neutral-200 bg-[#f7f7f4]">
        <div className="site-container">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-3">The platform</p>
            <h2 className="section-title">Built for the brightest</h2>
            <p className="body-large mt-4 max-w-xl">
              Coding Central is a next-gen platform for AI, computer science, and emerging tech.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {pillars.map((pillar, index) => (
              <Link key={pillar.title} href={pillar.href} className="group block">
                <p className="font-mono text-[11px] font-medium text-neutral-400">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-4 font-display text-2xl tracking-[-0.02em] text-neutral-950 group-hover:underline group-hover:decoration-neutral-300 group-hover:underline-offset-4">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{pillar.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space border-t border-neutral-200 bg-white">
        <div className="site-container">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-3">Library</p>
              <h2 className="section-title">Latest from the library</h2>
            </div>
            <Link
              href="/learn"
              className="hidden text-sm font-medium text-neutral-950 sm:inline-flex sm:items-center sm:gap-1"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((article) => (
              <Link key={article.slug} href={`/learn/${article.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-black/5 bg-neutral-100">
                  <Image
                    src={article.cover}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-400">
                  {article.topic}
                </p>
                <h3 className="mt-2 font-display text-[1.35rem] leading-snug tracking-[-0.02em] text-neutral-950 group-hover:underline group-hover:decoration-neutral-300 group-hover:underline-offset-4">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-500">By {article.author}</p>
              </Link>
            ))}
          </div>

          <Link
            href="/learn"
            className="mt-12 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            Browse articles
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section-space border-t border-neutral-200 bg-[#f7f7f4]">
        <div className="site-container">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">Mentorship</p>
            <h2 className="section-title">Industry experience, rising talent</h2>
            <p className="mt-4 text-base leading-7 text-neutral-600">
              Connect with mentors who can guide careers in computer science, AI, and emerging tech.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tutoring"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Explore mentorship
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/research"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-5 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50"
              >
                Research for innovation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
