import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GuideHeader } from '@/components/guides/guide-header';
import {
  CodeBlock,
  GuideArticle,
  GuideSection,
  RelatedArticles,
} from '@/components/guides/guide-article';
import { articles, getArticle, getRelatedArticles } from '@/lib/guides';

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = getArticle(params.slug);
  if (!article) return { title: 'Course' };

  return {
    title: article.title,
    description: article.description,
  };
}

export default function CourseSlugPage({ params }: PageProps) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  return (
    <>
      <GuideHeader guide={article} />
      <GuideArticle>
        {article.sections.map((section) => (
          <GuideSection key={section.title} title={section.title}>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
            {section.bullets && (
              <ul>
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {section.code && <CodeBlock>{section.code}</CodeBlock>}
          </GuideSection>
        ))}
      </GuideArticle>
      <RelatedArticles articles={getRelatedArticles(article.slug)} />
    </>
  );
}
