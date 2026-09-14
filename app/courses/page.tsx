import { PageIntro } from '@/components/layout/page-intro';
import { CoursesCatalog } from '@/components/courses/courses-catalog';
import { ArrowUpRight } from 'lucide-react';
import { articleTopics, articles } from '@/lib/guides';

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

export default function CoursesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Courses"
        title="Learn by category"
        description="Searchable courses on AI, systems, security, product, and emerging technology. Filter by topic and find what you need fast."
      />

      <CoursesCatalog courses={articles} topics={articleTopics} />

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
