import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { GuideHeader } from '@/components/guides/guide-header';
import { GuideArticle, RelatedArticles } from '@/components/guides/guide-article';
import { getGuide, getRelatedArticles } from '@/lib/guides';

export function ArticlePage({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const guide = getGuide(slug);
  if (!guide) notFound();

  return (
    <>
      <GuideHeader guide={guide} />
      <GuideArticle>{children}</GuideArticle>
      <RelatedArticles articles={getRelatedArticles(slug)} />
    </>
  );
}
