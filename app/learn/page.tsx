import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { PageIntro } from '@/components/layout/page-intro';
import { articles } from '@/lib/guides';

const externalResources = [
  {
    title: 'CS50x',
    source: 'Harvard University',
    description: 'A rigorous introduction to computer science and programming.',
    href: 'https://cs50.harvard.edu/x/',
  },
  {
    title: 'MDN Learn',
    source: 'Mozilla',
    description: 'Clear, trusted docs for learning modern web development.',
    href: 'https://developer.mozilla.org/en-US/docs/Learn',
  },
  {
    title: 'Python Tutorial',
    source: 'Python.org',
    description: 'The official introduction to the Python language.',
    href: 'https://docs.python.org/3/tutorial/',
  },
];

export default function LearnPage() {
  return (
    <>
      <PageIntro
        eyebrow="Articles"
        title="Clear writing for curious minds"
        description="Practical explainers and essays from Coding Central on computer science, AI, and emerging tech."
      />

      <section className="section-space">
        <div className="site-container max-w-4xl">
          <div className="grid gap-10 sm:grid-cols-2">
            {articles.map((article) => (
              <Link key={article.slug} href={`/learn/${article.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-black/5 bg-neutral-100">
                  <Image
                    src={article.cover}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-400">
                  <span>{article.topic}</span>
                  <span>{article.readTime}</span>
                </div>
                <h2 className="mt-2 font-display text-2xl leading-snug tracking-[-0.02em] text-neutral-950 group-hover:underline group-hover:decoration-neutral-300 group-hover:underline-offset-4">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-neutral-600 line-clamp-2">
                  {article.description}
                </p>
                <p className="mt-3 text-sm text-neutral-500">By {article.author}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white section-space">
        <div className="site-container">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow mb-2">Also useful</p>
            <h2 className="section-title text-[2rem] sm:text-[2.4rem]">
              External starting points
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            {externalResources.map((resource) => (
              <a
                key={resource.title}
                href={resource.href}
                target="_blank"
                rel="noreferrer"
                className="group block"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[15px] font-semibold text-neutral-950 group-hover:underline group-hover:decoration-neutral-300 group-hover:underline-offset-4">
                      {resource.title}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500">{resource.source}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-neutral-300 transition group-hover:text-neutral-950" />
                </div>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{resource.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
