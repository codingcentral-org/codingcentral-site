import Link from 'next/link';
import { PageIntro } from '@/components/layout/page-intro';
import { ArrowRight } from 'lucide-react';

const focus = [
  {
    title: 'AI systems',
    description: 'Explore models, applications, and responsible practice around artificial intelligence.',
  },
  {
    title: 'Emerging tech',
    description: 'Investigate new tools, platforms, and ideas shaping how software gets built.',
  },
  {
    title: 'Student innovation',
    description: 'Publish findings, prototypes, and questions from builders exploring AI and emerging tech.',
  },
];

export default function ResearchPage() {
  return (
    <>
      <PageIntro
        eyebrow="Research"
        title="Innovation, coming soon"
        description="Research at Coding Central is for breakthroughs in AI, emerging technologies, and original student innovation."
      />

      <section className="section-space">
        <div className="site-container">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-2">What is ahead</p>
            <h2 className="section-title text-[2rem] sm:text-[2.4rem]">
              A home for serious exploration
            </h2>
            <p className="mt-4 text-base leading-7 text-neutral-600">
              We are building a research space where students publish experiments, papers,
              and prototypes at the frontier, not just tutorials. Until it launches, keep
              reading current student writing in Articles.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {focus.map((item, index) => (
              <article key={item.title}>
                <span className="font-mono text-[12px] font-medium text-neutral-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-neutral-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link href="/learn" className="btn-primary rounded-full">
              Browse articles
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href="mailto:events@codingcentral.org?subject=Coding%20Central%20research"
              className="btn-secondary rounded-full"
            >
              Share a research idea
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
