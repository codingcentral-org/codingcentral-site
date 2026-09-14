import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';
import type { Article } from '@/lib/guides';

export function GuideArticle({ children }: { children: ReactNode }) {
  return (
    <article className="site-container py-10 sm:py-14">
      <div className="guide-prose mx-auto max-w-[42rem]">{children}</div>
    </article>
  );
}

export function GuideSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-14 first:mt-0">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="guide-code">
      <code>{children}</code>
    </pre>
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return <aside className="guide-callout">{children}</aside>;
}

export function RelatedArticles({ articles }: { articles: Article[] }) {
  if (!articles.length) return null;

  return (
    <section className="border-t border-neutral-200 bg-white">
      <div className="site-container py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">
            Keep learning
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-[-0.03em] text-neutral-950 sm:text-4xl">
            More courses
          </h2>

          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {articles.map((article) => (
              <Link key={article.slug} href={`/courses/${article.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-black/5 bg-neutral-100">
                  <Image
                    src={article.cover}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-400">
                  {article.topic}
                </p>
                <h3 className="mt-2 font-display text-xl leading-snug tracking-[-0.02em] text-neutral-950 group-hover:underline group-hover:decoration-neutral-300 group-hover:underline-offset-4">
                  {article.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
